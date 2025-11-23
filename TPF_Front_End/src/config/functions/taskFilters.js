/**
 * Task Filtering Functions - Task filtering utility functions
 * 
 * This module provides utility functions for filtering tasks by various criteria.
 * These functions are used throughout the application to display filtered task lists
 * based on date, importance level, parent-child relationships, and link status.
 * 
 * All filtering functions:
 * - Handle null/undefined/empty inputs gracefully (return empty array)
 * - Do not mutate the original tasks array (functional approach)
 * - Return new arrays suitable for React state updates
 */

/**
 * Filter tasks for a specific date
 * 
 * Filters tasks where the Ideal Deadline (IDL) falls on the specified date.
 * The date comparison is done by day (ignoring time) to match tasks scheduled
 * for the entire day.
 * 
 * Use Cases:
 * - Displaying tasks for "today" in the Dashboard
 * - Showing tasks for a selected date in Daily Tasks page
 * - Filtering tasks by deadline for planning purposes
 * 
 * @param {Array} tasks - Array of task objects with 'idl' property (Ideal Deadline)
 * @param {string|Date} date - Target date to filter by (YYYY-MM-DD string or Date object)
 * @param {boolean} includeSubtasks - Whether to include subtasks (default: false)
 *   - false: Only return root tasks (tasks without parentTaskId)
 *   - true: Return all tasks including subtasks
 * @returns {Array} Filtered array of tasks with IDL on the specified date
 * 
 * @example
 * const tasks = [
 *   { id: 1, idl: new Date('2024-01-15T10:00:00'), ... },
 *   { id: 2, idl: new Date('2024-01-16T14:00:00'), ... },
 *   { id: 3, idl: new Date('2024-01-15T20:00:00'), ... }
 * ];
 * filterTasksByDate(tasks, '2024-01-15'); // Returns tasks with id 1 and 3
 */
export function filterTasksByDate(tasks, date, includeSubtasks = false) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  const nextDay = new Date(targetDate);
  nextDay.setDate(nextDay.getDate() + 1);

  return tasks.filter((task) => {
    const taskDate = new Date(task.idl);
    const isInDateRange = taskDate >= targetDate && taskDate < nextDay;
    
    if (includeSubtasks) {
      return isInDateRange;
    }
    
    // Exclude subtasks when includeSubtasks is false
    return isInDateRange && !task.parentTaskId;
  });
}

/**
 * Filter tasks that have links (either linksTo or linkedFrom)
 * 
 * Returns only tasks that have at least one directional link relationship.
 * A task has links if:
 * - It links TO other tasks (task.linksTo array has items)
 * - OR other tasks link TO it (task.linkedFrom array has items)
 * 
 * Use Cases:
 * - Displaying linked tasks in Task Link Manager
 * - Showing task relationship network
 * - Identifying tasks with dependencies
 * 
 * @param {Array} tasks - Array of task objects with optional 'linksTo' and 'linkedFrom' properties
 * @returns {Array} Filtered array of tasks that have at least one link relationship
 * 
 * @example
 * const tasks = [
 *   { id: 1, linksTo: [2], linkedFrom: [] },
 *   { id: 2, linksTo: [], linkedFrom: [1] },
 *   { id: 3, linksTo: [], linkedFrom: [] }
 * ];
 * filterTasksWithLinks(tasks); // Returns tasks with id 1 and 2
 */
export function filterTasksWithLinks(tasks) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  return tasks.filter(
    (task) =>
      (task.linksTo && task.linksTo.length > 0) ||
      (task.linkedFrom && task.linkedFrom.length > 0)
  );
}

/**
 * Filter tasks by Importance Level
 * 
 * Returns only tasks that match the specified Importance Level (IL).
 * Importance Levels range from 1-4:
 * - 1 (MUST): Emergencies, finals, interviews
 * - 2 (HIGH): Long-term goals, projects
 * - 3 (MEDIUM): Side missions, hobbies
 * - 4 (OPTIONAL): Optional, mood-dependent tasks
 * 
 * Use Cases:
 * - Filtering tasks by priority in All Tasks page
 * - Showing only critical tasks during CWA (Catastrophic Wipe Out)
 * - Analyzing task distribution by importance level
 * 
 * @param {Array} tasks - Array of task objects with 'il' property (Importance Level 1-4)
 * @param {number} il - Importance Level to filter by (1-4)
 * @returns {Array} Filtered array of tasks with the specified Importance Level
 * 
 * @example
 * const tasks = [
 *   { id: 1, il: 1, title: 'Emergency task' },
 *   { id: 2, il: 2, title: 'High priority task' },
 *   { id: 3, il: 1, title: 'Another emergency' }
 * ];
 * filterTasksByImportance(tasks, 1); // Returns tasks with id 1 and 3
 */
export function filterTasksByImportance(tasks, il) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  return tasks.filter((task) => task.il === il);
}

/**
 * Filter root tasks (tasks without a parent)
 * 
 * Returns only top-level tasks that are not subtasks. Root tasks are tasks
 * that don't have a parentTaskId, meaning they are at the top of the task hierarchy.
 * 
 * Use Cases:
 * - Displaying task lists without nested subtasks (cleaner view)
 * - Showing parent tasks in task tree views
 * - Filtering for tasks available as parent candidates when creating subtasks
 * 
 * @param {Array} tasks - Array of task objects with optional 'parentTaskId' property
 * @returns {Array} Filtered array of root tasks (tasks without parentTaskId)
 * 
 * @example
 * const tasks = [
 *   { id: 1, parentTaskId: null },    // Root task
 *   { id: 2, parentTaskId: 1 },       // Subtask
 *   { id: 3, parentTaskId: null },    // Root task
 *   { id: 4, parentTaskId: 1 }        // Subtask
 * ];
 * filterRootTasks(tasks); // Returns tasks with id 1 and 3
 */
export function filterRootTasks(tasks) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  return tasks.filter((task) => !task.parentTaskId);
}

/**
 * Filter subtasks (tasks with a parent)
 * 
 * Returns tasks that have a parentTaskId, meaning they are subtasks in a
 * hierarchical task structure. Optionally filters by a specific parent task ID
 * to get only direct children of that parent.
 * 
 * Use Cases:
 * - Displaying all subtasks of a specific parent task
 * - Getting all subtasks in the system for analysis
 * - Building task hierarchy trees
 * 
 * @param {Array} tasks - Array of task objects with optional 'parentTaskId' property
 * @param {number} [parentTaskId] - Optional parent task ID to filter by
 *   - If provided: Returns only subtasks that belong to this specific parent
 *   - If null/undefined: Returns all subtasks regardless of parent
 * @returns {Array} Filtered array of subtasks (tasks with parentTaskId)
 * 
 * @example
 * const tasks = [
 *   { id: 1, parentTaskId: null },
 *   { id: 2, parentTaskId: 1 },    // Subtask of task 1
 *   { id: 3, parentTaskId: 1 },    // Subtask of task 1
 *   { id: 4, parentTaskId: 5 },    // Subtask of task 5
 *   { id: 5, parentTaskId: null }
 * ];
 * filterSubtasks(tasks);        // Returns tasks with id 2, 3, 4
 * filterSubtasks(tasks, 1);     // Returns tasks with id 2, 3
 * filterSubtasks(tasks, 5);     // Returns task with id 4
 */
export function filterSubtasks(tasks, parentTaskId = null) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  return tasks.filter((task) => {
    if (!task.parentTaskId) {
      return false;
    }
    if (parentTaskId !== null) {
      return task.parentTaskId === parentTaskId;
    }
    return true;
  });
}

