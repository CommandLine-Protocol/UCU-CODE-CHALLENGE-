/**
 * Sorting utilities for modules and data
 */

/**
 * Sort exams by urgency score (highest first)
 * @param {Array} exams - Array of exam objects with urgencyScore
 * @returns {Array} Sorted exams array
 */
export const sortByUrgency = (exams) => {
  return [...exams].sort((a, b) => {
    const urgencyA = a.urgencyScore || 0;
    const urgencyB = b.urgencyScore || 0;
    return urgencyB - urgencyA; // Descending order
  });
};

/**
 * Sort exams by date (earliest first)
 * @param {Array} exams - Array of exam objects with examDate
 * @returns {Array} Sorted exams array
 */
export const sortByDate = (exams) => {
  return [...exams].sort((a, b) => {
    const dateA = new Date(a.examDate);
    const dateB = new Date(b.examDate);
    return dateA - dateB;
  });
};

/**
 * Sort modules by a custom order or alphabetically
 * @param {Array} modules - Array of module objects
 * @param {Array} order - Preferred order of module IDs
 * @returns {Array} Sorted modules array
 */
export const sortModules = (modules, order = []) => {
  if (!order.length) {
    return [...modules].sort((a, b) => a.title.localeCompare(b.title));
  }
  
  return [...modules].sort((a, b) => {
    const indexA = order.indexOf(a.id);
    const indexB = order.indexOf(b.id);
    
    // If both in order, sort by order
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    // If only A in order, A comes first
    if (indexA !== -1) return -1;
    // If only B in order, B comes first
    if (indexB !== -1) return 1;
    // Neither in order, sort alphabetically
    return a.title.localeCompare(b.title);
  });
};

/**
 * Sort by multiple criteria
 * @param {Array} items - Array of items to sort
 * @param {Array} sortKeys - Array of sort key functions
 * @returns {Array} Sorted items
 */
export const sortByMultiple = (items, sortKeys) => {
  return [...items].sort((a, b) => {
    for (const keyFn of sortKeys) {
      const result = keyFn(a, b);
      if (result !== 0) return result;
    }
    return 0;
  });
};

