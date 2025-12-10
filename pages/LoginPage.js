/**
 * Login Page Object Model
 * Contains all elements and actions for the login page
 */

const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // Locators - Update these based on your application
    this.usernameInput = page.locator('#username, input[name="username"], input[type="email"]');
    this.passwordInput = page.locator('#password, input[name="password"], input[type="password"]');
    this.loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")');
    this.errorMessage = page.locator('.error-message, .alert-danger, [role="alert"]');
    this.forgotPasswordLink = page.locator('a:has-text("Forgot Password")');
    this.rememberMeCheckbox = page.locator('input[type="checkbox"][name="remember"]');
  }

  /**
   * Navigate to login page
   * @param {string} baseUrl - Base URL of the application
   */
  async navigate(baseUrl = 'https://demo.playwright.dev') {
    await this.page.goto(`${baseUrl}/login`);
  }

  /**
   * Perform login action
   * @param {string} username - Username or email
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Login with remember me option
   * @param {string} username - Username or email
   * @param {string} password - Password
   */
  async loginWithRememberMe(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.loginButton.click();
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message
   */
  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.textContent();
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>} True if error is visible
   */
  async isErrorDisplayed() {
    return await this.errorMessage.isVisible();
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  /**
   * Verify login page is loaded
   * @returns {Promise<boolean>} True if login page elements are visible
   */
  async isLoaded() {
    return await this.usernameInput.isVisible() && 
           await this.passwordInput.isVisible() && 
           await this.loginButton.isVisible();
  }

  /**
   * Clear login form
   */
  async clearForm() {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}

module.exports = { LoginPage };
