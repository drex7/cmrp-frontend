import {Routes} from '@angular/router';

const ReportsPage = () => import("@/pages/dashboard-layout/reports/reports").then(m => m.Reports);
const AuthPage = () => import("@/pages/auth/auth").then(m => m.Auth);
const DashboardLayout = () => import("@/pages/dashboard-layout/dashboard-layout").then(m => m.DashboardLayout);

export const routes: Routes = [
  {
    title: "CMRP - Dashboard",
    path: "dashboard",
    loadComponent: DashboardLayout,
    loadChildren: () => import("@/routes/admin.routes").then(m => m.ADMIN_ROUTES)
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



