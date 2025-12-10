# Playwright Automation Framework - POC

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Framework Structure](#framework-structure)
- [Tutorial for QA Team](#tutorial-for-qa-team)
- [Running Tests](#running-tests)
- [Reports & Debugging](#reports--debugging)

---

## 🎯 Project Overview

**Purpose**: End-to-End Automation Framework for UI, API, Visual, and Component Testing

**Key Features**:
- ✅ UI Automation
- ✅ API Testing
- ✅ Visual Regression Testing
- ✅ Cross-browser Support (Chrome, Firefox, Safari)
- ✅ Mobile Emulation
- ✅ Parallel Execution
- ✅ Authentication Handling
- ✅ Rich Reporting (HTML, JSON, JUnit)
- ✅ Trace Viewer & Video Recording

**Success Metrics**:
- Target: 40-60% automated regression coverage
- Reduce regression cycle time from 4-6 hours to ~25 minutes
- Reduce production bugs by 60%

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher) - [Download here](https://nodejs.org/)
- Git (optional)
- Code Editor (VS Code recommended)

### Step 1: Install Dependencies
```bash
# Navigate to project directory
cd /Users/haveninfoline/Desktop/playwright_repo

# Install all dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Step 2: Verify Installation
```bash
# Run a sample test to verify setup
npx playwright test tests/examples/example.spec.js --headed
```

### Step 3: Open Test UI (Optional)
```bash
# Launch Playwright UI mode for interactive testing
npm run test:ui
```

---

## 📁 Framework Structure

```
playwright_repo/
├── tests/
│   ├── ui/                     # UI Test Cases
│   │   ├── login.spec.js       # Login functionality tests
│   │   ├── homepage.spec.js    # Homepage tests
│   │   └── checkout.spec.js    # Checkout flow tests
│   ├── api/                    # API Test Cases
│   │   ├── users.api.spec.js   # User API tests
│   │   └── products.api.spec.js # Product API tests
│   ├── visual/                 # Visual Regression Tests
│   │   └── visual.spec.js      # Screenshot comparison tests
│   ├── examples/               # Tutorial Examples
│   │   └── example.spec.js     # Sample test for learning
│   └── setup/                  # Setup & Authentication
│       └── auth.setup.js       # Login state persistence
├── pages/                      # Page Object Models (POM)
│   ├── LoginPage.js            # Login page actions
│   ├── HomePage.js             # Home page actions
│   └── BasePage.js             # Common page actions
├── utils/                      # Utility Functions
│   ├── testData.js             # Test data management
│   ├── helpers.js              # Helper functions
│   └── apiHelpers.js           # API utility functions
├── fixtures/                   # Test Fixtures
│   └── customFixtures.js       # Custom test fixtures
├── auth/                       # Authentication States
│   └── user.json               # Saved login session
├── test-results/               # Test execution results
├── playwright-report/          # HTML reports
├── playwright.config.js        # Playwright configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

---

## 📚 Tutorial for QA Team

### Tutorial 1: Your First Test (5 minutes)

**Goal**: Write a simple test to open a website and verify the title

**File**: `tests/examples/example.spec.js`

```javascript
// Import test and expect from Playwright
const { test, expect } = require('@playwright/test');

test('My first test - Verify page title', async ({ page }) => {
  // Step 1: Navigate to the website
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Step 2: Verify the page title
  await expect(page).toHaveTitle(/TodoMVC/);
  
  // Step 3: Take a screenshot
  await page.screenshot({ path: 'first-test.png' });
});
```

**Run this test**:
```bash
npx playwright test tests/examples/example.spec.js --headed
```

---

### Tutorial 2: Interacting with Elements (10 minutes)

**Goal**: Fill forms, click buttons, and verify results

```javascript
test('Fill a todo item and verify', async ({ page }) => {
  // Navigate to page
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Fill input field
  await page.fill('.new-todo', 'Write test automation');
  
  // Press Enter to submit
  await page.press('.new-todo', 'Enter');
  
  // Verify the todo was added
  await expect(page.locator('.todo-list li')).toHaveText('Write test automation');
  
  // Mark as complete
  await page.click('.todo-list li input[type="checkbox"]');
  
  // Verify completion
  await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
});
```

---

### Tutorial 3: Page Object Model (15 minutes)

**Goal**: Learn reusable page objects for better test maintenance

**Create Page Object**: `pages/LoginPage.js`

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };
```

**Use in Test**: `tests/ui/login.spec.js`

```javascript
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigate();
  await loginPage.login('testuser@example.com', 'Password123');
  
  // Verify successful login
  await expect(page).toHaveURL(/dashboard/);
});
```

---

### Tutorial 4: API Testing (15 minutes)

**Goal**: Test REST APIs directly

**File**: `tests/api/users.api.spec.js`

```javascript
const { test, expect } = require('@playwright/test');

test('GET - Fetch user list', async ({ request }) => {
  // Make GET request
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  
  // Verify status code
  expect(response.status()).toBe(200);
  
  // Parse response
  const users = await response.json();
  
  // Verify response structure
  expect(users.length).toBeGreaterThan(0);
  expect(users[0]).toHaveProperty('id');
  expect(users[0]).toHaveProperty('name');
  expect(users[0]).toHaveProperty('email');
});

test('POST - Create new user', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe'
    }
  });
  
  expect(response.status()).toBe(201);
  
  const newUser = await response.json();
  expect(newUser.name).toBe('John Doe');
  expect(newUser.email).toBe('john.doe@example.com');
});
```

**Run API tests**:
```bash
npm run test:api
```

---

### Tutorial 5: Visual Regression Testing (10 minutes)

**Goal**: Capture and compare screenshots

**File**: `tests/visual/visual.spec.js`

```javascript
const { test, expect } = require('@playwright/test');

