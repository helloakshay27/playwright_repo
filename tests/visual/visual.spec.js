/**
 * Tutorial 5: Visual Regression Testing
 * 
 * This example demonstrates:
 * - Taking screenshots
 * - Comparing screenshots (visual regression)
 * - Element-level screenshots
 * - Full-page screenshots
 * 
 * Run: npx playwright test tests/visual/visual.spec.js
 * 
 * Note: First run will create baseline screenshots
 *       Subsequent runs will compare against baseline
 */

const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  
  test('Tutorial 5.1 - Full page screenshot', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Take full page screenshot and compare with baseline
    await expect(page).toHaveScreenshot('todomvc-homepage.png', {
      fullPage: true,
      maxDiffPixels: 100 // Allow small differences
    });
    
    console.log('✓ Full page screenshot captured and compared');
  });

  test('Tutorial 5.2 - Element screenshot', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Screenshot of specific element
    const inputElement = page.locator('.new-todo');
    await expect(inputElement).toHaveScreenshot('todo-input.png');
    
    console.log('✓ Element screenshot captured');
  });

  test('Tutorial 5.3 - Screenshot with todos added', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Add some todos
    await page.fill('.new-todo', 'Buy groceries');
    await page.press('.new-todo', 'Enter');
    
    await page.fill('.new-todo', 'Complete project');
    await page.press('.new-todo', 'Enter');
    
    // Screenshot with data
    await expect(page).toHaveScreenshot('todomvc-with-items.png');
    
    console.log('✓ Screenshot with todos captured');
  });

  test('Tutorial 5.4 - Screenshot different viewport sizes', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://demo.playwright.dev/todomvc');
    await expect(page).toHaveScreenshot('desktop-view.png');
    
    // Set viewport to tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('https://demo.playwright.dev/todomvc');
    await expect(page).toHaveScreenshot('tablet-view.png');
    
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://demo.playwright.dev/todomvc');
    await expect(page).toHaveScreenshot('mobile-view.png');
    
    console.log('✓ Screenshots captured for multiple viewports');
  });

  test('Tutorial 5.5 - Screenshot with hover state', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Add a todo
    await page.fill('.new-todo', 'Test item');
    await page.press('.new-todo', 'Enter');
    
    // Hover over the todo item
    await page.locator('.todo-list li').hover();
    
    // Wait a moment for hover effects
    await page.waitForTimeout(500);
    
    // Capture hover state
    await expect(page.locator('.todo-list')).toHaveScreenshot('todo-hover-state.png');
    
    console.log('✓ Hover state screenshot captured');
  });

  test('Tutorial 5.6 - Screenshot with focus state', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Focus on input
    await page.locator('.new-todo').focus();
    
    // Capture focus state
    await expect(page.locator('.new-todo')).toHaveScreenshot('input-focus-state.png');
    
    console.log('✓ Focus state screenshot captured');
  });

  test('Tutorial 5.7 - Ignore specific areas', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Add todos
    await page.fill('.new-todo', 'Dynamic content');
    await page.press('.new-todo', 'Enter');
    
    // Screenshot with mask (ignore dynamic content)
    await expect(page).toHaveScreenshot('page-with-mask.png', {
      mask: [page.locator('.todo-list')], // This area will be masked
    });
    
    console.log('✓ Screenshot with masked area captured');
  });

  test('Tutorial 5.8 - Screenshot comparison with threshold', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Compare with custom threshold
    await expect(page).toHaveScreenshot('todomvc-threshold-test.png', {
      maxDiffPixelRatio: 0.05, // Allow 5% difference
    });
    
    console.log('✓ Screenshot compared with custom threshold');
  });
});

test.describe('Visual Tests - Specific Components', () => {
  
  test('Tutorial 5.9 - Header component', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    const header = page.locator('.header');
    await expect(header).toHaveScreenshot('header-component.png');
    
    console.log('✓ Header component screenshot captured');
  });

  test('Tutorial 5.10 - Footer component', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Add a todo to make footer visible
    await page.fill('.new-todo', 'Test');
    await page.press('.new-todo', 'Enter');
    
    const footer = page.locator('.footer');
    if (await footer.isVisible()) {
      await expect(footer).toHaveScreenshot('footer-component.png');
      console.log('✓ Footer component screenshot captured');
    }
  });

  test('Tutorial 5.11 - Todo list component', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Add multiple todos
    const todos = ['First todo', 'Second todo', 'Third todo'];
    for (const todo of todos) {
      await page.fill('.new-todo', todo);
      await page.press('.new-todo', 'Enter');
    }
    
    const todoList = page.locator('.todo-list');
    await expect(todoList).toHaveScreenshot('todo-list-component.png');
    
    console.log('✓ Todo list component screenshot captured');
  });
});

test.describe('Visual Tests - Dark Mode', () => {
  
  test('Tutorial 5.12 - Dark mode appearance', async ({ page }) => {
    // Emulate dark color scheme
    await page.emulateMedia({ colorScheme: 'dark' });
    
    await page.goto('https://demo.playwright.dev/todomvc');
    
    await expect(page).toHaveScreenshot('todomvc-dark-mode.png');
    
    console.log('✓ Dark mode screenshot captured');
  });

  test('Tutorial 5.13 - Light mode appearance', async ({ page }) => {
    // Emulate light color scheme
    await page.emulateMedia({ colorScheme: 'light' });
    
    await page.goto('https://demo.playwright.dev/todomvc');
    
    await expect(page).toHaveScreenshot('todomvc-light-mode.png');
    
    console.log('✓ Light mode screenshot captured');
  });
});

test.describe('Visual Tests - Animation States', () => {
  
  test('Tutorial 5.14 - Disable animations for consistent screenshots', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Disable CSS animations
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `
    });
    
    await page.fill('.new-todo', 'No animation');
    await page.press('.new-todo', 'Enter');
    
    await expect(page).toHaveScreenshot('no-animations.png');
    
    console.log('✓ Screenshot without animations captured');
  });
});

test.describe('Visual Tests - Responsive Design', () => {
  
  const devices = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Laptop', width: 1366, height: 768 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 }
  ];

  devices.forEach(({ name, width, height }) => {
    test(`Tutorial 5.15 - ${name} viewport`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('https://demo.playwright.dev/todomvc');
      
      await expect(page).toHaveScreenshot(`${name.toLowerCase()}-viewport.png`);
      
      console.log(`✓ ${name} viewport screenshot captured`);
    });
  });
});
