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

## YouTubeApp API

### Upload Video

```javascript
// Upload video to YouTube
YoutubeApp.videos.insert(resource: Youtube.V3.Schema.Video, part: string[]): Youtube_v3.Youtube.V3.Schema.Video)
```

**Endpoint**: `POST https://www.googleapis.com/upload/youtube/v3/videos`

**Quota Cost**: 1600 units per upload

**Max File Size**: 256GB

**Required OAuth Scope**: `https://www.googleapis.com/auth/youtube.upload`

### Request Parameters

**Query Parameters:**
- `part` (required) - Fields to set and return (e.g., `snippet,status`)
- `notifySubscribers` (boolean) - Optional
- `onBehalfOfContentOwner` - Optional
- `onBehalfOfContentOwnerChannel` - Optional

### Request Body Structure (Youtube.V3.Schema.Video)

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

- `video/*` - Any video format
- `application/octet-stream` - Fallback for binary data

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

> **Note**: New API projects (post-2020) default uploads to **private** until audit completion.

> **Schedule Publishing**: Use `publishAt` in status object to schedule video publication. Video must be `private` initially, then will publish at specified time.
