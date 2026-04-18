# Google Apps Script API Reference

- Semua comment harus menggunakan bahasa inggris, tapi simple aja
- Syntaxnya .gs itu Apps Script pakai JavaScript ES6+ (modern).

## DriveApp API

### File Operations

```javascript
// Get file by ID
DriveApp.getFileById(id)

// Get all files
DriveApp.getFiles()

// Get files by name
DriveApp.getFilesByName(name)

// Get files by MIME type
DriveApp.getFilesByType(mimeType)

// Search files with parameters
DriveApp.searchFiles(params)

// Get trashed files
DriveApp.getTrashedFiles()
```

### Folder Operations

```javascript
// Get folder by ID
DriveApp.getFolderById(id)

// Get all folders
DriveApp.getFolders()

// Get folders by name
DriveApp.getFoldersByName(name)

// Search folders
DriveApp.searchFolders(params)

// Get root folder
DriveApp.getRootFolder()

// Get trashed folders
DriveApp.getTrashedFolders()

// Create folder in root
DriveApp.createFolder(name)
```

### Create Operations

```javascript
// Create file from blob
DriveApp.createFile(blob)

// Create text file
DriveApp.createFile(name, content)

// Create file with MIME type
DriveApp.createFile(name, content, mimeType)

// Create shortcut
DriveApp.createShortcut(targetId)
```

### Storage Info

```javascript
// Get storage limit (bytes)
DriveApp.getStorageLimit()

// Get storage used (bytes)
DriveApp.getStorageUsed()
```

### Iterators

```javascript
// Continue file iteration
DriveApp.continueFileIterator(continuationToken)

// Continue folder iteration
DriveApp.continueFolderIterator(continuationToken)
```

---

## YoutubeApp API

### Upload Video

```javascript
// Upload video to YouTube
YoutubeApp.Videos.insert(metadata: Metadata, parts: string, videoBlob: Blob)

// Note: Videos (capital V), not videos (lowercase)
// Returns: Video resource object with getId() method

Example
YoutubeApp.Videos.insert({
  snippet: {
    title: "Video title",
    description: "Video description",
    tags: ["tag1", "tag2"],
    categoryId: "22"  // 22 = People & Blogs
  },
  status: {
    privacyStatus: "private",  // Must be private when using publishAt
    publishAt: "2025-01-01T00:00:00Z"  // ISO 8601 format (UTC)
  }
}, "snippet,status", fileBlob)

// Get the uploaded video ID
const response = YoutubeApp.Videos.insert(metadata, "snippet,status", mediaData);
const videoId = response.getId();
```

The following list contains the part names that you can include in the parameter value:
contentDetails
fileDetails
id
liveStreamingDetails
localizations
paidProductPlacementDetails
player
processingDetails
recordingDetails
snippet
statistics
status
suggestions
topicDetails

### Request Body Structure (Metadata)

```javascript
{
  snippet: {
    title: "Video title",
    description: "Video description",
    tags: ["tag1", "tag2"],
    categoryId: "22"  // 22 = People & Blogs
  },
  status: {
    privacyStatus: "public",  // or "private", "unlisted"
    publishAt: "2025-01-01T00:00:00Z"  // ISO 8601 format
  }
}
```

### Full Resource Example

```javascript
{
  kind: "youtube#video",
  id: "VIDEO_ID",
  snippet: {
    publishedAt: "2025-01-01T00:00:00Z",
    channelId: "CHANNEL_ID",
    title: "Video title",
    description: "Video description",
    tags: ["tag1", "tag2"],
    categoryId: "22"
  },
  status: {
    uploadStatus: "uploaded",
    privacyStatus: "public",
    publishAt: "2025-01-01T00:00:00Z"
  }
}
```

### Video MIME Types

Supported formats in this project:
- `video/mp4` - MP4 video
- `video/mpeg` - MPEG video
- `video/quicktime` - MOV (QuickTime)
- `video/x-msvideo` - AVI
- `video/x-flv` - FLV (Flash Video)
- `video/webm` - WebM
- `video/3gpp` - 3GP
- `video/x-matroska` - MKV

Generic fallback:
- `video/*` - Any video format
- `application/octet-stream` - Binary data fallback

### Common Category IDs

| ID | Category |
|----|----------|
| 1 | Film & Animation |
| 2 | Autos & Vehicles |
| 10 | Music |
| 15 | Pets & Animals |
| 17 | Sports |
| 20 | Gaming |
| 22 | People & Blogs |
| 23 | Comedy |
| 24 | Entertainment |
| 25 | News & Politics |
| 26 | Howto & Style |
| 27 | Education |
| 28 | Science & Technology |

### Privacy Status Options

- `public` - Visible to everyone
- `private` - Only visible to you
- `unlisted` - Anyone with link can view

### Important Notes

> **API Method**: Use `YoutubeApp.Videos.insert()` with **capital V**, not lowercase `videos`

> **Note**: New API projects (post-2020) default uploads to **private** until audit completion.

> **Schedule Publishing**: Use `publishAt` in status object to schedule video publication. Video must be `private` initially, then will publish at specified time.

> **Blob Conversion**: Use `file.getBlob()` to convert Drive files to Blob for upload

> **Error Handling**: Wrap upload calls in try-catch to handle quota limits and network errors

---

## Common Patterns

### Drive to YouTube Upload Workflow

```javascript
// 1. Get video file from Drive folder
const folder = DriveApp.getFolderById(FOLDER_ID);
const file = folder.getFiles().next();

// 2. Generate metadata with scheduled publishing
function generateMetadata(fileName) {
  const publishAt = new Date();
  publishAt.setDate(publishAt.getDate() + 1);  // Tomorrow
  publishAt.setHours(17, 0, 0);  // 5:00 PM UTC

  return {
    snippet: {
      title: fileName,
      description: `Video ${fileName}`,
      tags: ["automated", "upload"],
      categoryId: "22"
    },
    status: {
      privacyStatus: "private",
      publishAt: formatISO8601(publishAt)
    }
  };
}

// 3. Upload to YouTube
const response = YoutubeApp.Videos.insert(
  generateMetadata(file.getName()),
  "snippet,status",
  file.getBlob()
);

// 4. Move processed file to archive
file.moveTo(archiveFolder);
```

### ISO 8601 Date Formatting

```javascript
// Format date for YouTube API (UTC timezone)
function formatISO8601(date) {
  const pad = (n) => n < 10 ? '0' + n : n;
  return date.getUTCFullYear() + '-' +
    pad(date.getUTCMonth() + 1) + '-' +
    pad(date.getUTCDate()) + 'T' +
    pad(date.getUTCHours()) + ':' +
    pad(date.getUTCMinutes()) + ':' +
    pad(date.getUTCSeconds()) + 'Z';
}
```

### Tag Generation from Filename

```javascript
// Extract meaningful tags from filename
function generateTags(fileName) {
  const baseTags = ["upload", "google drive", "automated"];

  // Remove special chars and extract words > 3 chars
  const words = fileName
    .replace(/[^\w\s]/gi, " ")
    .split(/\s+/)
    .filter(word => word.length > 3);

  return [...baseTags, ...words].slice(0, 10);
}
```
