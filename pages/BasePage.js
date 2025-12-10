/**
 * Base Page Class
 * Contains common methods used across all page objects
 */

class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector - The CSS selector
   */
  async waitForElement(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Click on an element
   * @param {string} selector - The CSS selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill a text input
   * @param {string} selector - The CSS selector
   * @param {string} text - The text to fill
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of an element
   * @param {string} selector - The CSS selector
   * @returns {Promise<string>} The text content
   */
  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Check if element is visible
   * @param {string} selector - The CSS selector
   * @returns {Promise<boolean>} True if visible
   */
  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Take a screenshot
   * @param {string} filename - The filename for the screenshot
   */
  async takeScreenshot(filename) {
    await this.page.screenshot({ path: `test-results/${filename}` });
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get current URL
   * @returns {string} Current page URL
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Scroll to element
   * @param {string} selector - The CSS selector
   */
  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }
}

module.exports = { BasePage };
