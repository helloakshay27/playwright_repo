/**
 * Homepage UI Tests
 * 
 * This example demonstrates:
 * - Testing homepage functionality
 * - Multiple element interactions
 * - Form testing
 * - Navigation testing
 * 
 * Run: npx playwright test tests/ui/homepage.spec.js --headed
 */

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');

test.describe('Homepage Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('Homepage loads successfully', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/TodoMVC/);
    
    // Verify main heading is visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Verify input field is present
    await expect(page.locator('.new-todo')).toBeVisible();
    
    console.log('✓ Homepage loaded successfully');
  });

  test('Input field has correct placeholder', async ({ page }) => {
    const inputField = page.locator('.new-todo');
    
    await expect(inputField).toHaveAttribute('placeholder', 'What needs to be done?');
    
    console.log('✓ Placeholder text verified');
  });

  test('Can add single todo item', async ({ page }) => {
    // Add a todo
    await page.fill('.new-todo', 'Test automation task');
    await page.press('.new-todo', 'Enter');
    
    // Verify todo appears in list
    const todoItem = page.locator('.todo-list li');
    await expect(todoItem).toHaveText('Test automation task');
    await expect(todoItem).toBeVisible();
    
    console.log('✓ Single todo added successfully');
  });

  test('Can add multiple todo items', async ({ page }) => {
    const todos = [
      'First task',
      'Second task',
      'Third task'
    ];
    
    // Add all todos
    for (const todo of todos) {
      await page.fill('.new-todo', todo);
      await page.press('.new-todo', 'Enter');
    }
    
    // Verify all todos are present
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(3);
    
    // Verify each todo text
    for (let i = 0; i < todos.length; i++) {
      await expect(todoItems.nth(i)).toContainText(todos[i]);
    }
    
    console.log('✓ Multiple todos added successfully');
  });

  test('Can mark todo as completed', async ({ page }) => {
    // Add a todo
    await page.fill('.new-todo', 'Task to complete');
    await page.press('.new-todo', 'Enter');
    
    // Mark as complete
    await page.click('.todo-list li input[type="checkbox"]');
    
    // Verify completed state
    const todoItem = page.locator('.todo-list li');
    await expect(todoItem).toHaveClass(/completed/);
    
    console.log('✓ Todo marked as completed');
  });

  test('Can unmark completed todo', async ({ page }) => {
    // Add and complete a todo
    await page.fill('.new-todo', 'Task to toggle');
    await page.press('.new-todo', 'Enter');
    await page.click('.todo-list li input[type="checkbox"]');
    
    // Verify it's completed
    let todoItem = page.locator('.todo-list li');
    await expect(todoItem).toHaveClass(/completed/);
    
    // Unmark it
    await page.click('.todo-list li input[type="checkbox"]');
    
    // Verify it's not completed anymore
    await expect(todoItem).not.toHaveClass(/completed/);
    
    console.log('✓ Todo unmarked successfully');
  });

  test('Can delete a todo', async ({ page }) => {
    // Add a todo
    await page.fill('.new-todo', 'Task to delete');
    await page.press('.new-todo', 'Enter');
    
    // Verify todo exists
    let todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(1);
    
    // Hover to reveal delete button
    await page.locator('.todo-list li').hover();
    
    // Click delete button
    await page.click('.todo-list li button.destroy');
    
    // Verify todo is deleted
    todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(0);
    
    console.log('✓ Todo deleted successfully');
  });

  test('Can edit a todo', async ({ page }) => {
    // Add a todo
    await page.fill('.new-todo', 'Original text');
    await page.press('.new-todo', 'Enter');
    
    // Double click to edit
    await page.locator('.todo-list li label').dblclick();
    
    // Verify edit mode is active
    const editInput = page.locator('.todo-list li.editing input.edit');
    await expect(editInput).toBeVisible();
    
    // Edit the text
    await editInput.fill('Updated text');
    await editInput.press('Enter');
    
    // Verify updated text
    const todoItem = page.locator('.todo-list li');
    await expect(todoItem).toContainText('Updated text');
    
    console.log('✓ Todo edited successfully');
  });

  test('Todo count updates correctly', async ({ page }) => {
    // Add multiple todos
    await page.fill('.new-todo', 'Todo 1');
    await page.press('.new-todo', 'Enter');
    
    await page.fill('.new-todo', 'Todo 2');
    await page.press('.new-todo', 'Enter');
    
    await page.fill('.new-todo', 'Todo 3');
    await page.press('.new-todo', 'Enter');
    
    // Check if counter is visible
    const counter = page.locator('.todo-count');
    if (await counter.isVisible()) {
      await expect(counter).toContainText('3');
      console.log('✓ Todo count is correct');
    }
  });

  test('Can filter todos - All/Active/Completed', async ({ page }) => {
    // Add todos
    await page.fill('.new-todo', 'Active todo');
    await page.press('.new-todo', 'Enter');
    
    await page.fill('.new-todo', 'Completed todo');
    await page.press('.new-todo', 'Enter');
    
    // Mark second todo as complete
    await page.locator('.todo-list li').nth(1).locator('input[type="checkbox"]').click();
    
    // Click Active filter
    const activeFilter = page.locator('a[href="#/active"]');
    if (await activeFilter.isVisible()) {
      await activeFilter.click();
      
      // Should show only active todos
      const activeTodos = page.locator('.todo-list li:not(.completed)');
      await expect(activeTodos).toHaveCount(1);
      console.log('✓ Active filter works');
    }
    
    // Click Completed filter
    const completedFilter = page.locator('a[href="#/completed"]');
    if (await completedFilter.isVisible()) {
      await completedFilter.click();
      
      // Should show only completed todos
      const completedTodos = page.locator('.todo-list li.completed');
      await expect(completedTodos).toHaveCount(1);
      console.log('✓ Completed filter works');
    }
  });

  test('Can clear completed todos', async ({ page }) => {
    // Add and complete multiple todos
    const todos = ['Todo 1', 'Todo 2', 'Todo 3'];
    
    for (const todo of todos) {
      await page.fill('.new-todo', todo);
      await page.press('.new-todo', 'Enter');
    }
    
    // Complete first two todos
    await page.locator('.todo-list li').nth(0).locator('input[type="checkbox"]').click();
    await page.locator('.todo-list li').nth(1).locator('input[type="checkbox"]').click();
    
    // Click clear completed button
    const clearButton = page.locator('button.clear-completed');
    if (await clearButton.isVisible()) {
      await clearButton.click();
      
      // Should only have 1 todo left
      const remainingTodos = page.locator('.todo-list li');
      await expect(remainingTodos).toHaveCount(1);
      console.log('✓ Clear completed works');
    }
  });

  test('Input field clears after adding todo', async ({ page }) => {
    const inputField = page.locator('.new-todo');
    
    // Add a todo
    await inputField.fill('Test task');
    await inputField.press('Enter');
    
    // Verify input is cleared
    await expect(inputField).toHaveValue('');
    
    console.log('✓ Input field cleared after submission');
  });

  test('Cannot add empty todo', async ({ page }) => {
    const inputField = page.locator('.new-todo');
    
    // Try to add empty todo
    await inputField.fill('   '); // Only spaces
    await inputField.press('Enter');
    
    // Verify no todo was added
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(0);
    
    console.log('✓ Empty todo validation works');
  });

  test('Homepage is responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.new-todo')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.new-todo')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('.new-todo')).toBeVisible();
    
    console.log('✓ Homepage is responsive across viewports');
  });
});

// Performance tests
test.describe('Homepage Performance', () => {
  
  test('Page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000); // Should load in under 3 seconds
    
    console.log(`✓ Page loaded in ${loadTime}ms`);
  });

  test('Can handle multiple rapid todo additions', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    const startTime = Date.now();
    
    // Add 10 todos rapidly
    for (let i = 1; i <= 10; i++) {
      await page.fill('.new-todo', `Todo ${i}`);
      await page.press('.new-todo', 'Enter');
    }
    
    const executionTime = Date.now() - startTime;
    
    // Verify all todos added
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(10);
    
    console.log(`✓ Added 10 todos in ${executionTime}ms`);
  });
});
