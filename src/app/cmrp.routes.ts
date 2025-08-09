import {Routes} from '@angular/router';

const ReportsPage = () => import("@/pages/reports/reports").then(m => m.Reports);
const AuthPage = () => import("@/pages/auth/auth").then(m => m.Auth);
export const routes: Routes = [
  {
    title: "CMRP - Reports",
    path: "reports",
    loadComponent: ReportsPage,
  },
  {
    path: "auth",
    loadComponent: AuthPage,
  }
];
