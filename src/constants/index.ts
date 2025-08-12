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
  // {
  //   title: "Roles and Permissions",
  //   link: "/dashboard/roles",
  //   icon: PrimeIcons.SHIELD
  // }
] as const

export const incidentsData = [
  {
    title: "Total incidents",
    description: "All reported incidents",
    increment: true,
    incOrDecValue: 12,
    total: 156,
    icon: PrimeIcons.EXCLAMATION_TRIANGLE
  }, {
    title: "pending review",
    description: "awaiting assignment",
    increment: false,
    incOrDecValue: 8,
    total: 24,
    icon: PrimeIcons.CLOCK
  }, {
    title: "in progress",
    description: "currently being resolved",
    increment: true,
    incOrDecValue: 15,
    total: 18,
    icon: PrimeIcons.CHART_LINE
  }, {
    title: "resolved",
    description: "successfully completed",
    increment: true,
    incOrDecValue: 25,
    total: 144,
    icon: PrimeIcons.CHECK_CIRCLE
  },
] as const
