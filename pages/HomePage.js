/**
 * Home Page Object Model
 * Contains all elements and actions for the home page
 */

const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // Locators
    this.welcomeMessage = page.locator('.welcome-message, h1, .greeting');
    this.navigationMenu = page.locator('nav, .navbar');
    this.searchBox = page.locator('input[type="search"], input[placeholder*="Search"]');
    this.userProfile = page.locator('.user-profile, .account-menu');
    this.logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout")');
    this.notificationIcon = page.locator('.notification-icon, .bell-icon');
  }

  /**
   * Navigate to home page
   * @param {string} baseUrl - Base URL of the application
   */
  async navigate(baseUrl = 'https://demo.playwright.dev') {
    await this.page.goto(`${baseUrl}/`);
  }

  /**
   * Get welcome message
   * @returns {Promise<string>} Welcome message text
   */
  async getWelcomeMessage() {
    return await this.welcomeMessage.textContent();
  }

  /**
   * Verify user is logged in
   * @returns {Promise<boolean>} True if logged in
   */
  async isUserLoggedIn() {
    return await this.userProfile.isVisible();
  }

  /**
   * Perform search
   * @param {string} searchTerm - Text to search for
   */
  async search(searchTerm) {
    await this.searchBox.fill(searchTerm);
    await this.searchBox.press('Enter');
  }

  /**
   * Click on navigation menu item
   * @param {string} menuItem - Name of the menu item
   */
  async clickMenuItem(menuItem) {
    await this.page.click(`nav a:has-text("${menuItem}")`);
  }

  /**
   * Logout from application
   */
  async logout() {
    await this.userProfile.click();
    await this.logoutButton.click();
  }

  /**
   * Check if notification is present
   * @returns {Promise<boolean>} True if notification exists
   */
  async hasNotifications() {
    const badge = this.page.locator('.notification-badge');
    return await badge.isVisible();
  }

  /**
   * Verify home page is loaded
   * @returns {Promise<boolean>} True if home page is loaded
   */
  async isLoaded() {
    return await this.welcomeMessage.isVisible() && 
           await this.navigationMenu.isVisible();
  }
}

module.exports = { HomePage };
