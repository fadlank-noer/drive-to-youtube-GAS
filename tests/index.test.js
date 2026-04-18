const fs = require('fs');
const path = require('path');
const { generateGSFile } = require('../src/templating.cjs');

describe('index.js integration tests', () => {
  const testOutputPath = path.join(__dirname, 'test-output-integration.gs');

  afterEach(() => {
    if (fs.existsSync(testOutputPath)) {
      fs.unlinkSync(testOutputPath);
    }
  });

  describe('CLI flow simulation', () => {
    test('should generate correct output.gs with scheduled config', async () => {
      const config = {
        readyFolderId: 'cli-ready-123',
        archiveFolderId: 'cli-archive-456',
        isScheduled: true,
        hourlyAt: '4'
      };

      await generateGSFile(config, testOutputPath);
      const content = fs.readFileSync(testOutputPath, 'utf-8');

      expect(content).toContain('const READY_DRIVE_FOLDER_ID = "cli-ready-123"');
      expect(content).toContain('const ARCHIVE_DRIVE_FOLDER_ID = "cli-archive-456"');
      expect(content).toContain('const IS_SCHEDULED = true');
      expect(content).toContain('const HOURLY_AT = "4"');
    });

    test('should generate correct output.gs with non-scheduled config', async () => {
      const config = {
        readyFolderId: 'ready-abc',
        archiveFolderId: 'archive-xyz',
        isScheduled: false,
        hourlyAt: ''
      };

      await generateGSFile(config, testOutputPath);
      const content = fs.readFileSync(testOutputPath, 'utf-8');

      expect(content).toContain('const IS_SCHEDULED = false');
      expect(content).toContain('const HOURLY_AT = ""');
    });
  });

  describe('validation simulation', () => {
    test('should handle hourly validation (1-12 range)', async () => {
      const validHours = ['1', '6', '12'];

      for (const hour of validHours) {
        const config = {
          readyFolderId: 'test',
          archiveFolderId: 'test',
          isScheduled: true,
          hourlyAt: hour
        };

        await generateGSFile(config, testOutputPath);
        const content = fs.readFileSync(testOutputPath, 'utf-8');
        expect(content).toContain(`const HOURLY_AT = "${hour}"`);
      }
    });

    test('should handle empty folder IDs gracefully', async () => {
      const config = {
        readyFolderId: '',
        archiveFolderId: '',
        isScheduled: false,
        hourlyAt: ''
      };

      await generateGSFile(config, testOutputPath);
      const content = fs.readFileSync(testOutputPath, 'utf-8');

      expect(content).toContain('const READY_DRIVE_FOLDER_ID = ""');
      expect(content).toContain('const ARCHIVE_DRIVE_FOLDER_ID = ""');
    });
  });
});
