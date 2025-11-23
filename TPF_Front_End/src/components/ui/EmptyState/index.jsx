/**
 * EmptyState - Reusable empty state component
 * 
 * Displays a user-friendly message when there's no content to show. This component
 * helps guide users by explaining why a section is empty and what they can do next.
 * 
 * Use Cases:
 * - Empty task lists (prompts user to create first task)
 * - No observations found
 * - No entities in Diamond System
 * - Empty search results
 * 
 * Features:
 * - Title: Main message explaining the empty state
 * - Subtitle: Optional secondary message with more details
 * - Action: Optional call-to-action button or link
 * 
 * Usage:
 * <EmptyState
 *   title="No tasks yet"
 *   subtitle="Create your first task to get started"
 *   action={<button>Add Task</button>}
 * />
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Main empty state message (required)
 * @param {string} [props.subtitle] - Optional secondary message
 * @param {ReactNode} [props.action] - Optional action element (button, link, etc.)
 * @returns {JSX.Element} Empty state component with message and optional action
 */

import './EmptyState.scss';

/**
 * EmptyState Component
 * 
 * Renders an empty state message with optional subtitle and action button.
 * Provides a consistent empty state UI across the application.
 */
export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      {subtitle && <p className="empty-state__subtitle">{subtitle}</p>}
      {action && (
        <div className="empty-state__action">
          {action}
        </div>
      )}
    </div>
  );
}

