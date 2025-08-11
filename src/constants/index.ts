import {PrimeIcons} from 'primeng/api';

export const dashboardData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: PrimeIcons.HOME
  }, {
    title: "Incidents",
    link: "/dashboard/incidents",
    icon: PrimeIcons.FLAG
  },
  {
    title: "Users",
    link: "/dashboard/users",
    icon: PrimeIcons.USERS
  },
  {
    title: "Roles and Permissions",
    link: "/dashboard/roles",
    icon: PrimeIcons.SHIELD
  }
] as const
