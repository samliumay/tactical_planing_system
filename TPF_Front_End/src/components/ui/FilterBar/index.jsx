/**
 * FilterBar - Reusable filter bar component
 * 
 * A container component that provides consistent styling and layout for filter controls.
 * Used to group filter inputs (dropdowns, checkboxes, date pickers, etc.) in a
 * horizontal layout.
 * 
 * Features:
 * - Consistent spacing and alignment for filter controls
 * - Responsive layout that works on mobile and desktop
 * - Flexible content area accepts any filter controls as children
 * - Custom className support for additional styling
 * 
 * Usage:
 * <FilterBar>
 *   <label>Filter by:</label>
 *   <select>...</select>
 *   <input type="checkbox" />
 * </FilterBar>
 * 
 * This component is used in:
 * - All Tasks page (filter by importance level)
 * - Daily Tasks page (date selector)
 * - Other pages requiring filter controls
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Filter control elements (selects, inputs, labels, etc.)
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @returns {JSX.Element} Filter bar container with filter controls
 */

import './FilterBar.scss';

/**
 * FilterBar Component
 * 
 * Renders a horizontal container for filter controls with consistent styling.
 */
export default function FilterBar({ children, className = '' }) {
  return (
    <div className={`filter-bar ${className}`}>
      {children}
    </div>
  );
}

