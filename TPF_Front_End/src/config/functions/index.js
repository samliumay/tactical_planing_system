/**
 * Functions Index - Central export for all utility functions
 * 
 * This is the main entry point for all utility functions used throughout the application.
 * It provides a centralized location for importing calculation, filtering, sorting, and
 * formatting functions.
 * 
 * Purpose:
 * - Centralizes all utility function exports for easier imports
 * - Provides a single source of truth for available utility functions
 * - Makes refactoring easier by grouping related functions
 * 
 * Usage:
 * import { calculateTotalRT, getImportanceLabel, sortTasksByPriority } from '../config/functions';
 * 
 * Categories:
 * - RT Calculations: Functions for calculating Required Time statistics
 * - Realism Point Calculations: Functions for calculating RP metrics and status
 * - Importance Level Functions: Functions for working with IL (1-4)
 * - Task Filtering Functions: Functions for filtering tasks by various criteria
 * - Task Sorting Functions: Functions for sorting tasks by priority, deadline, RT, etc.
 */

// RT Calculations
export {
  calculateTotalRT,
  calculateAverageRT,
  calculateMaxRT,
  calculateMinRT,
  calculateRTStats,
} from './rtCalculations';

// Realism Point Calculations
export {
  calculateRealismPoint,
  getRPStatus,
  calculateRPStats,
} from './realismPoint';

// Importance Level Functions
export {
  getImportanceLabel,
  getImportanceColor,
  getImportanceInfo,
} from './importanceLevel';

// Task Filtering Functions
export {
  filterTasksByDate,
  filterTasksWithLinks,
  filterTasksByImportance,
  filterRootTasks,
  filterSubtasks,
} from './taskFilters';

// Task Sorting Functions
export {
  sortTasksByPriority,
  sortTasksByDeadline,
  sortTasksByRT,
  sortTasksByRTDesc,
} from './taskSorting';

