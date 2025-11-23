/**
 * Card - Reusable card component wrapper
 * 
 * A flexible container component that provides consistent card styling throughout
 * the application. Cards are used to group related content with a visual container.
 * 
 * Features:
 * - Optional header section for titles and actions
 * - Main body content area
 * - Optional footer section for additional actions or metadata
 * - Custom className support for additional styling
 * - Consistent spacing and styling via SCSS
 * 
 * Usage:
 * <Card header={<h2>Title</h2>} footer={<button>Action</button>}>
 *   <p>Card content goes here</p>
 * </Card>
 * 
 * This component is used extensively throughout the application for:
 * - Dashboard statistics
 * - Task lists
 * - Form containers
 * - Content sections
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Main content to display inside the card body
 * @param {string} [props.className=''] - Additional CSS classes to apply to the card
 * @param {ReactNode} [props.header] - Optional header content (title, actions, etc.)
 * @param {ReactNode} [props.footer] - Optional footer content (actions, metadata, etc.)
 * @returns {JSX.Element} Card component with optional header, body, and footer
 */

import './Card.scss';

/**
 * Card Component
 * 
 * Renders a card container with optional header and footer sections.
 * All sections are conditionally rendered based on prop presence.
 */
export default function Card({ children, className = '', header, footer }) {
  return (
    <div className={`card ${className}`}>
      {header && (
        <div className="card__header">
          {header}
        </div>
      )}
      <div className="card__body">
        {children}
      </div>
      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </div>
  );
}

