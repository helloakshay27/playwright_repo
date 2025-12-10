/**
 * Test Data Management
 * 
 * This file contains test data used across different test files
 * Centralized data management for better maintenance
 */

// User credentials
const users = {
  validUser: {
    username: 'student',
    password: 'Password123',
    email: 'student@example.com'
  },
  invalidUser: {
    username: 'invaliduser',
    password: 'wrongpassword',
    email: 'invalid@example.com'
  },
  adminUser: {
    username: 'admin',
    password: 'Admin@123',
    email: 'admin@example.com'
  }
};

// Test URLs
const urls = {
  practice: {
    login: 'https://practicetestautomation.com/practice-test-login/',
    loggedIn: 'https://practicetestautomation.com/logged-in-successfully/'
  },
  demo: {
    todomvc: 'https://demo.playwright.dev/todomvc',
    base: 'https://demo.playwright.dev'
  },
  api: {
    jsonPlaceholder: 'https://jsonplaceholder.typicode.com'
  }
};

// Sample todo items
const todoItems = [
  'Complete Playwright tutorial',
  'Write automation test cases',
  'Review pull requests',
  'Update documentation',
  'Attend team meeting'
];

// Sample API test data
const apiTestData = {
  newUser: {
    name: 'Test User',
    username: 'testuser',
    email: 'testuser@example.com',
    phone: '1-234-567-8900',
    website: 'testuser.com'
  },
  newPost: {
    title: 'Test Post',
    body: 'This is a test post for automation',
    userId: 1
  },
  newComment: {
    name: 'Test Comment',
    email: 'test@example.com',
    body: 'This is a test comment'
  }
};

// Error messages
const errorMessages = {
  invalidUsername: 'Your username is invalid!',
  invalidPassword: 'Your password is invalid!',
  emptyFields: 'Please fill in all fields',
  networkError: 'Network request failed'
};

// Viewport sizes
const viewports = {
  desktop: { width: 1920, height: 1080 },
  laptop: { width: 1366, height: 768 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
  iphone12: { width: 390, height: 844 },
  ipadPro: { width: 1024, height: 1366 }
};

// Test configuration
const testConfig = {
  timeout: 30000,
  retries: 2,
  slowMo: 0, // Slow down operations by specified ms (for debugging)
  headless: true
};

// Export all test data
module.exports = {
  users,
  urls,
  todoItems,
  apiTestData,
  errorMessages,
  viewports,
  testConfig
};
