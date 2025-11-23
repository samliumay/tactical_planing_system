/**
 * TaskItem - Hierarchical task item component with checkbox (TickTick-style)
 * 
 * A reusable component for displaying individual tasks in a hierarchical structure.
 * Inspired by TickTick's clean, minimal task display with clickable checkboxes.
 * 
 * Features:
 * - Clickable checkbox: Toggle task completion status
 * - Hierarchical display: Supports nested subtasks with indentation
 * - Visual completion state: Strikethrough and muted styling for completed tasks
 * - Task metadata: Displays RT (Required Time), deadline, and importance level
 * - Recursive rendering: Automatically renders subtasks at deeper levels
 * 
 * Visual Structure:
 * ☐ Task Title [Importance Badge]
 *   ⏱️ 2h | 📅 Jan 15 | 📋 3 subtasks
 *   ├─ ☐ Subtask 1
 *   └─ ☐ Subtask 2
 * 
 * The component uses the PlanningContext to:
 * - Access task management functions (toggleTaskCompletion, getSubtasks)
 * - Maintain task state and relationships
 * 
 * Usage:
 * <TaskItem task={task} level={0} showSubtasks={true} />
 * 
 * @param {Object} props - Component props
 * @param {Object} props.task - Task object with properties:
 *   - id: Task unique identifier
 *   - title: Task title/description
 *   - rt: Required Time in hours
 *   - idl: Ideal Deadline (Date object)
 *   - il: Importance Level (1-4)
 *   - completed: Boolean completion status
 *   - parentTaskId: Optional parent task ID for subtasks
 * @param {number} [props.level=0] - Nesting level for indentation (0 = root, 1 = first level subtask, etc.)
 * @param {boolean} [props.showSubtasks=true] - Whether to recursively render subtasks
 * @returns {JSX.Element} Task item component with checkbox and metadata
 */

import { usePlanning } from '../../../features/planing/PlanningContext';
import { getImportanceLabel, getImportanceColor } from '../../../config/functions/importanceLevel';
import './TaskItem.scss';

/**
 * TaskItem Component
 * 
 * Renders a single task with checkbox, metadata, and optional nested subtasks.
 * Uses PlanningContext to toggle completion and retrieve subtasks.
 */
export default function TaskItem({ task, level = 0, showSubtasks = true }) {
  // Get PlanningContext functions and state
  const { toggleTaskCompletion, getSubtasks } = usePlanning();
  
  // Get subtasks for this task (if showSubtasks is enabled)
  const subtasks = showSubtasks ? getSubtasks(task.id) : [];

  /**
   * Handles checkbox click to toggle task completion
   * 
   * Prevents event propagation to avoid triggering parent click handlers.
   * Calls PlanningContext's toggleTaskCompletion function which handles:
   * - Toggling the task's completed status
   * - Automatically marking all subtasks as completed when parent is completed
   * - Setting completion timestamp
   * 
   * @param {Event} e - Click event from checkbox button
   */
  const handleCheckboxClick = (e) => {
    e.stopPropagation(); // Prevent parent click handlers
    toggleTaskCompletion(task.id);
  };

  /**
   * Formats date for display in task metadata
   * 
   * Converts Date object to a user-friendly format (e.g., "Jan 15").
   * Used to display the Ideal Deadline (IDL) in a compact format.
   * 
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted date string (e.g., "Jan 15")
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`task-item task-item--level-${level} ${task.completed ? 'task-item--completed' : ''}`}>
      <div className="task-item__content">
        {/* Checkbox - positioned absolutely like TickTick */}
        <button
          type="button"
          onClick={handleCheckboxClick}
          className={`task-item__checkbox ${task.completed ? 'task-item__checkbox--checked' : ''}`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <span className="task-item__checkbox-wrapper">
            {/* Default checkbox icon */}
            <svg className="task-item__checkbox-icon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            {/* Hover checkbox icon */}
            <svg className="task-item__checkbox-icon task-item__checkbox-icon--hover" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            {/* Checkmark icon (shown when checked) */}
            <svg className="task-item__checkbox-checkmark" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="15" height="15" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 8.5L7 11.5L13 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>

        {/* Task Info */}
        <div className="task-item__info">
          <div className="task-item__header">
            <h3 className={`task-item__title ${task.completed ? 'task-item__title--completed' : ''}`}>
              {task.title}
            </h3>
            <span className={getImportanceColor(task.il)}>
              {getImportanceLabel(task.il)}
            </span>
          </div>
          
          <div className="task-item__meta">
            <span className="task-item__meta-item">⏱️ {task.rt}h</span>
            <span className="task-item__meta-item">📅 {formatDate(task.idl)}</span>
            {subtasks.length > 0 && (
              <span className="task-item__meta-item">📋 {subtasks.length} subtask{subtasks.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      </div>

      {/* Subtasks (hierarchical) */}
      {subtasks.length > 0 && (
        <div className="task-item__subtasks">
          {subtasks.map((subtask) => (
            <TaskItem 
              key={subtask.id} 
              task={subtask} 
              level={level + 1}
              showSubtasks={showSubtasks}
            />
          ))}
        </div>
      )}
    </div>
  );
}

