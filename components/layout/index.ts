/**
 * Layout Components Exports
 */

export { Sidebar } from './sidebar';
export { Header } from './header';
export { AppShell, AppShellWithPatient, usePatient, PatientContext } from './app-shell';

// Shared Layout Components (Apple HIG 2025)
export {
  SharedLayoutGrid,
  SharedLayoutBackground,
  SharedSidebarColumn,
  SharedMainContent,
  SharedLayout,
  // Page Transition Components
  PageTransitionWrapper,
  StaggerContainer,
  StaggerItem,
  FastStaggerContainer,
} from './shared-layout';
