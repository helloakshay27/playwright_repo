/**
 * Helper Utilities
 * 
 * Common helper functions used across tests
 */

/**
 * Generate random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email
 * @returns {string} Random email address
 */
function generateRandomEmail() {
  const randomStr = generateRandomString(8);
  return `test.${randomStr}@example.com`;
}

/**
 * Generate random number
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function generateRandomNumber(min = 1, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Wait for specified milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after timeout
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get current date in specified format
 * @param {string} format - Date format (default: YYYY-MM-DD)
 * @returns {string} Formatted date
 */
function getCurrentDate(format = 'YYYY-MM-DD') {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  } else if (format === 'DD-MM-YYYY') {
    return `${day}-${month}-${year}`;
  } else if (format === 'MM/DD/YYYY') {
    return `${month}/${day}/${year}`;
  }
  return `${year}-${month}-${day}`;
}

/**
 * Get timestamp
 * @returns {number} Current timestamp
 */
function getTimestamp() {
  return Date.now();
}

/**
 * Sanitize string (remove special characters)
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeString(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Retry function until it succeeds or max attempts reached
 * @param {Function} fn - Function to retry
 * @param {number} maxAttempts - Maximum retry attempts
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} Result of the function
 */
async function retryUntilSuccess(fn, maxAttempts = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await wait(delay);
    }
  }
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency
 */
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Generate test report filename
 * @param {string} testName - Name of the test
 * @returns {string} Report filename
 */
function generateReportFilename(testName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sanitizedName = sanitizeString(testName);
  return `${sanitizedName}-${timestamp}.html`;
}

/**
 * Log with timestamp
 * @param {string} message - Message to log
 */
function logWithTimestamp(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {string} Percentage string
 */
function calculatePercentage(value, total) {
  if (total === 0) return '0%';
  const percentage = ((value / total) * 100).toFixed(2);
  return `${percentage}%`;
}

module.exports = {
  generateRandomString,
  generateRandomEmail,
  generateRandomNumber,
  wait,
  getCurrentDate,
  getTimestamp,
  sanitizeString,
  retryUntilSuccess,
  formatCurrency,
  isValidEmail,
  deepClone,
  generateReportFilename,
  logWithTimestamp,
  calculatePercentage
};
