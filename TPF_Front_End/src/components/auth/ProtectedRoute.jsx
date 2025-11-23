/**
 * ProtectedRoute - Route guard component for authentication
 * 
 * A higher-order route component that protects routes requiring authentication.
 * This component acts as a guard, ensuring only authenticated users can access
 * protected routes. Unauthenticated users are redirected to the login page.
 * 
 * Features:
 * - Authentication check: Verifies user is authenticated before rendering children
 * - Loading state: Shows loading indicator while authentication state is being determined
 * - Redirect with return URL: Preserves the intended destination so user can be
 *   redirected back after successful login
 * - Uses React Router's Navigate component for declarative redirects
 * 
 * Workflow:
 * 1. Check if authentication state is loading → Show loading indicator
 * 2. Check if user is authenticated → Allow access or redirect to login
 * 3. If redirecting, save current location in state for post-login redirect
 * 
 * Usage:
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 * 
 * This component is used to wrap all protected routes in App.jsx, ensuring
 * that unauthenticated users cannot access any page except the login page.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components/routes to protect
 * @returns {ReactNode|JSX.Element} Either the protected children or a redirect to login
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../config/routes';

/**
 * ProtectedRoute Component
 * 
 * Route guard that checks authentication status before rendering protected content.
 * Redirects to login if user is not authenticated, preserving the intended destination.
 */
export default function ProtectedRoute({ children }) {
  // Get authentication state from AuthContext
  const { isAuthenticated, loading } = useAuth();
  
  // Get current location to preserve return URL after login
  const location = useLocation();

  /**
   * Show loading state while authentication is being checked
   * 
   * Prevents flash of content during authentication check.
   */
  if (loading) {
    return (
      <div className="page" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Loading...</div>
        </div>
      </div>
    );
  }

  /**
   * Redirect to login if user is not authenticated
   * 
   * Preserves the current location in state so user can be redirected back
   * after successful login (handled by Login component).
   */
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  /**
   * Render protected children if user is authenticated
   */
  return children;
}

