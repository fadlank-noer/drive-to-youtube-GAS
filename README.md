# Drive to YouTube - Google Apps Script

Automated video upload pipeline from Google Drive to YouTube using Google Apps Script.

## Overview

This script monitors a Google Drive folder and automatically uploads video files to YouTube with scheduled publishing times.

## Workflow

```
Google Drive Folder "ToUpload"
        ↓ (Trigger: onChange or time-driven every 5 minutes)
   Google Apps Script (main file + utility library)
        ↓
1. Detect new video files
2. Determine publish schedule (simple logic)
3. Upload via YouTube Data API v3 + set "publishAt"
4. Move to "Archive" folder
```

## Features

- **Automatic Detection**: Monitors Google Drive folder for new video files
- **Scheduled Publishing**: Automatically sets YouTube publish time
- **Archive Management**: Moves processed files to Archive folder
- **Flexible Triggers**: Supports both onChange and time-based triggers (5 min intervals)

## Requirements

### Google APIs & Services
- **Drive API V3** - For file access and management
- **YouTube Data API V3** - For video upload and scheduling

### Setup Required
1. Enable Google Drive API
2. Enable YouTube Data API v3
3. Configure OAuth2 consent screen
4. Create API credentials

## Deployment

This project is designed to be deployed directly to [Google Apps Script](https://script.google.com/).

## Project Structure

TBA

## Usage

1. Create a folder named "ToUpload" in your Google Drive
2. Create an "Archive" folder for processed files
3. Deploy the script to Google Apps Script
4. Set up triggers (onChange or time-driven)
5. Add video files to "ToUpload" folder

## License

MIT
