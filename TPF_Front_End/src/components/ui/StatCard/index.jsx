/**
 * StatCard - Individual statistic card component
 * 
 * Displays a single statistic with a label and value. Used to show key metrics
 * and statistics throughout the application in a consistent format.
 * 
 * Features:
 * - Label: Descriptive text explaining what the statistic represents
 * - Value: The statistic value (supports strings, numbers, or React nodes)
 * - Flexible value rendering: Can display formatted numbers, percentages, or custom React components
 * - Custom className support for additional styling or variants
 * 
 * Usage:
 * <StatCard label="Total Tasks" value={42} />
 * <StatCard label="Completion Rate" value="85%" />
 * <StatCard
 *   label="Realism Point"
 *   value={<span className="text-green">0.75</span>}
 * />
 * 
 * This component is typically used within SummaryGrid to display multiple
 * statistics in a grid layout (e.g., Dashboard statistics).
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Label text describing the statistic
 * @param {string|number|ReactNode} props.value - The statistic value to display
 * @param {string} [props.className=''] - Additional CSS classes for styling or variants
 * @returns {JSX.Element} Statistic card displaying label and value
 */

import './StatCard.scss';

/**
 * StatCard Component
 * 
 * Renders a single statistic card with label and value.
 * The value can be any React node, allowing for custom formatting and styling.
 */
export default function StatCard({ label, value, className = '' }) {
  return (
    <div className={`stat-card ${className}`}>
      <p className="stat-card__label">{label}</p>
      <div className="stat-card__value">{value}</div>
    </div>
  );
}

