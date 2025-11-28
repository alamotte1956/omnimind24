/**
 * String Helper Utility
 * Ensures all AI API calls receive properly formatted string content
 */

const logger = require('../config/logger');

/**
 * Ensures the input is always returned as a string
 * @param {*} value - Any value (string, object, array, etc.)
 * @param {string} context - Optional context for logging (e.g., 'OpenAI prompt', 'Claude request')
 * @returns {string} - String representation of the value
 */
function ensureString(value, context = 'unknown') {
  // Already a string
  if (typeof value === 'string') {
    return value;
  }
  
  // Null or undefined
  if (value == null) {
    logger.warn(`[ensureString] Received null/undefined for ${context}, returning empty string`);
    return '';
  }
  
  // Object or Array - convert to JSON string
  if (typeof value === 'object') {
    try {
      const jsonString = JSON.stringify(value, null, 2);
      logger.debug(`[ensureString] Converted object to JSON string for ${context}`);
      return jsonString;
    } catch (error) {
      logger.error(`[ensureString] Failed to stringify object for ${context}:`, error);
      return String(value);
    }
  }
  
  // Number, boolean, etc. - convert to string
  const stringValue = String(value);
  logger.debug(`[ensureString] Converted ${typeof value} to string for ${context}`);
  return stringValue;
}

/**
 * Safely extracts prompt from various input formats
 * Handles both string prompts and object payloads with nested prompt fields
 * @param {string|object} input - Prompt string or payload object
 * @returns {string} - Extracted and cleaned prompt string
 */
function extractPrompt(input) {
  if (typeof input === 'string') {
    return input.trim();
  }
  
  if (typeof input === 'object' && input !== null) {
    // Check common prompt field names
    const promptFields = ['prompt', 'content', 'text', 'message', 'query'];
    
    for (const field of promptFields) {
      if (input[field]) {
        return ensureString(input[field], 'extracted prompt');
      }
    }
    
    // If no prompt field found, stringify the whole object
    logger.warn('[extractPrompt] No prompt field found in object, stringifying entire object');
    return ensureString(input, 'full object as prompt');
  }
  
  return ensureString(input, 'unknown input type');
}

/**
 * Validates that a prompt is not empty after cleaning
 * @param {string} prompt - The prompt to validate
 * @param {string} serviceName - Name of the AI service for error messages
 * @throws {Error} - If prompt is empty or invalid
 */
function validatePrompt(prompt, serviceName = 'AI Service') {
  const cleanPrompt = prompt.trim();
  
  if (!cleanPrompt || cleanPrompt.length === 0) {
    throw new Error(`[${serviceName}] Prompt cannot be empty`);
  }
  
  if (cleanPrompt.length > 100000) {
    logger.warn(`[${serviceName}] Prompt is very long (${cleanPrompt.length} chars), may exceed API limits`);
  }
  
  return cleanPrompt;
}

/**
 * Prepares content for AI API calls
 * Combines extraction, string conversion, and validation
 * @param {*} input - Any input (string, object, etc.)
 * @param {string} serviceName - Name of the AI service
 * @returns {string} - Clean, validated string ready for API call
 */
function prepareContent(input, serviceName = 'AI Service') {
  try {
    // Extract prompt from input
    const extracted = extractPrompt(input);
    
    // Ensure it's a string
    const stringified = ensureString(extracted, `${serviceName} content`);
    
    // Validate it's not empty
    const validated = validatePrompt(stringified, serviceName);
    
    return validated;
  } catch (error) {
    logger.error(`[prepareContent] Error preparing content for ${serviceName}:`, error);
    throw error;
  }
}

/**
 * Truncates long strings for logging (prevents log spam)
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length (default: 200)
 * @returns {string} - Truncated string with ellipsis if needed
 */
function truncateForLog(str, maxLength = 200) {
  const stringValue = ensureString(str, 'log truncation');
  
  if (stringValue.length <= maxLength) {
    return stringValue;
  }
  
  return stringValue.substring(0, maxLength) + '... (truncated)';
}

module.exports = {
  ensureString,
  extractPrompt,
  validatePrompt,
  prepareContent,
  truncateForLog
};
