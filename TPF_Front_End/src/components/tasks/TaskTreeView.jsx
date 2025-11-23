/**
 * TaskTreeView - Visual tree diagram showing task relationships
 * 
 * A hierarchical tree visualization component that displays tasks in their
 * parent-child structure, showing both subtask relationships and task links.
 * 
 * Features:
 * - Hierarchical tree structure: Shows parent tasks and nested subtasks
 * - Expandable/collapsible nodes: Click to expand/collapse branches
 * - Task links visualization: Displays directional links between tasks
 * - Visual indicators: Shows which tasks have links (🔗 icon)
 * - Task selection: Click on tasks to select them (calls onTaskSelect callback)
 * - Importance level badges: Color-coded importance indicators
 * 
 * Tree Structure:
 * ┌─ Task 1 [High] 🔗
 * │  ├─ Subtask 1.1
 * │  └─ Subtask 1.2
 * │  → Linked Task A
 * └─ Task 2 [Must]
 * 
 * The component uses PlanningContext to:
 * - Get task tree structure via getTaskTree()
 * - Retrieve task details via getTaskById()
 * 
 * Use Cases:
 * - Visualizing task hierarchies
 * - Understanding task relationships
 * - Navigating complex task structures
 * - Task relationship analysis
 * 
 * @param {Object} props - Component props
 * @param {Function} [props.onTaskSelect] - Optional callback when a task is clicked
 *   Receives the selected task object as parameter
 * @returns {JSX.Element} Interactive task tree visualization component
 */

import { useState, useMemo } from 'react';
import { usePlanning } from '../../features/planing/PlanningContext';
import { getImportanceLabel, getImportanceColor } from '../../config/functions/importanceLevel';

/**
 * TaskTreeView Component
 * 
 * Renders an interactive tree view of tasks showing hierarchical relationships
 * and links. Supports expand/collapse functionality and task selection.
 */
export default function TaskTreeView({ onTaskSelect }) {
  // Get PlanningContext functions and state
  const { tasks, getTaskTree, getTaskById } = usePlanning();
  
  // State for managing expanded/collapsed nodes in the tree
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  
  // State for tracking which task is currently selected
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  /**
   * Get the task tree structure (hierarchical tree of tasks with subtasks)
   * Memoized to avoid recalculation on every render.
   */
  const taskTree = useMemo(() => getTaskTree(), [getTaskTree]);

  /**
   * Toggle the expanded/collapsed state of a tree node
   * 
   * Adds or removes the task ID from the expandedNodes Set.
   * 
   * @param {number} taskId - ID of the task node to toggle
   */
  const toggleNode = (taskId) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId); // Collapse if expanded
      } else {
        next.add(taskId); // Expand if collapsed
      }
      return next;
    });
  };

  /**
   * Handles task click event
   * 
   * Sets the selected task and calls the onTaskSelect callback if provided.
   * 
   * @param {number} taskId - ID of the clicked task
   */
  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
    if (onTaskSelect) {
      onTaskSelect(getTaskById(taskId));
    }
  };


  const TreeNode = ({ task, level = 0 }) => {
    const hasChildren = task.children && task.children.length > 0;
    const isExpanded = expandedNodes.has(task.id);
    const isSelected = selectedTaskId === task.id;
    const hasLinks = (task.linksTo && task.linksTo.length > 0) || 
                     (task.linkedFrom && task.linkedFrom.length > 0);

    return (
      <div className="task-tree-node" style={{ marginLeft: `${level * 24}px` }}>
        <div
          className={`task-tree-node__content ${isSelected ? 'task-tree-node__content--selected' : ''}`}
          onClick={() => handleTaskClick(task.id)}
        >
          <div className="flex items-center gap-2">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(task.id);
                }}
                className="task-tree-node__toggle"
              >
                {isExpanded ? '▼' : '▶'}
              </button>
            )}
            {!hasChildren && <span className="task-tree-node__spacer" />}
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text--gray-900">{task.title}</span>
                <span className={getImportanceColor(task.il)}>
                  {getImportanceLabel(task.il)}
                </span>
                {hasLinks && (
                  <span className="text-xs text--primary-600" title="Has links">
                    🔗
                  </span>
                )}
              </div>
              <div className="text-xs text--gray-600 mt-1">
                ⏱️ {task.rt}h | 📅 {new Date(task.idl).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Render links */}
        {task.linksTo && task.linksTo.length > 0 && (
          <div className="task-tree-node__links" style={{ marginLeft: `${(level + 1) * 24}px` }}>
            {task.linksTo.map((linkedTaskId) => {
              const linkedTask = getTaskById(linkedTaskId);
              if (!linkedTask) return null;
              return (
                <div
                  key={linkedTaskId}
                  className="task-tree-node__link"
                  onClick={() => handleTaskClick(linkedTaskId)}
                >
                  → {linkedTask.title}
                </div>
              );
            })}
          </div>
        )}

        {/* Render children */}
        {hasChildren && isExpanded && (
          <div className="task-tree-node__children">
            {task.children.map((child) => (
              <TreeNode key={child.id} task={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (taskTree.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">No tasks yet</p>
        <p className="empty-state__subtitle">Create your first task to see the tree structure</p>
      </div>
    );
  }

  return (
    <div className="task-tree-view">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text--gray-900 mb-2">Task Tree View</h3>
        <p className="text-sm text--gray-600">
          Click on tasks to select them. Expand/collapse nodes to view subtasks.
        </p>
      </div>
      <div className="task-tree-view__container">
        {taskTree.map((rootTask) => (
          <TreeNode key={rootTask.id} task={rootTask} level={0} />
        ))}
      </div>
    </div>
  );
}

