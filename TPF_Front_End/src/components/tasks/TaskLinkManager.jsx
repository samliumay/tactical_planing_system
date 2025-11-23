/**
 * TaskLinkManager - Component for managing task links
 * 
 * A comprehensive interface for creating and managing directional links between tasks.
 * Task links represent relationships and dependencies between tasks in the planning system.
 * 
 * Features:
 * - View all tasks that have links (either linking to or linked from other tasks)
 * - Create new directional links between tasks (Task A → Task B)
 * - Remove existing links
 * - Visual distinction between "links to" (outgoing) and "linked from" (incoming) relationships
 * 
 * Link Direction:
 * - Links are directional: Task A can link TO Task B
 * - When Task A links to Task B:
 *   - Task A's linksTo array contains Task B's ID
 *   - Task B's linkedFrom array contains Task A's ID
 * 
 * Use Cases:
 * - Managing task dependencies
 * - Creating task sequences
 * - Linking related tasks
 * - Building task relationship networks
 * 
 * The component uses PlanningContext to:
 * - Access all tasks
 * - Create links via linkTask()
 * - Remove links via unlinkTask()
 * - Retrieve task details via getTaskById()
 * 
 * @returns {JSX.Element} Task link management interface with link creation form and link list
 */

import { useState, useMemo } from 'react';
import { usePlanning } from '../../features/planing/PlanningContext';
import { getImportanceLabel } from '../../config/functions/importanceLevel';
import { filterTasksWithLinks } from '../../config/functions/taskFilters';

/**
 * TaskLinkManager Component
 * 
 * Provides UI for creating and managing task links. Displays a form for creating
 * new links and a list of all tasks with their link relationships.
 */
export default function TaskLinkManager() {
  // Get PlanningContext functions and state
  const { tasks, linkTask, unlinkTask, getTaskById } = usePlanning();
  
  // Form state for creating new links
  const [fromTaskId, setFromTaskId] = useState('');
  const [toTaskId, setToTaskId] = useState('');
  const [showLinkForm, setShowLinkForm] = useState(false);

  /**
   * Get all tasks that have links (either linking to or linked from other tasks)
   * Memoized to avoid recalculation on every render.
   */
  const tasksWithLinks = useMemo(() => {
    return filterTasksWithLinks(tasks);
  }, [tasks]);

  /**
   * Handles creation of a new task link
   * 
   * Validates that:
   * - Both source and target tasks are selected
   * - A task cannot link to itself
   * 
   * Creates the link via PlanningContext and resets the form.
   */
  const handleCreateLink = () => {
    if (!fromTaskId || !toTaskId) {
      alert('Please select both tasks');
      return;
    }
    if (fromTaskId === toTaskId) {
      alert('A task cannot link to itself');
      return;
    }
    // Create the directional link (fromTaskId → toTaskId)
    linkTask(parseFloat(fromTaskId), parseFloat(toTaskId));
    // Reset form
    setFromTaskId('');
    setToTaskId('');
    setShowLinkForm(false);
  };

  /**
   * Handles removal of an existing task link
   * 
   * Confirms with user before removing the link, as this is a destructive action.
   * 
   * @param {number} fromId - ID of the task that links (source)
   * @param {number} toId - ID of the task being linked to (target)
   */
  const handleRemoveLink = (fromId, toId) => {
    if (window.confirm('Are you sure you want to remove this link?')) {
      unlinkTask(fromId, toId);
    }
  };

  return (
    <div className="task-link-manager">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text--gray-900 mb-2">Task Links</h3>
          <p className="text-sm text--gray-600">
            Manage directional relationships between tasks
          </p>
        </div>
        <button
          onClick={() => setShowLinkForm(!showLinkForm)}
          className="btn btn--primary"
        >
          {showLinkForm ? 'Cancel' : '+ Create Link'}
        </button>
      </div>

      {/* Link Creation Form */}
      {showLinkForm && (
        <div className="card mb-6">
          <h4 className="font-semibold text--gray-900 mb-4">Create New Link</h4>
          <div className="grid grid--cols-1 grid--md-cols-2 grid--gap-4 mb-4">
            <div className="form__group">
              <label className="form__label">From Task</label>
              <select
                value={fromTaskId}
                onChange={(e) => setFromTaskId(e.target.value)}
                className="form__select"
              >
                <option value="">Select a task...</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title} ({getImportanceLabel(task.il)})
                  </option>
                ))}
              </select>
            </div>
            <div className="form__group">
              <label className="form__label">To Task</label>
              <select
                value={toTaskId}
                onChange={(e) => setToTaskId(e.target.value)}
                className="form__select"
              >
                <option value="">Select a task...</option>
                {tasks
                  .filter((task) => task.id.toString() !== fromTaskId)
                  .map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.title} ({getImportanceLabel(task.il)})
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button onClick={handleCreateLink} className="btn btn--primary">
            Create Link
          </button>
        </div>
      )}

      {/* Links List */}
      {tasksWithLinks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__title">No task links yet</p>
          <p className="empty-state__subtitle">
            Create links to show relationships between tasks
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasksWithLinks.map((task) => (
            <div key={task.id} className="card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text--gray-900">{task.title}</h4>
                  <p className="text-sm text--gray-600">
                    ⏱️ {task.rt}h | 📅 {new Date(task.idl).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Links To */}
              {task.linksTo && task.linksTo.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text--gray-700 mb-2">
                    Links to:
                  </p>
                  <div className="space-y-2">
                    {task.linksTo.map((linkedTaskId) => {
                      const linkedTask = getTaskById(linkedTaskId);
                      if (!linkedTask) return null;
                      return (
                        <div
                          key={linkedTaskId}
                          className="flex justify-between items-center p-2 bg--gray-50 rounded"
                        >
                          <span className="text-sm">
                            → {linkedTask.title} ({getImportanceLabel(linkedTask.il)})
                          </span>
                          <button
                            onClick={() => handleRemoveLink(task.id, linkedTaskId)}
                            className="text-xs text--red-600 hover--text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Linked From */}
              {task.linkedFrom && task.linkedFrom.length > 0 && (
                <div>
                  <p className="text-sm font-medium text--gray-700 mb-2">
                    Linked from:
                  </p>
                  <div className="space-y-2">
                    {task.linkedFrom.map((linkedTaskId) => {
                      const linkedTask = getTaskById(linkedTaskId);
                      if (!linkedTask) return null;
                      return (
                        <div
                          key={linkedTaskId}
                          className="flex justify-between items-center p-2 bg--gray-50 rounded"
                        >
                          <span className="text-sm">
                            ← {linkedTask.title} ({getImportanceLabel(linkedTask.il)})
                          </span>
                          <button
                            onClick={() => handleRemoveLink(linkedTaskId, task.id)}
                            className="text-xs text--red-600 hover--text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

