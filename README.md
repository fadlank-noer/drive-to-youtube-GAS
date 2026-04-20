# Drive to YouTube - Google Apps Script

Config template generator for automated video upload pipeline from Google Drive to YouTube.

## Overview

This CLI tool generates a configured Google Apps Script (`output.gs`) that monitors a Google Drive folder and automatically uploads video files to YouTube with scheduled publishing times. Run the CLI, copy the generated `output.gs` to Google Apps Script, and deploy.

## Workflow

```
Templating
- Generate your config via Node CLI
- Output ready to copy to Google Apps Script

App
- Get all videos in "Ready" folder
- Seed video manifest/snippet with your configuration
- Video becomes ready on YouTube
- Move video from "Ready" folder to Archive folder
```

## Features

## Limitations

- **Maximum video size: 256GB** - YouTube's upload limit per video

## Requirements

### Google APIs & Services
- **Drive API V3** - For file access and management
- **YouTube Data API V3** - For video upload and scheduling

### Setup Required
1. Enable Google Drive API
2. Enable YouTube Data API v3
3. Configure OAuth2 consent screen
4. Run Triggers in Google App Script

## Deployment

This project is designed to be deployed directly to [Google Apps Script](https://script.google.com/).

## Project Structure

```
drive-to-yt-GAS/
├── src/
│   └── main.gs            # Google Apps Script template
├── templates/
│   └── templating.cjs     # EJS template for config generation
├── tests/
│   ├── index.test.js
│   └── templating.test.js
├── index.js               # CLI entry point
├── package.json           # Node.js dependencies
├── output.gs              # Generated Apps Script (copy this to GAS)
└── readme.md              # This file
```

## Usage

```bash
npm start
```

1. Create "Ready" and "Archive" folders in your Google Drive
2. Run the templating engine to generate the "output.gs" file
3. Copy the entire content of output.gs to Google Apps Script
4. Deploy the script to Google Apps Script
5. Set up triggers (onChange or time-driven)
6. Add video files to "Ready" folder

## License

MIT
