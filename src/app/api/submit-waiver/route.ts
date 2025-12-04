import { NextRequest, NextResponse } from "next/server";

interface WaiverSubmission {
  full_name: string;
  initials: string;
  minor_names: string;
  signature_date: string;
  language: string;
  screenshot_data?: string;
}

const SHAREPOINT_CONFIG = {
  tenant_id: process.env.AZURE_TENANT_ID || "",
  client_id: process.env.AZURE_CLIENT_ID || "",
  client_secret: process.env.AZURE_CLIENT_SECRET || "",
  site_url: process.env.SHAREPOINT_SITE_URL || "",
  excel_file_path: process.env.SHAREPOINT_EXCEL_FILE_PATH || "/Shared Documents/waiver_submissions.xlsx",
  worksheet_name: process.env.SHAREPOINT_WORKSHEET_NAME || "Sheet1",
};

async function getAccessToken(): Promise<string | null> {
  const tokenUrl = `https://login.microsoftonline.com/${SHAREPOINT_CONFIG.tenant_id}/oauth2/v2.0/token`;

  const data = new URLSearchParams({
    client_id: SHAREPOINT_CONFIG.client_id,
    client_secret: SHAREPOINT_CONFIG.client_secret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data,
    });

    if (!response.ok) {
      console.error("Failed to get access token:", await response.text());
      return null;
    }

    const tokenData = await response.json();
    return tokenData.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
}

