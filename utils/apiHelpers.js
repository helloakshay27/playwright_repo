/**
 * API Helper Utilities
 * 
 * Helper functions specifically for API testing
 */

/**
 * Build query string from object
 * @param {Object} params - Query parameters
 * @returns {string} Query string
 */
function buildQueryString(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

/**
 * Validate API response status
 * @param {Object} response - API response
 * @param {number} expectedStatus - Expected status code
 * @returns {boolean} True if status matches
 */
function validateResponseStatus(response, expectedStatus) {
  return response.status() === expectedStatus;
}

/**
 * Extract error message from response
 * @param {Object} response - API response
 * @returns {Promise<string>} Error message
 */
async function extractErrorMessage(response) {
  try {
    const body = await response.json();
    return body.message || body.error || 'Unknown error';
  } catch (error) {
    return await response.text();
  }
}

/**
 * Create authorization header
 * @param {string} token - Auth token
 * @param {string} type - Auth type (Bearer, Basic, etc.)
 * @returns {Object} Authorization header
 */
function createAuthHeader(token, type = 'Bearer') {
  return {
    'Authorization': `${type} ${token}`
  };
}

/**
 * Create basic auth header
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Object} Authorization header
 */
function createBasicAuthHeader(username, password) {
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');
  return {
    'Authorization': `Basic ${credentials}`
  };
}

/**
 * Validate JSON response structure
 * @param {Object} data - Response data
 * @param {Array} requiredFields - Required field names
 * @returns {boolean} True if all fields present
 */
function validateResponseStructure(data, requiredFields) {
  return requiredFields.every(field => data.hasOwnProperty(field));
}

/**
 * Parse JSON response safely
 * @param {Object} response - API response
 * @returns {Promise<Object>} Parsed JSON or error object
 */
async function safeJsonParse(response) {
  try {
    return await response.json();
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return { error: 'Invalid JSON response' };
  }
}

/**
 * Measure API response time
 * @param {Function} apiCall - API call function
 * @returns {Promise<Object>} Response and time taken
 */
async function measureResponseTime(apiCall) {
  const startTime = Date.now();
  const response = await apiCall();
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  return {
    response,
    responseTime
  };
}

/**
 * Retry API call on failure
 * @param {Function} apiCall - API call function
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Delay between retries
 * @returns {Promise<Object>} API response
 */
async function retryApiCall(apiCall, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await apiCall();
      if (response.ok() || response.status() < 500) {
        return response;
      }
      throw new Error(`API returned status ${response.status()}`);
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(`API call attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Validate response headers
 * @param {Object} response - API response
 * @param {Object} expectedHeaders - Expected headers
 * @returns {boolean} True if headers match
 */
function validateHeaders(response, expectedHeaders) {
  const headers = response.headers();
  return Object.keys(expectedHeaders).every(key => {
    const headerValue = headers[key.toLowerCase()];
    return headerValue && headerValue.includes(expectedHeaders[key]);
  });
}

/**
 * Create multipart form data
 * @param {Object} data - Form data
 * @returns {FormData} FormData object
 */
function createFormData(data) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return formData;
}

/**
 * Log API request details
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 * @param {Object} data - Request data
 */
function logApiRequest(method, url, data = null) {
  console.log(`\n📡 API Request: ${method} ${url}`);
  if (data) {
    console.log('Request Data:', JSON.stringify(data, null, 2));
  }
}

/**
 * Log API response details
 * @param {Object} response - API response
 * @param {Object} data - Response data
 */
function logApiResponse(response, data = null) {
  console.log(`\n✅ API Response: ${response.status()} ${response.statusText()}`);
  if (data) {
    console.log('Response Data:', JSON.stringify(data, null, 2));
  }
}

/**
 * Check if response is successful (2xx status)
 * @param {Object} response - API response
 * @returns {boolean} True if successful
 */
function isSuccessResponse(response) {
  const status = response.status();
  return status >= 200 && status < 300;
}

/**
 * Extract pagination info from response
 * @param {Object} headers - Response headers
 * @returns {Object} Pagination info
 */
function extractPaginationInfo(headers) {
  return {
    total: headers['x-total-count'] || null,
    page: headers['x-page'] || null,
    perPage: headers['x-per-page'] || null
  };
}

module.exports = {
  buildQueryString,
  validateResponseStatus,
  extractErrorMessage,
  createAuthHeader,
  createBasicAuthHeader,
  validateResponseStructure,
  safeJsonParse,
  measureResponseTime,
  retryApiCall,
  validateHeaders,
  createFormData,
  logApiRequest,
  logApiResponse,
  isSuccessResponse,
  extractPaginationInfo
};
