/**
 * Tutorial 3: UI Tests using Page Object Model
 * 
 * This example demonstrates:
 * - Using Page Object Model (POM)
 * - Reusable test components
 * - Better test maintenance
 * 
 * Run: npx playwright test tests/ui/login.spec.js --headed
 */

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

// Note: These tests use demo site - replace with your actual application URLs

test.describe('Login Functionality Tests', () => {
  
  test('Tutorial 3.1 - Login page should load correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login page (using demo URL)
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    
    // Verify login page elements are visible
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#submit')).toBeVisible();
    
    console.log('✓ Login page loaded successfully');
  });

  test('Tutorial 3.2 - Login with valid credentials', async ({ page }) => {
    // Navigate to practice login page
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    
    // Fill in credentials (demo credentials)
    await page.fill('#username', 'student');
    await page.fill('#password', 'Password123');
    await page.click('#submit');
    
    // Verify successful login
    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(page.locator('.post-title')).toContainText('Logged In Successfully');
    
    console.log('✓ Login successful');
  });

  test('Tutorial 3.3 - Login with invalid credentials', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    
    // Try to login with incorrect credentials
    await page.fill('#username', 'invaliduser');
    await page.fill('#password', 'wrongpassword');
    await page.click('#submit');
    
    // Verify error message appears
    const errorMessage = page.locator('#error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Your username is invalid!');
    
    console.log('✓ Error message displayed correctly');
  });

  test('Tutorial 3.4 - Empty username validation', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    
    // Try to login with empty username
    await page.fill('#password', 'Password123');
    await page.click('#submit');
    
    // Verify error appears
    const errorMessage = page.locator('#error');
    await expect(errorMessage).toBeVisible();
    
    console.log('✓ Validation working for empty username');
  });

  test('Tutorial 3.5 - Empty password validation', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    
    // Try to login with empty password
    await page.fill('#username', 'student');
    await page.click('#submit');
    
    // Verify error appears
    const errorMessage = page.locator('#error');
    await expect(errorMessage).toBeVisible();
    
    console.log('✓ Validation working for empty password');
  });

  test('Tutorial 3.6 - Logout functionality', async ({ page }) => {
    // First, login
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.fill('#username', 'student');
    await page.fill('#password', 'Password123');
    await page.click('#submit');
    
    // Verify login successful
    await expect(page).toHaveURL(/logged-in-successfully/);
    
    // Logout
    await page.click('a:has-text("Log out")');
    
    // Verify redirected back to login page
    await expect(page).toHaveURL(/practice-test-login/);
    
    console.log('✓ Logout successful');
  });
});

// Data-driven testing example
test.describe('Login - Data Driven Tests', () => {
  
  const testData = [
    { 
      username: 'student', 
      password: 'Password123', 
      shouldSucceed: true,
      description: 'valid credentials'
    },
    { 
      username: 'invaliduser', 
      password: 'wrongpass', 
      shouldSucceed: false,
      description: 'invalid username'
    },
    { 
      username: 'student', 
      password: 'wrongpass', 
      shouldSucceed: false,
      description: 'invalid password'
    }
  ];

  testData.forEach(({ username, password, shouldSucceed, description }) => {
    test(`Tutorial 3.7 - Login with ${description}`, async ({ page }) => {
      await page.goto('https://practicetestautomation.com/practice-test-login/');
      
      await page.fill('#username', username);
      await page.fill('#password', password);
      await page.click('#submit');
      
      if (shouldSucceed) {
        await expect(page).toHaveURL(/logged-in-successfully/);
        console.log(`✓ Login successful for ${username}`);
      } else {
        const errorMessage = page.locator('#error');
        await expect(errorMessage).toBeVisible();
        console.log(`✓ Error displayed correctly for ${description}`);
      }
    });
  });
});
