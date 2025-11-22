/**
 * Normalization utilities for converting values to 0-100 range
 */

/**
 * Normalize a value to 0-100 range
 * @param {number} value - The value to normalize
 * @param {number} min - Minimum value in original range
 * @param {number} max - Maximum value in original range
 * @returns {number} Normalized value between 0-100
 */
export const normalize = (value, min, max) => {
  if (max === min) return 50; // Default to middle if no range
  const normalized = ((value - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, normalized)); // Clamp to 0-100
};

/**
 * Normalize a value that's already in 0-1 range to 0-100
 * @param {number} value - Value between 0-1
 * @returns {number} Value between 0-100
 */
export const normalizeFrom01 = (value) => {
  return Math.max(0, Math.min(100, value * 100));
};

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export const clamp = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Normalize difficulty (1-5) to 0-1 range
 * @param {number} difficulty - Difficulty level 1-5
 * @returns {number} Normalized difficulty 0-1
 */
export const normalizeDifficulty = (difficulty) => {
  return clamp(difficulty / 5, 0, 1);
};

/**
 * Normalize confidence (1-5) to 0-1 range (inverted - low confidence = high urgency)
 * @param {number} confidence - Confidence level 1-5
 * @returns {number} Normalized confidence 0-1 (inverted)
 */
export const normalizeConfidence = (confidence) => {
  return clamp((6 - confidence) / 5, 0, 1);
};

