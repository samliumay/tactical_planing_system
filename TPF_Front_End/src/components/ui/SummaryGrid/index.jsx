/**
 * SummaryGrid - Grid layout for displaying statistics
 * 
 * A responsive grid container that displays multiple StatCard components in a
 * consistent layout. Used to showcase key metrics and statistics across the application.
 * 
 * Features:
 * - Responsive grid layout (adapts to screen size)
 * - Configurable column count (default: 3 columns)
 * - Consistent spacing between stat cards
 * - Automatically maps stat objects to StatCard components
 * 
 * Grid Layout:
 * ┌─────────┬─────────┬─────────┐
 * │ Stat 1  │ Stat 2  │ Stat 3  │
 * └─────────┴─────────┴─────────┘
 * 
 * Usage:
 * <SummaryGrid
 *   stats={[
 *     { label: 'Total Tasks', value: 42 },
 *     { label: 'Completed', value: 30 },
 *     { label: 'Remaining', value: 12 }
 *   ]}
 *   columns={3}
 * />
 * 
 * This component is used in:
 * - Dashboard (Realism Point statistics)
 * - All Tasks page (task statistics)
 * - Other pages requiring summary statistics
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} props.stats - Array of stat objects, each with:
 *   - label: Statistic label text
 *   - value: Statistic value (string, number, or ReactNode)
 *   - className: Optional CSS class for the stat card
 * @param {number} [props.columns=3] - Number of columns in the grid (default: 3)
 * @returns {JSX.Element} Responsive grid of StatCard components
 */

import StatCard from '../StatCard';
import './SummaryGrid.scss';

/**
 * SummaryGrid Component
 * 
 * Renders a responsive grid of StatCard components. Maps each stat object
 * in the stats array to a StatCard component.
 */
export default function SummaryGrid({ stats, columns = 3 }) {
  return (
    <div className={`summary-grid summary-grid--cols-${columns}`}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          className={stat.className}
        />
      ))}
    </div>
  );
}

