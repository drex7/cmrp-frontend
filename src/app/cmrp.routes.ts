import {Routes} from '@angular/router';

const ReportsPage = () => import("@/pages/reports/reports").then(m => m.Reports);
const AuthPage = () => import("@/pages/auth/auth").then(m => m.Auth);
const DashboardPage = () => import("@/pages/dashboard/dashboard").then(m => m.Dashboard);

export const routes: Routes = [
  {
    title: "CMRP - Dashboard",
    path: "dashboard",
    loadComponent: DashboardPage,
  },
  {
    title: "CMRP - Reports",
    path: "reports",
    loadComponent: ReportsPage,
  },
  {
    path: "auth",
    loadComponent: AuthPage,
  },

];
