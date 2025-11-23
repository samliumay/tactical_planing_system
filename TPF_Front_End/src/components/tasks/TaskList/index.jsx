/**
 * TaskList - Reusable task list component with actions
 * 
 * A container component that displays a list of TaskItem components with optional
 * action buttons for each task. Handles empty states gracefully.
 * 
 * Features:
 * - Displays multiple tasks using TaskItem components
 * - Optional action buttons per task (edit, delete, etc.)
 * - Empty state handling with custom message and action
 * - Flexible action rendering (supports function or ReactNode)
 * 
 * Use Cases:
 * - All Tasks page (with edit/delete actions)
 * - Daily Tasks page (with view/delete actions)
 * - Dashboard (simple task list without actions)
 * - Any page requiring a task list display
 * 
 * Usage:
 * <TaskList
 *   tasks={tasks}
 *   actions={(task) => (
 *     <>
 *       <button onClick={() => editTask(task.id)}>Edit</button>
 *       <button onClick={() => deleteTask(task.id)}>Delete</button>
 *     </>
 *   )}
 *   emptyMessage="No tasks found"
 *   emptyAction={<button>Create Task</button>}
 * />
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} props.tasks - Array of task objects to display
 * @param {Function|ReactNode} [props.actions] - Action buttons for each task:
 *   - Function: Receives task object, returns ReactNode with action buttons
 *   - ReactNode: Same actions applied to all tasks
 * @param {string} [props.emptyMessage='No tasks found'] - Message to display when tasks array is empty
 * @param {ReactNode} [props.emptyAction] - Optional action button/link to show in empty state
 * @returns {JSX.Element} Task list component with optional actions and empty state handling
 */

import TaskItem from '../TaskItem';
import './TaskList.scss';

/**
 * TaskList Component
 * 
 * Renders a list of tasks with optional action buttons. Shows empty state
 * when no tasks are provided.
 */
export default function TaskList({ tasks, actions, emptyMessage, emptyAction }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p className="task-list-empty__message">{emptyMessage || 'No tasks found'}</p>
        {emptyAction && (
          <div className="task-list-empty__action">
            {emptyAction}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-list__item">
          <TaskItem task={task} level={0} />
          {actions && (
            <div className="task-list__actions">
              {typeof actions === 'function' ? actions(task) : actions}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

