# 🎯 Playwright Quick Reference Cheat Sheet

## 📦 Installation Commands

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

---

## 🏃 Running Tests

```bash
# Run all tests
npm test
npx playwright test

# Run specific test file
npx playwright test tests/examples/example.spec.js

# Run tests in specific folder
npx playwright test tests/api/

# Run single test by name
npx playwright test -g "test name"

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug
npm run test:debug

# Run in UI mode (interactive)
npx playwright test --ui
npm run test:ui

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run tests in parallel
npx playwright test --workers=4
npm run test:parallel
```

---

## 📊 Reports & Debugging

```bash
# Show HTML report
npx playwright show-report
npm run report

# Show trace viewer
npx playwright show-trace trace.zip
npm run trace

# Generate test code (record actions)
npx playwright codegen
npx playwright codegen https://example.com
```

---

## ✏️ Basic Test Structure

```javascript
const { test, expect } = require('@playwright/test');

test('test description', async ({ page }) => {
  // Your test code here
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});

test.describe('Test suite', () => {
  test('test 1', async ({ page }) => {
    // Test code
  });
  
  test('test 2', async ({ page }) => {
    // Test code
  });
});

// Hooks
test.beforeEach(async ({ page }) => {
  // Runs before each test
});

test.afterEach(async ({ page }) => {
  // Runs after each test
});

test.beforeAll(async () => {
  // Runs once before all tests
});

test.afterAll(async () => {
  // Runs once after all tests
});
```

---

## 🎯 Common Locators

```javascript
// By ID
page.locator('#id')

// By class
page.locator('.classname')

// By tag
page.locator('button')

// By attribute
page.locator('[name="username"]')
page.locator('input[type="email"]')

// By text (exact)
page.locator('text=Login')

// By text (contains)
page.locator('text=/Login/')
page.locator(':has-text("Login")')

// By role
page.getByRole('button')
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Username' })

// By label
page.getByLabel('Email')

// By placeholder
page.getByPlaceholder('Enter email')

// By test id
page.getByTestId('submit-button')

// CSS selector
page.locator('button.primary')
page.locator('#login > form > button')

// XPath
page.locator('xpath=//button[@id="submit"]')

// Nth element
page.locator('.item').nth(0)      // First
page.locator('.item').nth(2)      // Third
page.locator('.item').first()     // First
page.locator('.item').last()      // Last

// Filter
page.locator('li').filter({ hasText: 'Apple' })
page.locator('button').filter({ has: page.locator('.icon') })
```

---

## 🖱️ Actions

```javascript
// Navigate
await page.goto('https://example.com')
await page.goto('/login', { waitUntil: 'networkidle' })

// Click
await page.click('button')
await page.locator('button').click()
await page.locator('button').click({ button: 'right' }) // Right click
await page.locator('button').dblclick() // Double click

// Fill input
await page.fill('input', 'text')
await page.locator('input').fill('text')

// Type (character by character)
await page.type('input', 'text')
await page.locator('input').type('text', { delay: 100 })

// Clear input
await page.fill('input', '')
await page.locator('input').clear()

// Press key
await page.press('input', 'Enter')
await page.keyboard.press('Control+A')
await page.keyboard.press('Meta+A') // Cmd on Mac

// Select dropdown
await page.selectOption('select', 'value')
await page.selectOption('select', { label: 'Option Text' })

// Check/Uncheck
await page.check('input[type="checkbox"]')
await page.uncheck('input[type="checkbox"]')
await page.locator('input').check()

// Hover
await page.hover('button')
await page.locator('button').hover()

// Focus
await page.focus('input')
await page.locator('input').focus()

// Scroll
await page.locator('.element').scrollIntoViewIfNeeded()
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

// Upload file
await page.setInputFiles('input[type="file"]', 'path/to/file.pdf')
await page.setInputFiles('input[type="file"]', [
  'file1.pdf',
  'file2.pdf'
])

// Drag and drop
await page.locator('.source').dragTo(page.locator('.target'))
```

---

## ✅ Assertions

```javascript
// Page
await expect(page).toHaveURL('https://example.com')
await expect(page).toHaveURL(/example/)
await expect(page).toHaveTitle('Page Title')
await expect(page).toHaveTitle(/Title/)

// Element visibility
await expect(page.locator('.element')).toBeVisible()
await expect(page.locator('.element')).toBeHidden()
await expect(page.locator('.element')).toBeAttached()

// Element state
await expect(page.locator('button')).toBeEnabled()
await expect(page.locator('button')).toBeDisabled()
await expect(page.locator('input')).toBeEditable()
await expect(page.locator('input')).toBeFocused()
await expect(page.locator('input')).toBeChecked()

// Text content
await expect(page.locator('.text')).toHaveText('Expected text')
await expect(page.locator('.text')).toHaveText(/regex/)
await expect(page.locator('.text')).toContainText('partial')

// Attribute
await expect(page.locator('input')).toHaveAttribute('type', 'email')
await expect(page.locator('input')).toHaveAttribute('name', /pattern/)

// Value
await expect(page.locator('input')).toHaveValue('value')
await expect(page.locator('input')).toHaveValue(/pattern/)

// Count
await expect(page.locator('.item')).toHaveCount(5)

// CSS class
await expect(page.locator('.element')).toHaveClass('active')
await expect(page.locator('.element')).toHaveClass(/active/)

// CSS
await expect(page.locator('.element')).toHaveCSS('color', 'rgb(255, 0, 0)')

// Screenshot
await expect(page).toHaveScreenshot('screenshot.png')
await expect(page.locator('.element')).toHaveScreenshot('element.png')

// Negation
await expect(page.locator('.element')).not.toBeVisible()
await expect(page.locator('button')).not.toBeDisabled()
```

---

