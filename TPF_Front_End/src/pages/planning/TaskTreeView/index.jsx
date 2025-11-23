/**
 * TaskTreeView - Visual tree diagram showing task relationships and dependencies
 * 
 * NOTE: This component is being rebuilt from scratch.
 * Content has been cleared for now.
 */

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import EmptyState from '../../../components/ui/EmptyState';
import './TaskTreeView.scss';

export default function TaskTreeView() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <PageHeader
        title="Task Tree View"
        subtitle="Visual tree diagram showing task relationships and dependencies"
      />

      <Card>
        <EmptyState
          title="Task Tree View Coming Soon"
          subtitle="This feature is being rebuilt from scratch. Check back soon!"
          action={
            <button
              onClick={() => navigate(ROUTES.PLANNING.ALL_TASKS)}
              className="btn btn--primary"
            >
              View All Tasks →
            </button>
          }
        />
      </Card>
    </div>
  );
}
