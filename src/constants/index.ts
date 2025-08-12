import {PrimeIcons} from 'primeng/api';

export const dashboardData = [
  {
    title: "Dashboard",
    link: "",
    icon: PrimeIcons.HOME
  }, {
    title: "Incidents",
    link: "/incidents",
    icon: PrimeIcons.FLAG
  },
  {
    title: "Users",
    link: "/users",
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


export const recentIncidentsData = [
  {
    title: "pothole on main street",
    status: "in progress",
    severity: "high",
    details: "Large pothole causing traffic disruption near the intersection of Main Street and Oak Avenue.",
    region: "Greater Accra",
    city: "Accra",
    location: "main street & Oak Avenue",
    date: "07/05/2025",
    reporter: "Sarah Doe",
    assignedTo: "Road minister"
  },
  {
    title: "Broken Street Light",
    status: "pending",
    severity: "medium",
    details: "Street light has been non-functional for three days, creating safety concerns for pedestrians.",
    region: "Western",
    city: "Takoradi",
    location: "Park Avenue, Block 200",
    date: "07/01/2025",
    reporter: "John Doe",
    assignedTo: ""
  },
  {
    title: "Water Main Break",
    status: "resolved",
    severity: "critical",
    details: "Water flooding the street and affecting multiple households in the area.",
    region: "Greater accra",
    city: "tema c10",
    location: "Elm Street, Block 100",
    date: "28/07/2025",
    reporter: "Mike Johnson",
    assignedTo: "Water Department"
  },
]
