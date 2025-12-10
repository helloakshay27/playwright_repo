/**
 * Tutorial 1: Your First Playwright Test
 * 
 * This example demonstrates:
 * - Basic test structure
 * - Navigation to a page
 * - Assertions
 * - Taking screenshots
 * 
 * Run: npx playwright test tests/examples/example.spec.js --headed
 */

const { test, expect } = require('@playwright/test');

// Test 1: Basic page navigation and title verification
test('Tutorial 1.1 - Verify page title', async ({ page }) => {
  // Step 1: Navigate to the website
  console.log('Navigating to TodoMVC demo...');
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Step 2: Verify the page title contains "TodoMVC"
  await expect(page).toHaveTitle(/TodoMVC/);
  console.log('✓ Page title verified');
  
  // Step 3: Take a screenshot for documentation
  await page.screenshot({ path: 'test-results/tutorial-1-page.png' });
  console.log('✓ Screenshot saved');
});

// Test 2: Interacting with elements
test('Tutorial 1.2 - Add a todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Find the input field and type text
  await page.fill('.new-todo', 'Learn Playwright automation');
  console.log('✓ Text entered in input field');
  
  // Press Enter to submit
  await page.press('.new-todo', 'Enter');
  console.log('✓ Enter key pressed');
  
  // Verify the todo was added to the list
  const todoItem = page.locator('.todo-list li');
  await expect(todoItem).toHaveText('Learn Playwright automation');
  console.log('✓ Todo item added successfully');
});

// Test 3: Multiple interactions
test('Tutorial 1.3 - Add and complete todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add a todo
  await page.fill('.new-todo', 'Complete Playwright tutorial');
  await page.press('.new-todo', 'Enter');
  
  // Mark as complete by clicking checkbox
  await page.click('.todo-list li input[type="checkbox"]');
  console.log('✓ Todo marked as complete');
  
  // Verify the todo has 'completed' class
  const todoItem = page.locator('.todo-list li');
  await expect(todoItem).toHaveClass(/completed/);
  console.log('✓ Todo completion verified');
  
  // Take screenshot of completed state
  await page.screenshot({ path: 'test-results/tutorial-1-completed.png' });
});

// Test 4: Working with multiple elements
test('Tutorial 1.4 - Add multiple todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  const todos = [
    'Learn Playwright basics',
    'Write first test case',
    'Run tests in CI/CD'
  ];
  
  // Add all todos
  for (const todo of todos) {
    await page.fill('.new-todo', todo);
    await page.press('.new-todo', 'Enter');
  }
  
  // Verify all todos are added
  const todoItems = page.locator('.todo-list li');
  await expect(todoItems).toHaveCount(3);
  console.log('✓ All 3 todos added successfully');
  
  // Verify specific todo exists
  await expect(page.locator('.todo-list li', { hasText: 'Write first test case' })).toBeVisible();
  console.log('✓ Specific todo verified');
});

// Test 5: Testing different actions
test('Tutorial 1.5 - Delete a todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add a todo
  await page.fill('.new-todo', 'Todo to be deleted');
  await page.press('.new-todo', 'Enter');
  
  // Hover over the todo to reveal delete button
  await page.locator('.todo-list li').hover();
  
  // Click the delete button
  await page.click('.todo-list li button.destroy');
  console.log('✓ Todo deleted');
  
  // Verify the todo list is empty
  const todoItems = page.locator('.todo-list li');
  await expect(todoItems).toHaveCount(0);
  console.log('✓ Todo list is empty');
});

// Test 6: Using assertions
test('Tutorial 1.6 - Various assertions', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Check element visibility
  await expect(page.locator('.new-todo')).toBeVisible();
  console.log('✓ Input field is visible');
  
  // Check placeholder text
  await expect(page.locator('.new-todo')).toHaveAttribute('placeholder', 'What needs to be done?');
  console.log('✓ Placeholder text verified');
  
  // Check if element is enabled
  await expect(page.locator('.new-todo')).toBeEnabled();
  console.log('✓ Input field is enabled');
  
  // Check page URL
  await expect(page).toHaveURL('https://demo.playwright.dev/todomvc/');
  console.log('✓ Page URL verified');
});