async function getSiteId(accessToken: string): Promise<string | null> {
  const siteUrlParts = SHAREPOINT_CONFIG.site_url.replace("https://", "").split("/");
  const hostname = siteUrlParts[0];
  const sitePath = siteUrlParts.slice(1).join("/");

  const url = sitePath
    ? `https://graph.microsoft.com/v1.0/sites/${hostname}:/${sitePath}`
    : `https://graph.microsoft.com/v1.0/sites/${hostname}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to get site ID:", await response.text());
      return null;
    }

    const siteData = await response.json();
    return siteData.id;
  } catch (error) {
    console.error("Error getting site ID:", error);
    return null;
  }
}

async function uploadScreenshot(
  accessToken: string,
  siteId: string,
  fullName: string,
  screenshotData: string
): Promise<string | null> {
  try {
    if (!screenshotData || !screenshotData.startsWith("data:image")) {
      return null;
    }

    const [, data] = screenshotData.split(",", 2);
    const imageBytes = Buffer.from(data, "base64");

    const currentDate = new Date().toISOString().split("T")[0];
    const sanitizedName = fullName.replace(/ /g, "_").replace(/\//g, "_");
    const filename = `${sanitizedName}_${currentDate}.png`;

    // Create Screenshots folder if it doesn't exist
    const folderUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root/children`;
    await fetch(folderUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Screenshots",
        folder: {},
        "@microsoft.graph.conflictBehavior": "ignore",
      }),
    });

    // Upload the file
    const uploadUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/Screenshots/${filename}:/content`;
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/octet-stream",
      },
      body: imageBytes,
    });

    if (response.ok) {
      return `/Screenshots/${filename}`;
    } else {
      console.error("Failed to upload screenshot:", await response.text());
      return null;
    }
  } catch (error) {
    console.error("Error uploading screenshot:", error);
    return null;
  }
}

async function getExcelFileId(accessToken: string, siteId: string): Promise<string | null> {
  const filePath = SHAREPOINT_CONFIG.excel_file_path.replace(/^\//, "");
  const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/${filePath}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // File doesn't exist
      }
      console.error("Failed to get Excel file ID:", await response.text());
      return null;
    }

    const fileData = await response.json();
    return fileData.id;
  } catch (error) {
    console.error("Error getting Excel file ID:", error);
    return null;
  }
}

async function createExcelFile(accessToken: string, siteId: string): Promise<boolean> {
  const filePath = SHAREPOINT_CONFIG.excel_file_path.replace(/^\//, "");
  const pathParts = filePath.split("/");
  const fileName = pathParts[pathParts.length - 1];
  const folderPath = pathParts.slice(0, -1).join("/");

  try {
    // Create folder structure if needed
    if (folderPath) {
      const folders = folderPath.split("/");
      let currentPath = "";

      for (const folder of folders) {
        if (!folder) continue;
        currentPath += currentPath ? `/${folder}` : folder;

        const checkUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/${currentPath}`;
        const checkResponse = await fetch(checkUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (checkResponse.status === 404) {
          const createUrl = currentPath === folder
            ? `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root/children`
            : `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/${currentPath.split("/").slice(0, -1).join("/") || ""}:/children`;

          await fetch(createUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: folder,
              folder: {},
              "@microsoft.graph.conflictBehavior": "ignore",
            }),
          });
        }
      }
    }

    // Create the Excel file
    const createUrl = folderPath
      ? `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/${folderPath}:/children`
      : `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root/children`;

    const createResponse = await fetch(createUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fileName,
        file: {},
        "@microsoft.graph.conflictBehavior": "rename",
      }),
    });

    if (createResponse.ok) {
      const fileData = await createResponse.json();
      const newFileId = fileData.id;

      // Add headers
      const headersData = {
        values: [[
          "Submission Date",
          "Full Name",
          "Initials",
          "Minor Names",
          "Signature Date",
          "Language",
          "Screenshot File",
        ]],
      };

      const worksheetUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/items/${newFileId}/workbook/worksheets/${SHAREPOINT_CONFIG.worksheet_name}/range(address='A1:G1')`;
      await fetch(worksheetUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(headersData),
      });

      return true;
    }

    return false;
  } catch (error) {
    console.error("Error creating Excel file:", error);
    return false;
  }
}

async function addRowToExcel(
  accessToken: string,
  siteId: string,
  fileId: string,
  waiver: WaiverSubmission,
  screenshotPath: string | null
): Promise<boolean> {
  try {
    const submissionDate = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });

    const rowData = {
      values: [[
        submissionDate,
        waiver.full_name,
        waiver.initials,
        waiver.minor_names || "",
        waiver.signature_date,
        waiver.language,
        screenshotPath ? screenshotPath.split("/").pop() : "",
      ]],
    };

    // Get current row count
    const usedRangeUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/items/${fileId}/workbook/worksheets/${SHAREPOINT_CONFIG.worksheet_name}/usedRange`;
    const rangeResponse = await fetch(usedRangeUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    let nextRow = 2;
    if (rangeResponse.ok) {
      const rangeData = await rangeResponse.json();
      nextRow = (rangeData.rowCount || 1) + 1;
    }

    // Add the row
    const cellRange = `A${nextRow}:G${nextRow}`;
    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/items/${fileId}/workbook/worksheets/${SHAREPOINT_CONFIG.worksheet_name}/range(address='${cellRange}')`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rowData),
    });

    return response.ok;
  } catch (error) {
    console.error("Error adding row to Excel:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const waiver: WaiverSubmission = await request.json();

    // Check if SharePoint credentials are configured
    if (!SHAREPOINT_CONFIG.tenant_id || !SHAREPOINT_CONFIG.client_id || !SHAREPOINT_CONFIG.client_secret) {
      console.log("SharePoint not configured, returning success without saving");
      return NextResponse.json({
        success: true,
        message: "Waiver submitted successfully (SharePoint not configured)",
        sharepoint_saved: false,
      });
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({
        success: true,
        message: "Waiver submitted but failed to connect to SharePoint",
        sharepoint_saved: false,
      });
    }

    const siteId = await getSiteId(accessToken);
    if (!siteId) {
      return NextResponse.json({
        success: true,
        message: "Waiver submitted but failed to access SharePoint site",
        sharepoint_saved: false,
      });
    }

    // Upload screenshot if provided
    let screenshotPath: string | null = null;
    if (waiver.screenshot_data) {
      screenshotPath = await uploadScreenshot(
        accessToken,
        siteId,
        waiver.full_name,
        waiver.screenshot_data
      );
    }

    // Get or create Excel file
    let fileId = await getExcelFileId(accessToken, siteId);
    if (!fileId) {
      const created = await createExcelFile(accessToken, siteId);
      if (created) {
        fileId = await getExcelFileId(accessToken, siteId);
      }
    }

    if (!fileId) {
      return NextResponse.json({
        success: true,
        message: "Waiver submitted but failed to access Excel file",
        sharepoint_saved: false,
        screenshot_saved: !!screenshotPath,
      });
    }

    // Add row to Excel
    const rowAdded = await addRowToExcel(accessToken, siteId, fileId, waiver, screenshotPath);

    return NextResponse.json({
      success: true,
      message: rowAdded
        ? "Waiver submitted and saved to SharePoint successfully"
        : "Waiver submitted but failed to save to Excel",
      sharepoint_saved: rowAdded,
      screenshot_saved: !!screenshotPath,
    });
  } catch (error) {
    console.error("Error processing waiver submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process waiver submission",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
