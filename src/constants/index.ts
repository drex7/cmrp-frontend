import {PrimeIcons} from 'primeng/api';

export const dashboardData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: PrimeIcons.HOME
  },
  {
    title: "Users",
    link: "/dashboard/users",
    icons: PrimeIcons.USERS
  },
  {
    title: "Roles and Permissions",
    link: "/dashboard/roles",
    icon: PrimeIcons.SHIELD
  }
] as const
