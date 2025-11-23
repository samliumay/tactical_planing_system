/**
 * Realism Point Calculations - RP (Realism Point) calculation functions
 * 
 * This module provides functions for calculating and interpreting the Realism Point (RP),
 * which is a critical load factor metric used to determine if a daily plan is feasible.
 * 
 * Realism Point Formula:
 * RP = Total Required Time (RT) / Available Free Time
 * 
 * RP Zones (as defined in PF-D documentation):
 * - Safe Zone (RP < 0.8): Plan is realistic with good buffer time
 *   → Green indicator, user can proceed confidently
 * 
 * - Risky Zone (0.8 ≤ RP < 1.0): Tight schedule, requires focus
 *   → Yellow indicator, user should be cautious and minimize distractions
 * 
 * - Overload (RP ≥ 1.0): Impossible to complete in available time
 *   → Red indicator, immediate action required (CWA, postpone tasks, or increase available time)
 * 
 * The RP metric is displayed prominently on the Dashboard to help users make informed
 * decisions about their daily task load and prevent overcommitment.
 */

import { RP_LIMITS } from '../constants';
import { calculateTotalRT } from './rtCalculations';

/**
 * Calculate Realism Point (RP) for given tasks and available time
 * 
 * Computes the load factor by dividing total required time by available free time.
 * This metric indicates how much of the available time is allocated to tasks.
 * 
 * Edge Cases:
 * - If availableTime is 0 or negative, returns 0 (to avoid division by zero)
 * - If tasks array is empty, returns 0 (totalRT would be 0)
 * 
 * @param {Array} tasks - Array of task objects with 'rt' property (Required Time in hours)
 * @param {number} availableTime - Available free time in hours (user-configurable, default 8)
 * @returns {number} Realism Point value (0 to infinity)
 *   - < 0.8: Safe zone
 *   - 0.8 - 1.0: Risky zone
 *   - ≥ 1.0: Overload
 * 
 * @example
 * const tasks = [{ rt: 6 }, { rt: 2 }]; // 8 hours total
 * calculateRealismPoint(tasks, 10); // Returns: 0.8 (Risky zone)
 * calculateRealismPoint(tasks, 8);  // Returns: 1.0 (Overload threshold)
 * calculateRealismPoint(tasks, 12); // Returns: 0.67 (Safe zone)
 */
export function calculateRealismPoint(tasks, availableTime) {
  // Handle edge case: invalid available time
  if (!availableTime || availableTime <= 0) {
    return 0;
  }
  const totalRT = calculateTotalRT(tasks);
  return totalRT / availableTime;
}

/**
 * Get RP status with styling information
 * 
 * Determines the Realism Point zone (Safe, Risky, or Overload) and returns
 * comprehensive styling information for displaying the status in the UI.
 * 
 * This function is used by the Dashboard and other components to:
 * - Display appropriate status labels and emojis
 * - Apply consistent color coding (green/yellow/red)
 * - Provide CSS classes for styling status indicators
 * 
 * @param {number} rp - Realism Point value (calculated from calculateRealismPoint)
 * @returns {Object} Status object with comprehensive styling information:
 *   - label: Human-readable status label ('Safe Zone', 'Risky Zone', 'Overload')
 *   - emoji: Visual status indicator emoji (🟢, 🟡, 🔴)
 *   - statusClass: CSS class for status container styling
 *   - textColor: CSS class for primary text color
 *   - bgColor: CSS class for background color
 *   - borderColor: CSS class for border color
 *   - statusTextColor: CSS class for status text color
 *   - messageColor: CSS class for message/warning text color
 *   - status: Short status string ('Safe', 'Risky', 'Overload')
 *   - color: Primary color class
 * 
 * @example
 * getRPStatus(0.5)  // Returns Safe Zone object with green styling
 * getRPStatus(0.9)  // Returns Risky Zone object with yellow styling
 * getRPStatus(1.2)  // Returns Overload object with red styling
 */
export function getRPStatus(rp) {
  // Safe Zone: RP < 0.8 - Plan is realistic with good buffer
  if (rp < RP_LIMITS.SAFE) {
    return {
      label: 'Safe Zone',
      emoji: '🟢',
      statusClass: 'status--safe',
      textColor: 'text--green-600',
      bgColor: 'bg--green-50',
      borderColor: 'border--green-200',
      statusTextColor: 'text--green-800',
      messageColor: 'text--green-700',
      status: 'Safe',
      color: 'text--green-600',
    };
  }
  // Risky Zone: 0.8 ≤ RP < 1.0 - Tight schedule, requires focus
  else if (rp < RP_LIMITS.RISKY) {
    return {
      label: 'Risky Zone',
      emoji: '🟡',
      statusClass: 'status--risky',
      textColor: 'text--yellow-600',
      bgColor: 'bg--yellow-50',
      borderColor: 'border--yellow-200',
      statusTextColor: 'text--yellow-800',
      messageColor: 'text--yellow-700',
      status: 'Risky',
      color: 'text--yellow-600',
    };
  }
  // Overload: RP ≥ 1.0 - Impossible, immediate action required
  else {
    return {
      label: 'Overload',
      emoji: '🔴',
      statusClass: 'status--overload',
      textColor: 'text--red-600',
      bgColor: 'bg--red-50',
      borderColor: 'border--red-200',
      statusTextColor: 'text--red-800',
      messageColor: 'text--red-700',
      status: 'Overload',
      color: 'text--red-600',
    };
  }
}

/**
 * Calculate comprehensive RP statistics with status
 * 
 * This is a convenience function that calculates both the RP value and its status
 * information in a single call. It combines the calculation and status determination
 * to provide a complete RP analysis object ready for display.
 * 
 * Use this function when you need both the numeric RP value and all the status
 * information for displaying in the UI (e.g., Dashboard component).
 * 
 * @param {Array} tasks - Array of task objects with 'rt' property (Required Time in hours)
 * @param {number} availableTime - Available free time in hours
 * @returns {Object} Comprehensive RP statistics object containing:
 *   - rp: Realism Point value (number)
 *   - totalRT: Total Required Time in hours (number)
 *   - availableTime: Available time in hours (number)
 *   - ...status: All properties from getRPStatus() spread into the object:
 *     * label, emoji, statusClass, textColor, bgColor, borderColor, etc.
 * 
 * @example
 * const stats = calculateRPStats(tasks, 8);
 * // Returns: {
 * //   rp: 0.875,
 * //   totalRT: 7,
 * //   availableTime: 8,
 * //   label: 'Risky Zone',
 * //   emoji: '🟡',
 * //   statusClass: 'status--risky',
 * //   ... (other status properties)
 * // }
 */
export function calculateRPStats(tasks, availableTime) {
  const rp = calculateRealismPoint(tasks, availableTime);
  const status = getRPStatus(rp);
  const totalRT = calculateTotalRT(tasks);

  return {
    rp,
    totalRT,
    availableTime,
    ...status,
  };
}

