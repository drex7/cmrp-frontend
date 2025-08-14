import {Routes} from '@angular/router';

const DashboardLayout = () => import("@/pages/dashboard-layout/dashboard-layout").then(m => m.DashboardLayout);

const DashboardPage = () => import("@/pages/dashboard-layout/dashboard/dashboard").then(m => m.Dashboard);
const IncidentsPage = () => import("@/pages/dashboard-layout/incidents/incidents").then(m => m.Incidents);
const UsersPage = () => import("@/pages/dashboard-layout/users/users").then(m => m.Users);
const MyIncidentsPage = () => import("@/pages/dashboard-layout/my-incidents/my-incidents").then(m => m.MyIncidents);

export const routes: Routes = [
  {
    title: "CMRP - Dashboard",
    path: "",
    loadComponent: DashboardLayout,
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
  }, {
    path: "**",
    redirectTo: ""
  }
];



