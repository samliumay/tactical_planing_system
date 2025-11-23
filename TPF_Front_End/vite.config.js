/**
 * Vite Configuration - Build Tool Configuration
 * 
 * This file configures Vite, the modern build tool and development server
 * for the React application.
 * 
 * Vite provides:
 * - Lightning-fast HMR (Hot Module Replacement) during development
 * - Optimized production builds with code splitting
 * - Native ES modules support for faster dev server startup
 * - Built-in support for CSS preprocessors (SCSS in this project)
 * 
 * Configuration:
 * - plugins: Array of Vite plugins
 *   - @vitejs/plugin-react: Enables React Fast Refresh and JSX transformation
 * 
 * Additional configuration options (commented out but available):
 * - server: Development server options (port, proxy, etc.)
 * - build: Production build options (output directory, minification, etc.)
 * - resolve: Module resolution options (aliases, extensions, etc.)
 * 
 * For more configuration options, see: https://vite.dev/config/
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration export
 * 
 * Defines the build tool configuration for the application.
 * The react plugin is required for transforming JSX and enabling Fast Refresh.
 */
export default defineConfig({
  plugins: [react()],
})