test('Visual test - Homepage screenshot', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Take screenshot and compare with baseline
  await expect(page).toHaveScreenshot('homepage.png');
});

test('Visual test - Button hover state', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Hover over element
  await page.hover('.new-todo');
  
  // Capture element screenshot
  await expect(page.locator('.new-todo')).toHaveScreenshot('input-hover.png');
});
```

**First run**: Creates baseline screenshots
**Subsequent runs**: Compares against baseline and reports differences

---

### Tutorial 6: Authentication & Session Reuse (15 minutes)

**Goal**: Login once and reuse session across tests

**Setup File**: `tests/setup/auth.setup.js`

```javascript
const { test as setup, expect } = require('@playwright/test');

const authFile = 'auth/user.json';

setup('authenticate', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://demo.playwright.dev/login'); // Replace with your URL
  
  // Perform login
  await page.fill('#username', 'testuser@example.com');
  await page.fill('#password', 'Password123');
  await page.click('button[type="submit"]');
  
  // Wait for redirect
  await page.waitForURL(/dashboard/);
  
  // Save authentication state
  await page.context().storageState({ path: authFile });
});
```

**Use authenticated state in tests**:
```javascript
test.use({ storageState: 'auth/user.json' });

test('Access protected page', async ({ page }) => {
  // Already logged in from saved state
  await page.goto('/dashboard');
  await expect(page.locator('.welcome-message')).toBeVisible();
});
```

---

### Tutorial 7: Mobile Testing (10 minutes)

**Goal**: Test on mobile viewports

```javascript
const { test, expect, devices } = require('@playwright/test');

test.use({
  ...devices['iPhone 12'],
});

test('Mobile - Responsive menu', async ({ page }) => {
  await page.goto('https://demo.playwright.dev');
  
  // Check if mobile menu icon is visible
  await expect(page.locator('.mobile-menu-icon')).toBeVisible();
  
  // Click mobile menu
  await page.click('.mobile-menu-icon');
  
  // Verify menu opens
  await expect(page.locator('.mobile-menu')).toBeVisible();
});
```

**Run mobile tests**:
```bash
npm run test:mobile
```

---

### Tutorial 8: Debugging Tests (10 minutes)

**Methods to debug failing tests**:

#### Method 1: Headed Mode
```bash
npx playwright test --headed
```

#### Method 2: Debug Mode (Step-through)
```bash
npm run test:debug
```

#### Method 3: UI Mode (Interactive)
```bash
npm run test:ui
```

#### Method 4: Trace Viewer
```bash
# After test failure, view trace
npx playwright show-trace test-results/[test-folder]/trace.zip
```

#### Method 5: Screenshots & Videos
- Screenshots saved in `test-results/` folder on failure
- Videos saved when test fails

---

## 🏃 Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npx playwright test tests/ui/login.spec.js
```

### Run Tests by Browser
```bash
npm run test:chrome    # Chrome only
npm run test:firefox   # Firefox only
npm run test:safari    # Safari only
```

### Run Tests in Parallel
```bash
npm run test:parallel
```

### Run Tests with UI Mode
```bash
npm run test:ui
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

---

## 📊 Reports & Debugging

### View HTML Report
```bash
npm run report
```

### View Trace
```bash
npm run trace test-results/[test-folder]/trace.zip
```

### Test Results Location
- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results.json`
- **JUnit Report**: `junit-results.xml`
- **Screenshots**: `test-results/`
- **Videos**: `test-results/`

---

## 🎓 Best Practices

### 1. Use Page Object Model
- Keep test logic separate from page interactions
- Makes tests easier to maintain

### 2. Use Meaningful Test Names
```javascript
test('User should be able to login with valid credentials', async ({ page }) => {
  // Test code
});
```

### 3. Use Data-Driven Testing
```javascript
const testData = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' }
];

testData.forEach(({ username, password }) => {
  test(`Login with ${username}`, async ({ page }) => {
    // Test with data
  });
});
```

### 4. Use Proper Assertions
```javascript
// Good ✓
await expect(page.locator('.welcome')).toBeVisible();

// Not recommended ✗
const isVisible = await page.locator('.welcome').isVisible();
expect(isVisible).toBe(true);
```

### 5. Handle Waits Properly
```javascript
// Wait for element
await page.waitForSelector('.loading-spinner', { state: 'hidden' });

// Wait for network
await page.waitForResponse(response => response.url().includes('/api/data'));
```

---

## 📞 Support & Resources

### Official Documentation
- [Playwright Docs](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

### Internal Support
- QA Team Lead: [Name]
- Tech Lead: [Name]
- Slack Channel: #qa-automation

### Learning Resources
- [Playwright YouTube Channel](https://www.youtube.com/playlist?list=PLQ6Buerc008e66-5Rt6BpxWPy1g-nE0M5)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

## 🎯 Next Steps

1. ✅ Complete all 8 tutorials
2. ✅ Write 5-10 critical user flow tests
3. ✅ Integrate with CI/CD (GitHub Actions)
4. ✅ Achieve 40% regression coverage in 2-3 months
5. ✅ Share knowledge with team members

---

**Version**: 1.0.0  
**Last Updated**: 10 December 2025  
**Maintained By**: QA Automation Team
