/**
 * Importance Level Functions - IL (Importance Level) utility functions
 * 
 * This module provides utility functions for working with Importance Levels (IL) throughout
 * the application. Importance Levels range from 1-4 and determine task priority:
 * 
 * - Level 1 (MUST): Emergencies, finals, interviews - non-negotiable tasks
 * - Level 2 (HIGH): Long-term goals, sub-tasks of big projects
 * - Level 3 (MEDIUM): Side missions, hobbies, books
 * - Level 4 (OPTIONAL): Optional, mood-dependent tasks
 * 
 * These functions are used for:
 * - Displaying human-readable labels in the UI
 * - Applying consistent styling (badges, colors) across components
 * - Formatting importance levels for display purposes
 * 
 * All functions handle invalid input gracefully by returning default values.
 */

import { IMPORTANCE } from '../constants';

/**
 * Get human-readable label for Importance Level
 * 
 * Converts a numeric Importance Level (1-4) into a human-readable string label.
 * Used throughout the UI to display task importance levels in a user-friendly format.
 * 
 * @param {number} il - Importance Level (1-4)
 * @returns {string} Label string ('Must', 'High', 'Medium', 'Optional', or 'Unknown' for invalid input)
 * 
 * @example
 * getImportanceLabel(1) // Returns: 'Must'
 * getImportanceLabel(2) // Returns: 'High'
 * getImportanceLabel(5) // Returns: 'Unknown'
 */
export function getImportanceLabel(il) {
  const labels = {
    [IMPORTANCE.MUST]: 'Must',      // Level 1: Emergencies, Finals, Interviews
    [IMPORTANCE.HIGH]: 'High',      // Level 2: Long-term goals, Projects
    [IMPORTANCE.MEDIUM]: 'Medium',  // Level 3: Side missions, Hobbies
    [IMPORTANCE.OPTIONAL]: 'Optional', // Level 4: Optional, mood-dependent
  };
  return labels[il] || 'Unknown';
}

/**
 * Get CSS class for Importance Level badge styling
 * 
 * Returns the appropriate CSS class string for styling importance level badges.
 * Each level has a distinct color scheme to provide visual differentiation:
 * - Red for critical (MUST)
 * - Orange for high priority
 * - Yellow for medium priority
 * - Gray for optional tasks
 * 
 * @param {number} il - Importance Level (1-4)
 * @returns {string} CSS class string for badge styling (e.g., 'badge badge--red')
 * 
 * @example
 * getImportanceColor(1) // Returns: 'badge badge--red'
 * getImportanceColor(4) // Returns: 'badge badge--gray'
 */
export function getImportanceColor(il) {
  const colors = {
    [IMPORTANCE.MUST]: 'badge badge--red',      // Red for critical
    [IMPORTANCE.HIGH]: 'badge badge--orange',   // Orange for high priority
    [IMPORTANCE.MEDIUM]: 'badge badge--yellow', // Yellow for medium
    [IMPORTANCE.OPTIONAL]: 'badge badge--gray', // Gray for optional
  };
  return colors[il] || 'badge badge--gray';
}

/**
 * Get all importance level information
 * 
 * Returns a comprehensive object containing all available information about an
 * importance level. This is useful when you need both the label and styling
 * information together.
 * 
 * @param {number} il - Importance Level (1-4)
 * @returns {Object} Object containing:
 *   - label: Human-readable label string
 *   - color: CSS class string for styling
 *   - value: The numeric importance level value
 * 
 * @example
 * getImportanceInfo(1)
 * // Returns: { label: 'Must', color: 'badge badge--red', value: 1 }
 */
export function getImportanceInfo(il) {
  return {
    label: getImportanceLabel(il),
    color: getImportanceColor(il),
    value: il,
  };
}

