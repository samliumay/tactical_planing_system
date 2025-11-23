/**
 * PageHeader - Reusable page header component
 * 
 * Provides consistent page header styling across all pages. Displays the page title,
 * optional subtitle, and an optional action button on the right side.
 * 
 * Features:
 * - Large, prominent page title
 * - Optional descriptive subtitle
 * - Optional action button/link on the right side (e.g., "Add New", "Settings")
 * - Responsive layout that stacks on mobile
 * 
 * Layout:
 * ┌─────────────────────────────────────┐
 * │ Title                    [Action]   │
 * │ Subtitle                            │
 * └─────────────────────────────────────┘
 * 
 * Usage:
 * <PageHeader
 *   title="All Tasks"
 *   subtitle="View and manage all your tasks"
 *   action={<button>Add Task</button>}
 * />
 * 
 * This component is used at the top of every page to provide consistent
 * page identification and quick actions.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Main page title (required)
 * @param {string} [props.subtitle] - Optional page subtitle/description
 * @param {ReactNode} [props.action] - Optional action element (button, link, etc.) displayed on the right
 * @returns {JSX.Element} Page header with title, subtitle, and optional action
 */

import './PageHeader.scss';

/**
 * PageHeader Component
 * 
 * Renders a consistent page header with title, optional subtitle, and optional action button.
 * The action is positioned on the right side using flexbox.
 */
export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="page-header">
      <div className="page-header__content">
        <div>
          <h1 className="page-header__title">{title}</h1>
          {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        </div>
        {action && (
          <div className="page-header__action">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

