/**
 * App - Main Application Component with Routing Configuration
 * 
 * This is the root component that sets up the application's routing structure
 * using React Router. It defines all routes, both public and protected.
 * 
 * Routing Structure:
 * - Public Routes: Login page (accessible without authentication)
 * - Protected Routes: All other pages (require authentication via ProtectedRoute)
 * 
 * Route Organization:
 * - Auth routes: Login
 * - Planning routes: Dashboard, All Tasks, Daily Tasks, Add Task, Task Tree, Task Configuration
 * - Observations routes: Current, Waiting for Analysis, All, Analysis
 * - Diamond System routes: Diagram, Add Entity, All Entities
 * - Settings routes: Color Settings, Emergency Settings
 * 
 * Route Protection:
 * - The Layout component is wrapped in ProtectedRoute, which redirects
 *   unauthenticated users to the login page
 * - All routes inside the Layout are automatically protected
 * - A catch-all route redirects unknown paths to login
 * 
 * All route paths are imported from the centralized ROUTES config (no hardcoded paths).
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';

// Planning pages
import AllTasks from './pages/planning/AllTasks';
import DailyTasks from './pages/planning/DailyTasks';
import AddTask from './pages/planning/AddTask';
import TaskTreeView from './pages/planning/TaskTreeView';
import TaskConfiguration from './pages/planning/TaskConfiguration';

// Observations pages
import CurrentObservations from './pages/observations/CurrentObservations';
import ObservationsWaiting from './pages/observations/ObservationsWaiting';
import AllObservations from './pages/observations/AllObservations';
import ObservationsAnalysis from './pages/observations/ObservationsAnalysis';

// Diamond System pages
import DiamondDiagram from './pages/diamond/DiamondDiagram';
import AddEntity from './pages/diamond/AddEntity';
import AllEntities from './pages/diamond/AllEntities';

// Settings pages
import ColorSettings from './pages/settings/ColorSettings';
import EmergencySettings from './pages/settings/EmergencySettings';

import { ROUTES } from './config/routes';

/**
 * App Component - Main application routing structure
 * 
 * Sets up React Router with all application routes. Routes are organized into:
 * - Public routes (Login)
 * - Protected routes (all other pages wrapped in ProtectedRoute)
 * 
 * @returns {JSX.Element} Application routing structure
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route - Login (accessible without authentication) */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        
        {/* Protected routes - require authentication via ProtectedRoute wrapper */}
        {/* All routes inside this Route are nested under Layout component */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard - Default route (index) */}
          <Route index element={<Dashboard />} />
          
          {/* Planning routes */}
          <Route path={ROUTES.PLANNING.ALL_TASKS} element={<AllTasks />} />
          <Route path={ROUTES.PLANNING.DAILY_TASKS} element={<DailyTasks />} />
          <Route path={ROUTES.PLANNING.ADD_TASK} element={<AddTask />} />
          <Route path={ROUTES.PLANNING.TASK_TREE} element={<TaskTreeView />} />
          <Route path={ROUTES.PLANNING.TASK_CONFIGURATION} element={<TaskConfiguration />} />
          
          {/* Observations routes */}
          <Route path={ROUTES.OBSERVATIONS.CURRENT} element={<CurrentObservations />} />
          <Route path={ROUTES.OBSERVATIONS.WAITING_FOR_ANALYSIS} element={<ObservationsWaiting />} />
          <Route path={ROUTES.OBSERVATIONS.ALL} element={<AllObservations />} />
          <Route path={ROUTES.OBSERVATIONS.ANALYSIS} element={<ObservationsAnalysis />} />
          
          {/* Diamond System routes */}
          <Route path={ROUTES.DIAMOND.DIAGRAM} element={<DiamondDiagram />} />
          <Route path={ROUTES.DIAMOND.ADD_ENTITY} element={<AddEntity />} />
          <Route path={ROUTES.DIAMOND.ALL_ENTITIES} element={<AllEntities />} />
          
          {/* Settings routes */}
          <Route path={ROUTES.SETTINGS.COLOR} element={<ColorSettings />} />
          <Route path={ROUTES.SETTINGS.EMERGENCY} element={<EmergencySettings />} />
        </Route>
        
        {/* Catch-all route - redirect unknown paths to login */}
        {/* This handles 404 cases and redirects unauthenticated users */}
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
