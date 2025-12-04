import { POST } from "@/app/api/submit-waiver/route";
import { NextRequest } from "next/server";

// Mock environment variables
const mockEnv = {
  AZURE_TENANT_ID: "",
  AZURE_CLIENT_ID: "",
  AZURE_CLIENT_SECRET: "",
  SHAREPOINT_SITE_URL: "",
};

jest.mock("next/server", () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status || 200,
    })),
  },
}));

describe("submit-waiver API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    process.env = { ...process.env, ...mockEnv };
  });

  it("should return success when SharePoint is not configured", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        full_name: "John Doe",
        initials: "JD",
        minor_names: "",
        signature_date: "2025-11-30",
        language: "en",
      }),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.sharepoint_saved).toBe(false);
  });

  it("should handle missing required fields gracefully", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        full_name: "",
        initials: "",
        minor_names: "",
        signature_date: "",
        language: "en",
      }),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const data = await response.json();

    // Should still succeed even with empty fields (validation is on frontend)
    expect(data.success).toBe(true);
  });

  it("should handle JSON parse errors", async () => {
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    
    expect(response.status).toBe(500);
  });
});
