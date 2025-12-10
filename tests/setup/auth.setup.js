/**
 * Authentication Setup
 * 
 * This file handles authentication once and saves the state
 * Other tests can reuse this authenticated state
 * 
 * Run: npx playwright test tests/setup/auth.setup.js
 */

const { test as setup, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const authFile = path.join(__dirname, '../../auth/user.json');

/**
 * Setup: Authenticate and save session
 * This runs before other tests
 */
setup('authenticate user', async ({ page }) => {
  console.log('Setting up authentication...');
  
  // Using practice login page for demo
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  
  // Perform login
  await page.fill('#username', 'student');
  await page.fill('#password', 'Password123');
  await page.click('#submit');
  
  // Wait for successful login
  await page.waitForURL(/logged-in-successfully/);
  await expect(page.locator('.post-title')).toContainText('Logged In Successfully');
  
  console.log('✓ Login successful');
  
  // Ensure auth directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
  
  // Save authenticated state
  await page.context().storageState({ path: authFile });
  
  console.log(`✓ Authentication state saved to: ${authFile}`);
});

/**
 * Cleanup: Remove auth file after tests (optional)
 */
setup.afterAll(async () => {
  // Optionally clean up auth file
  // if (fs.existsSync(authFile)) {
  //   fs.unlinkSync(authFile);
  //   console.log('✓ Auth file cleaned up');
  // }
});
