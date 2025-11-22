/**
 * Date utility functions for exam calculations
 */

/**
 * Calculate days remaining until a date
 * @param {string|Date} examDate - The exam date
 * @returns {number} Days remaining (can be negative if date has passed)
 */
export const getDaysRemaining = (examDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0);
  
  const diffTime = exam - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Format date to YYYY-MM-DD string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get today's date as YYYY-MM-DD string
 * @returns {string} Today's date
 */
export const getToday = () => {
  return formatDate(new Date());
};

/**
 * Check if a date string is valid
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if valid date
 */
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Check if a date is in the future
 * @param {string|Date} date - Date to check
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate > today;
};

/**
 * Get date range between two dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {number} Number of days in range
 */
export const getDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

