/**
 * RT Calculations - Required Time (RT) calculation functions
 * 
 * This module provides utility functions for calculating RT (Required Time) statistics
 * from task arrays. RT represents the estimated hours needed to complete a task.
 * 
 * Purpose:
 * - Calculate aggregate RT statistics (total, average, min, max)
 * - Provide reliable calculations with proper null/empty handling
 * - Support Realism Point (RP) calculations and task analysis
 * 
 * All RT calculations throughout the application should use functions from this module
 * to ensure consistency and proper handling of edge cases.
 */

/**
 * Calculate total RT (Required Time) from an array of tasks
 * 
 * Sums up all the Required Time values from the provided tasks array.
 * This is the primary function used for calculating total time commitments,
 * which is essential for Realism Point (RP) calculations.
 * 
 * Edge Cases Handled:
 * - Returns 0 for null, undefined, or non-array inputs
 * - Returns 0 for empty arrays
 * - Treats missing or invalid 'rt' property as 0 (doesn't break on malformed tasks)
 * 
 * @param {Array} tasks - Array of task objects with 'rt' property (Required Time in hours)
 * @returns {number} Total RT in hours (sum of all task RT values)
 * 
 * @example
 * const tasks = [
 *   { rt: 2.5, title: 'Task 1' },
 *   { rt: 1.0, title: 'Task 2' },
 *   { rt: 3.5, title: 'Task 3' }
 * ];
 * calculateTotalRT(tasks); // Returns: 7.0
 * 
 * calculateTotalRT([]); // Returns: 0
 * calculateTotalRT(null); // Returns: 0
 */
export function calculateTotalRT(tasks) {
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }
  return tasks.reduce((sum, task) => sum + (task.rt || 0), 0);
}

/**
 * Calculate average RT (Required Time) from an array of tasks
 * 
 * Computes the mean Required Time by dividing total RT by the number of tasks.
 * Useful for analyzing task duration patterns and identifying outliers.
 * 
 * Edge Cases Handled:
 * - Returns 0 for null, undefined, or non-array inputs
 * - Returns 0 for empty arrays (prevents division by zero)
 * 
 * @param {Array} tasks - Array of task objects with 'rt' property (Required Time in hours)
 * @returns {number} Average RT in hours (total RT divided by number of tasks)
 * 
 * @example
 * const tasks = [
 *   { rt: 2.0, title: 'Task 1' },
 *   { rt: 4.0, title: 'Task 2' },
 *   { rt: 6.0, title: 'Task 3' }
 * ];
 * calculateAverageRT(tasks); // Returns: 4.0 (12 / 3)
 * 
 * calculateAverageRT([]); // Returns: 0
 */
export function calculateAverageRT(tasks) {
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }
  const totalRT = calculateTotalRT(tasks);
  return totalRT / tasks.length;
}

/**
 * Calculate maximum RT (Required Time) from an array of tasks
 * 
 * Finds the task with the highest Required Time value. Useful for identifying
 * the longest task in a set, which can help with planning and time allocation.
 * 
 * Edge Cases Handled:
 * - Returns 0 for null, undefined, or non-array inputs
 * - Returns 0 for empty arrays
 * - Treats missing or invalid 'rt' property as 0
 * 
 * @param {Array} tasks - Array of task objects with 'rt' property (Required Time in hours)
 * @returns {number} Maximum RT in hours (highest RT value found)
 * 
 * @example
 * const tasks = [
 *   { rt: 2.0, title: 'Task 1' },
 *   { rt: 5.5, title: 'Task 2' },
 *   { rt: 1.0, title: 'Task 3' }
 * ];
 * calculateMaxRT(tasks); // Returns: 5.5
 */
export function calculateMaxRT(tasks) {
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }
  return Math.max(...tasks.map(task => task.rt || 0));
}

/**
 * Calculate minimum RT (Required Time) from an array of tasks
 * 
 * Finds the task with the lowest Required Time value. Useful for identifying
 * quick tasks that might be good candidates for completing first or fitting
 * into small time slots.
 * 
 * Edge Cases Handled:
 * - Returns 0 for null, undefined, or non-array inputs
 * - Returns 0 for empty arrays
 * - Treats missing or invalid 'rt' property as 0
 * 
 * @param {Array} tasks - Array of task objects with 'rt' property (Required Time in hours)
 * @returns {number} Minimum RT in hours (lowest RT value found)
 * 
 * @example
 * const tasks = [
 *   { rt: 2.0, title: 'Task 1' },
 *   { rt: 0.5, title: 'Task 2' },
 *   { rt: 3.0, title: 'Task 3' }
 * ];
 * calculateMinRT(tasks); // Returns: 0.5
 */
export function calculateMinRT(tasks) {
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }
  return Math.min(...tasks.map(task => task.rt || 0));
}

/**
 * Calculate comprehensive RT statistics from tasks
 * 
 * This is a convenience function that calculates all RT statistics in a single call.
 * Returns a complete statistics object containing total, average, maximum, minimum RT
 * and task count. Useful for displaying summary statistics in dashboards and reports.
 * 
 * This function is optimized to calculate all statistics efficiently by leveraging
 * the individual calculation functions. Use this when you need multiple RT statistics
 * at once to avoid redundant iterations over the tasks array.
 * 
 * @param {Array} tasks - Array of task objects with 'rt' property (Required Time in hours)
 * @returns {Object} Comprehensive RT statistics object containing:
 *   - totalRT: Total RT in hours (sum of all task RT values)
 *   - avgRT: Average RT in hours (mean of all task RT values)
 *   - maxRT: Maximum RT in hours (highest single task RT)
 *   - minRT: Minimum RT in hours (lowest single task RT)
 *   - taskCount: Number of tasks in the array (0 for invalid inputs)
 * 
 * @example
 * const tasks = [
 *   { rt: 2.0, title: 'Task 1' },
 *   { rt: 4.0, title: 'Task 2' },
 *   { rt: 1.5, title: 'Task 3' }
 * ];
 * calculateRTStats(tasks);
 * // Returns: {
 * //   totalRT: 7.5,
 * //   avgRT: 2.5,
 * //   maxRT: 4.0,
 * //   minRT: 1.5,
 * //   taskCount: 3
 * // }
 */
export function calculateRTStats(tasks) {
  return {
    totalRT: calculateTotalRT(tasks),
    avgRT: calculateAverageRT(tasks),
    maxRT: calculateMaxRT(tasks),
    minRT: calculateMinRT(tasks),
    taskCount: tasks && Array.isArray(tasks) ? tasks.length : 0,
  };
}

