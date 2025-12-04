# Hope's Corner Waiver Submission App

A modern, professional waiver submission application built with Next.js. This app allows participants of Hope's Corner's shower and laundry program to digitally sign and submit their liability waivers and participant agreements.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Navigate to the `hopes-corner-waiver-submission-nextjs-app` directory:

   ```bash
   cd hopes-corner-waiver-submission-nextjs-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

4. Configure your environment variables (see Configuration section below)

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Azure/SharePoint Authentication
AZURE_TENANT_ID=your_tenant_id
AZURE_CLIENT_ID=your_client_id
AZURE_CLIENT_SECRET=your_client_secret

# SharePoint Configuration
SHAREPOINT_SITE_URL=https://yourtenant.sharepoint.com/sites/yoursite
SHAREPOINT_EXCEL_FILE_PATH=/Shared Documents/waiver_submissions.xlsx
SHAREPOINT_WORKSHEET_NAME=Sheet1
```

### SharePoint Setup

1. Register an Azure AD application
2. Grant Microsoft Graph API permissions:
   - `Sites.ReadWrite.All`
   - `Files.ReadWrite.All`
3. Create a client secret
4. Set up the SharePoint site and document library

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Set the root directory to `nextjs`
6. Add your environment variables
7. Deploy!

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   cd nextjs
   vercel
   ```

### Environment Variables on Vercel

Add these environment variables in your Vercel project settings:

- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `SHAREPOINT_SITE_URL`
- `SHAREPOINT_EXCEL_FILE_PATH`
- `SHAREPOINT_WORKSHEET_NAME`
