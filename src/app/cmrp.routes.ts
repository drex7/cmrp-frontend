import {Routes} from '@angular/router';

const DashboardLayout = () => import("@/pages/dashboard-layout/dashboard-layout").then(m => m.DashboardLayout);

const DashboardPage = () => import("@/pages/dashboard-layout/dashboard/dashboard").then(m => m.Dashboard);
const IncidentsPage = () => import("@/pages/dashboard-layout/incidents/incidents").then(m => m.Incidents);
const UsersPage = () => import("@/pages/dashboard-layout/users/users").then(m => m.Users);
const MyIncidentsPage = () => import("@/pages/dashboard-layout/my-incidents/my-incidents").then(m => m.MyIncidents);
const AuthPage = () => import("@/pages/auth/auth").then(m => m.Auth);


export const routes: Routes = [
  {
    title: "CMRP - Dashboard",
    path: "dashboard",
    loadComponent: DashboardLayout,
    // canActivateChild: [authGuard],
    children: [
      {
        path: "",
        loadComponent: DashboardPage
      },
      {
        path: "incidents",
        loadComponent: IncidentsPage,
      },
      {
        path: "users",
        loadComponent: UsersPage
      },
      {
        path: "my-incidents",
        loadComponent: MyIncidentsPage
      }
    ]
  },
  // Auth routes includes: login, signup, otp, and reset_password
  {
    title: "CMRP - Login",
    path: "login",
    loadComponent: AuthPage,
  },
  {
    title: "CMRP - Sign Up",
    path: "signup",
    loadComponent: AuthPage,
  },
  {
    title: "CMRP - Verify OTP",
    path: "verify-otp",
    loadComponent: AuthPage,
  },
  {
    title: "CMRP - Reset Password",
    path: "reset-password",
    loadComponent: AuthPage,
  },


  {
    path: "**",
    redirectTo: "dashboard"
  }
];



