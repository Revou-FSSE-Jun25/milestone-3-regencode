import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",  // adjust path to your source files
    "!app/**/*.d.ts",            // exclude type definitions
    "!app/**/__tests__/**",      // exclude test folders
  ],

  // ✅ Output formats
  coverageReporters: [
    "text",           // summary in terminal
    "text-summary",   // short summary
    "lcov",           // HTML report
    "json",           // machine readable
  ],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
