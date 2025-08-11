import {Routes} from '@angular/router';

const DashboardPage = () => import("@/pages/dashboard-layout/dashboard/dashboard").then(m => m.Dashboard);
const IncidentsPage = () => import("@/pages/dashboard-layout/incidents/incidents").then(m => m.Incidents);
const UsersPage = () => import("@/pages/dashboard-layout/users/users").then(m => m.Users);
const RolesAndPermissionsPage = () => import("@/pages/dashboard-layout/roles-and-permissions/roles-and-permissions").then(m => m.RolesAndPermissions);


export const ADMIN_ROUTES: Routes = [
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
    path: "roles",
    loadComponent: RolesAndPermissionsPage
  }
]
