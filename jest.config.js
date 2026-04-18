const { defineConfig } = require('jest');

module.exports = defineConfig({
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: false,
  testMatch: ['**/tests/**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'cjs'],
  clearMocks: true,
  restoreMocks: true,
  transform: {},
});
