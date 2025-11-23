/**
 * Task Sorting Functions - Task sorting utility functions
 * 
 * This module provides utility functions for sorting tasks by various criteria.
 * All sorting functions follow functional programming principles: they do not
 * mutate the original array and return a new sorted array.
 * 
 * Sorting Functions:
 * - sortTasksByPriority: Primary sorting method (IL then IDL) - used by default
 * - sortTasksByDeadline: Sort by Ideal Deadline (earliest first)
 * - sortTasksByRT: Sort by Required Time (shortest first)
 * - sortTasksByRTDesc: Sort by Required Time (longest first)
 */

/**
 * Sort tasks by Priority (IL ASC, then IDL ASC)
 * 
 * This is the PRIMARY sorting method used throughout the application, as defined
 * in the PF-D documentation. Tasks are sorted using a two-level priority system:
 * 
 * Primary Sort: Importance Level (IL) - Ascending
 *   - Level 1 (MUST) tasks appear first
 *   - Followed by Level 2 (HIGH), Level 3 (MEDIUM), Level 4 (OPTIONAL)
 * 
 * Secondary Sort: Ideal Deadline (IDL) - Ascending
 *   - Within each importance level, tasks are sorted by deadline
 *   - Earliest deadlines appear first
 * 
 * This ensures that critical tasks (Level 1) are always prioritized, and within
 * each level, urgent deadlines are handled first.
 * 
 * IMPORTANT: This function does NOT mutate the original array. It creates a new
 * sorted array, making it safe for React state updates.
 * 
 * @param {Array} tasks - Array of task objects with 'il' (Importance Level) and 'idl' (Ideal Deadline) properties
 * @returns {Array} New sorted array of tasks (original array is not modified)
 * 
 * @example
 * const tasks = [
 *   { id: 1, il: 2, idl: new Date('2024-01-20') },
 *   { id: 2, il: 1, idl: new Date('2024-01-25') },  // Level 1 (MUST)
 *   { id: 3, il: 1, idl: new Date('2024-01-15') },  // Level 1 (MUST), earlier deadline
 *   { id: 4, il: 2, idl: new Date('2024-01-18') }
 * ];
 * sortTasksByPriority(tasks);
 * // Returns: [task 3, task 2, task 4, task 1]
 * // (Level 1 tasks first, then Level 2, with earlier deadlines within each level first)
 */
export function sortTasksByPriority(tasks) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  return [...tasks].sort((a, b) => {
    // Primary sort: by Importance Level (ascending)
    if (a.il !== b.il) {
      return (a.il || 0) - (b.il || 0);
    }
    // Secondary sort: by Ideal Deadline (ascending - earliest first)
    const dateA = new Date(a.idl || 0);
    const dateB = new Date(b.idl || 0);
    return dateA - dateB;
  });
}

/**
 * Sort tasks by deadline (IDL) - earliest first
 * 
 * Sorts tasks by their Ideal Deadline (IDL) in ascending order, placing tasks
 * with earlier deadlines first. This is useful when you want to see tasks in
 * chronological order regardless of importance level.
 * 
 * Edge Cases Handled:
 * - Missing or invalid IDL values are treated as Date(0) (epoch time)
 * - Null/undefined/empty arrays return empty array
 * 
 * NOTE: This function does NOT mutate the original array. Use this when you
 * specifically need chronological sorting rather than priority-based sorting.
 * 
 * @param {Array} tasks - Array of task objects with 'idl' property (Ideal Deadline)
 * @returns {Array} New sorted array of tasks ordered by deadline (earliest first)
 * 
 * @example
 * const tasks = [
 *   { id: 1, idl: new Date('2024-01-20') },
 *   { id: 2, idl: new Date('2024-01-15') },
 *   { id: 3, idl: new Date('2024-01-25') }
 * ];
 * sortTasksByDeadline(tasks);
 * // Returns: [task 2, task 1, task 3] (ordered by deadline)
 */
export function sortTasksByDeadline(tasks) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.idl || 0);
    const dateB = new Date(b.idl || 0);
    return dateA - dateB;
  });
}

/**
 * Sort tasks by RT (Required Time) - ascending (shortest first)
 * 
 * Sorts tasks by their Required Time (RT) in ascending order, placing tasks
 * with shorter durations first. This is useful for:
 * - Finding quick tasks to complete during small time slots
 * - Identifying tasks that take the least time
 * - "Quick wins" approach to task completion
 * 
 * Edge Cases Handled:
 * - Missing or invalid RT values are treated as 0
 * - Null/undefined/empty arrays return empty array
 * 
 * NOTE: This function does NOT mutate the original array.
 * 
 * @param {Array} tasks - Array of task objects with 'rt' property (Required Time in hours)
 * @returns {Array} New sorted array of tasks ordered by RT (shortest duration first)
 * 
 * @example
 * const tasks = [
 *   { id: 1, rt: 5.0 },
 *   { id: 2, rt: 1.5 },
 *   { id: 3, rt: 3.0 }
 * ];
 * sortTasksByRT(tasks);
 * // Returns: [task 2, task 3, task 1] (ordered by RT, shortest first)
 */
export function sortTasksByRT(tasks) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  return [...tasks].sort((a, b) => {
    return (a.rt || 0) - (b.rt || 0);
  });
}

/**
 * Sort tasks by RT (Required Time) - descending (longest first)
 * 
 * Sorts tasks by their Required Time (RT) in descending order, placing tasks
 * with longer durations first. This is useful for:
 * - Identifying the most time-consuming tasks
 * - Planning around large tasks first
 * - Understanding which tasks require the most commitment
 * 
 * Edge Cases Handled:
 * - Missing or invalid RT values are treated as 0
 * - Null/undefined/empty arrays return empty array
 * 
 * NOTE: This function does NOT mutate the original array.
 * 
 * @param {Array} tasks - Array of task objects with 'rt' property (Required Time in hours)
 * @returns {Array} New sorted array of tasks ordered by RT (longest duration first)
 * 
 * @example
 * const tasks = [
 *   { id: 1, rt: 2.0 },
 *   { id: 2, rt: 5.5 },
 *   { id: 3, rt: 1.0 }
 * ];
 * sortTasksByRTDesc(tasks);
 * // Returns: [task 2, task 1, task 3] (ordered by RT, longest first)
 */
export function sortTasksByRTDesc(tasks) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  return [...tasks].sort((a, b) => {
    return (b.rt || 0) - (a.rt || 0);
  });
}

