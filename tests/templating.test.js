const fs = require('fs');
const path = require('path');
const { renderTemplate, generateGSFile } = require('../src/templating.cjs');

describe('templating.cjs', () => {
  const testOutputPath = path.join(__dirname, 'test-output.gs');

  afterEach(() => {
    if (fs.existsSync(testOutputPath)) {
      fs.unlinkSync(testOutputPath);
    }
  });

  describe('renderTemplate', () => {
    test('should render template with all config values', async () => {
      const config = {
        readyFolderId: 'test-ready-123',
        archiveFolderId: 'test-archive-456',
        isScheduled: true,
        hourlyAt: '5'
      };

      const result = await renderTemplate(config);

      expect(result).toContain('const READY_DRIVE_FOLDER_ID = "test-ready-123"');
      expect(result).toContain('const ARCHIVE_DRIVE_FOLDER_ID = "test-archive-456"');
      expect(result).toContain('const IS_SCHEDULED = true');
      expect(result).toContain('const HOURLY_AT = "5"');
    });

    test('should render template with isScheduled=false', async () => {
      const config = {
        readyFolderId: 'folder-1',
        archiveFolderId: 'folder-2',
        isScheduled: false,
        hourlyAt: ''
      };

      const result = await renderTemplate(config);

      expect(result).toContain('const IS_SCHEDULED = false');
      expect(result).toContain('const HOURLY_AT = ""');
    });

    test('should include video MIME types in output', async () => {
      const config = {
        readyFolderId: 'test',
        archiveFolderId: 'test',
        isScheduled: false,
        hourlyAt: ''
      };

      const result = await renderTemplate(config);

      expect(result).toContain('VIDEO_MIME_TYPES');
      expect(result).toContain('"video/mp4"');
      expect(result).toContain('"video/webm"');
    });

    test('should include main function', async () => {
      const config = {
        readyFolderId: 'test',
        archiveFolderId: 'test',
        isScheduled: false,
        hourlyAt: ''
      };

      const result = await renderTemplate(config);

      expect(result).toContain('function main()');
      expect(result).toContain('DriveApp.getFolderById(READY_DRIVE_FOLDER_ID)');
      expect(result).toContain('uploadToYouTube');
    });
  });

  describe('generateGSFile', () => {
    test('should write rendered template to file', async () => {
      const config = {
        readyFolderId: 'my-ready-folder',
        archiveFolderId: 'my-archive-folder',
        isScheduled: true,
        hourlyAt: '3'
      };

      const outputPath = await generateGSFile(config, testOutputPath);

      expect(outputPath).toBe(testOutputPath);
      expect(fs.existsSync(testOutputPath)).toBe(true);

      const content = fs.readFileSync(testOutputPath, 'utf-8');
      expect(content).toContain('const READY_DRIVE_FOLDER_ID = "my-ready-folder"');
      expect(content).toContain('const ARCHIVE_DRIVE_FOLDER_ID = "my-archive-folder"');
      expect(content).toContain('const IS_SCHEDULED = true');
      expect(content).toContain('const HOURLY_AT = "3"');
    });

    test('should use default output path when not specified', async () => {
      const config = {
        readyFolderId: 'test',
        archiveFolderId: 'test',
        isScheduled: false,
        hourlyAt: ''
      };

      const defaultPath = './output.gs';
      const outputPath = await generateGSFile(config);

      expect(outputPath).toBe(defaultPath);
      expect(fs.existsSync(defaultPath)).toBe(true);

      fs.unlinkSync(defaultPath);
    });

    test('should handle special characters in folder IDs', async () => {
      const config = {
        readyFolderId: 'folder_with_underscore-123',
        archiveFolderId: 'folder-with-dash_456',
        isScheduled: false,
        hourlyAt: ''
      };

      await generateGSFile(config, testOutputPath);

      const content = fs.readFileSync(testOutputPath, 'utf-8');
      expect(content).toContain('const READY_DRIVE_FOLDER_ID = "folder_with_underscore-123"');
      expect(content).toContain('const ARCHIVE_DRIVE_FOLDER_ID = "folder-with-dash_456"');
    });
  });
});