## ⏱️ Waits

```javascript
// Auto-wait (built-in)
// All actions auto-wait for element to be ready

// Wait for selector
await page.waitForSelector('.element')
await page.waitForSelector('.element', { state: 'visible' })
await page.waitForSelector('.element', { state: 'hidden' })

// Wait for URL
await page.waitForURL('https://example.com')
await page.waitForURL(/example/)

// Wait for load state
await page.waitForLoadState('load')
await page.waitForLoadState('domcontentloaded')
await page.waitForLoadState('networkidle')

// Wait for response
await page.waitForResponse('https://api.example.com/data')
await page.waitForResponse(response => 
  response.url().includes('/api/') && response.status() === 200
)

// Wait for request
await page.waitForRequest('https://api.example.com/data')

// Wait for function
await page.waitForFunction(() => document.querySelector('.element'))
await page.waitForFunction(() => window.location.href.includes('/dashboard'))

// Wait for timeout
await page.waitForTimeout(1000) // Not recommended, use sparingly
```

---

## 📸 Screenshots & Videos

```javascript
// Full page screenshot
await page.screenshot({ path: 'screenshot.png' })
await page.screenshot({ path: 'screenshot.png', fullPage: true })

// Element screenshot
await page.locator('.element').screenshot({ path: 'element.png' })

// Screenshot to buffer
const buffer = await page.screenshot()

// Videos are auto-recorded on failure (configured in playwright.config.js)
```

---

## 🌐 API Testing

```javascript
test('API test', async ({ request }) => {
  // GET request
  const response = await request.get('https://api.example.com/users')
  expect(response.status()).toBe(200)
  const data = await response.json()
  
  // POST request
  const response = await request.post('https://api.example.com/users', {
    data: {
      name: 'John',
      email: 'john@example.com'
    }
  })
  
  // PUT request
  const response = await request.put('https://api.example.com/users/1', {
    data: { name: 'John Updated' }
  })
  
  // DELETE request
  const response = await request.delete('https://api.example.com/users/1')
  
  // With headers
  const response = await request.get('https://api.example.com/users', {
    headers: {
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json'
    }
  })
  
  // Response validation
  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('application/json')
  
  const data = await response.json()
  expect(data).toHaveProperty('id')
})
```

---

## 📱 Mobile & Device Emulation

```javascript
const { test, devices } = require('@playwright/test');

// Use specific device
test.use({
  ...devices['iPhone 12']
})

// Common devices
devices['Desktop Chrome']
devices['Desktop Firefox']
devices['Desktop Safari']
devices['Pixel 5']
devices['iPhone 12']
devices['iPhone 12 Pro']
devices['iPad Pro']
devices['Galaxy S9+']

// Custom viewport
test.use({
  viewport: { width: 375, height: 667 }
})

// Change viewport in test
await page.setViewportSize({ width: 1280, height: 720 })

// Emulate media features
await page.emulateMedia({ colorScheme: 'dark' })
await page.emulateMedia({ colorScheme: 'light' })
```

---

## 🔐 Authentication

```javascript
// Save auth state
await page.context().storageState({ path: 'auth.json' })

// Load auth state
test.use({ storageState: 'auth.json' })

// Set cookies
await context.addCookies([{
  name: 'session',
  value: 'abc123',
  domain: 'example.com',
  path: '/'
}])

// Get cookies
const cookies = await context.cookies()

// Set local storage
await page.evaluate(() => {
  localStorage.setItem('token', 'abc123')
})

// Get local storage
const token = await page.evaluate(() => localStorage.getItem('token'))
```

---

## 🎨 Page Object Model Pattern

```javascript
// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page
    this.usernameInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('button[type="submit"]')
  }
  
  async navigate() {
    await this.page.goto('/login')
  }
  
  async login(username, password) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}

module.exports = { LoginPage }

// In test file
const { LoginPage } = require('../pages/LoginPage')

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.navigate()
  await loginPage.login('user@example.com', 'password')
})
```

---

## 🎯 Test Configuration

```javascript
// playwright.config.js
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  workers: 4,
  use: {
    baseURL: 'https://example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})
```

---

## 🐛 Debugging

```javascript
// Pause execution
await page.pause()

// Console logs in browser
page.on('console', msg => console.log(msg.text()))

// Network logs
page.on('request', request => console.log('>>', request.method(), request.url()))
page.on('response', response => console.log('<<', response.status(), response.url()))

// Step through test
npx playwright test --debug

// UI mode
npx playwright test --ui

// Verbose output
DEBUG=pw:api npx playwright test
```

---

## 💡 Pro Tips

```javascript
// Use soft assertions (continue on failure)
await expect.soft(page.locator('.element')).toBeVisible()

// Test timeout
test('slow test', async ({ page }) => {
  test.setTimeout(60000) // 60 seconds
  // Test code
})

// Skip test
test.skip('skip this test', async ({ page }) => {
  // Won't run
})

// Only run this test
test.only('only this test', async ({ page }) => {
  // Only this will run
})

// Conditional skip
test('browser specific', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Not for Firefox')
  // Test code
})

// Retry specific test
test('flaky test', async ({ page }) => {
  test.describe.configure({ retries: 3 })
  // Test code
})

// Tags
test('login test @smoke @critical', async ({ page }) => {
  // Test code
})
// Run: npx playwright test --grep @smoke
```

---

## 📚 Quick Reference URLs

- **Playwright Docs**: https://playwright.dev/
- **API Reference**: https://playwright.dev/docs/api/class-playwright
- **Best Practices**: https://playwright.dev/docs/best-practices
- **Locators Guide**: https://playwright.dev/docs/locators
- **Assertions**: https://playwright.dev/docs/test-assertions

---

**Print this page and keep it handy while writing tests!** 📄✨
