/**
 * Main Entry Point - Application Bootstrap and Provider Setup
 * 
 * This is the entry point of the React application. It performs the following:
 * 
 * 1. Initializes React application with StrictMode for development warnings
 * 2. Sets up global context providers in the correct nesting order
 * 3. Imports global styles
 * 4. Renders the App component into the DOM
 * 
 * Context Provider Hierarchy (outermost to innermost):
 * - ThemeProvider: Manages dark/light theme state (applies to entire app)
 * - AuthProvider: Manages user authentication state (needed by all protected routes)
 * - PlanningProvider: Manages tasks and planning data (needed by planning features)
 * - ObservationsProvider: Manages observations with 2-day buffer system
 * - DiamondProvider: Manages entity evaluation system (Diamond System)
 * - App: Main application component with routing
 * 
 * The provider nesting order is important because:
 * - ThemeProvider wraps everything to apply theme globally
 * - AuthProvider must wrap protected routes (which App contains)
 * - Feature providers can depend on Auth context but not vice versa
 * 
 * The application uses Vite as the build tool, which handles hot module
 * replacement (HMR) during development and optimized builds for production.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { PlanningProvider } from './features/planing/PlanningContext'
import { ObservationsProvider } from './features/observations/ObservationsContext'
import { DiamondProvider } from './features/diamond/DiamondContext'
import { ThemeProvider } from './contexts/ThemeContext'

/**
 * Renders the application root component with all context providers
 * 
 * Uses React 18's createRoot API for concurrent rendering features.
 * StrictMode enables additional development checks and warnings.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <PlanningProvider>
          <ObservationsProvider>
            <DiamondProvider>
              <App />
            </DiamondProvider>
          </ObservationsProvider>
        </PlanningProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
