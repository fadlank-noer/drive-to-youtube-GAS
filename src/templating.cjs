const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

/**
 * Render EJS template with config data
 * @param {Object} config
 * @param {string} config.readyFolderId
 * @param {string} config.archiveFolderId
 * @param {boolean} config.isScheduled
 * @param {string} config.hourlyAt
 * @returns {Promise<string>} Rendered template content
 */
async function renderTemplate(config) {
  const templatePath = path.join(__dirname, '../templates/main.gs');
  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  return ejs.render(templateContent, config);
}

/**
 * Write rendered template to output file
 * @param {Object} config
 * @param {string} config.readyFolderId
 * @param {string} config.archiveFolderId
 * @param {boolean} config.isScheduled
 * @param {string} config.hourlyAt
 * @param {string} outputPath
 */
async function generateGSFile(config, outputPath = './output.gs') {
  const rendered = await renderTemplate(config);
  fs.writeFileSync(outputPath, rendered);
  return outputPath;
}

module.exports = {
  renderTemplate,
  generateGSFile
};
