import {PrimeIcons} from 'primeng/api';
import {IIncidentDetails, IIncidentSummary} from '@/interfaces/incident-interface';
import {RegionI} from "@/interfaces/user-interface";

export const sidebarData = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: PrimeIcons.HOME,
    isAccessible: true,
  }, {
    title: "Incidents",
    route: "incidents",
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    isAccessible: false,
  },
  {
    title: "Users",
    route: "users",
    icon: PrimeIcons.USERS,
    isAccessible: false
  },
  {
    title: "My Incidents",
    route: "my-incidents",
    icon: PrimeIcons.EXCLAMATION_CIRCLE,
    isAccessible: false
  },
]

export const incidentFilters = [
  {name: 'All Status', code: 'all'},
  {name: 'Pending', code: 'pending'},
  {name: 'Investigating', code: 'investigating'},
  {name: 'Resolved', code: 'resolved'}
];

export const incidentSeverities = [
  {
    label: "Low",
    value: "low"
  },
  {
    label: "Medium",
    value: "medium"
  },
  {
    label: "High",
    value: "high"
  },
  {
    label: "Critical",
    value: "critical"
  }
]
export const incidentCategories = [
  {
    label: "Public Safety",
    value: "public-safety"
  },
  {
    label: "Traffic & Transportation",
    value: "traffic-transportation"
  },
  {
    label: "Infrastructure & Utilities",
    value: "infrastructure-utilities"
  },
  {
    label: "Natural Disasters & Weather",
    value: "natural-disasters"
  }, {
    label: "Health & Public Services",
    value: "health"
  },
]

export const userFilters = [
  {label: 'All Users', value: 'all'},
  {label: 'Administrators', value: 'Admin'},
  {label: 'City Officials', value: 'City Official'},
  {label: 'Citizens', value: "Citizen"},
];

export const userRoles = [
  {label: 'Administrator', value: 'Admin'},
  {label: 'City Official', value: 'CityOfficial'},
];


export const ghanaRegions: RegionI[] = [
  {
    label: "Greater Accra",
    value: "greater-accra",
    cities: [
      {label: "Accra", value: "accra"},
      {label: "Tema", value: "tema"},
      {label: "Madina", value: "madina"},
      {label: "Ashaiman", value: "ashaiman"},
      {label: "Dansoman", value: "dansoman"},
    ],
  },
  {
    label: "Ashanti",
    value: "ashanti",
    cities: [
      {label: "Kumasi", value: "kumasi"},
      {label: "Obuasi", value: "obuasi"},
      {label: "Ejisu", value: "ejisu"},
      {label: "Bekwai", value: "bekwai"},
      {label: "Mampong", value: "mampong"},
    ],
  },
  {
    label: "Western",
    value: "western",
    cities: [
      {label: "Sekondi-Takoradi", value: "sekondi-takoradi"},
      {label: "Tarkwa", value: "tarkwa"},
      {label: "Axim", value: "axim"},
      {label: "Prestea", value: "prestea"},
      {label: "Shama", value: "shama"},
    ],
  },
  {
    label: "Northern",
    value: "northern",
    cities: [
      {label: "Tamale", value: "tamale"},
      {label: "Yendi", value: "yendi"},
      {label: "Savelugu", value: "savelugu"},
      {label: "Bimbilla", value: "bimbilla"},
      {label: "Walewale", value: "walewale"},
    ],
  },
  {
    label: "Volta",
    value: "volta",
    cities: [
      {label: "Ho", value: "ho"},
      {label: "Keta", value: "keta"},
      {label: "Hohoe", value: "hohoe"},
      {label: "Sogakope", value: "sogakope"},
      {label: "Anloga", value: "anloga"},
    ],
  },
];

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

export const incidentsSummary: IIncidentSummary[] = [
  {
    title: "active incidents",
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    number: 23,
    description: "3+ since yesterday",
  },
  {
    title: "under investigation",
    icon: PrimeIcons.CLOCK,
    number: 15,
    description: "Average resolution: 4.2h",
  },
  {
    title: "resolved today",
    icon: PrimeIcons.CHECK_CIRCLE,
    number: 41,
    description: "+18% fro yesterday",
  },
  {
    title: "response time",
    icon: PrimeIcons.CLOCK,
    number: 2.1,
    description: "average response time",
  },
]

export const incidentTableHeaders = [
  "incident id", "title", "location", "severity", "status", "assigned officer", "reporter", "actions"
]

export const incidentTable: IIncidentDetails[] = [
  {
    incidentId: "INC-001",
    title: "Water on road",
    location: "Town",
    severity: "urgent",
    status: "pending",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    incidentId: "INC-002",
    title: "Water on road",
    location: "Town",
    severity: "low",
    status: "resolved",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    incidentId: "INC-003",
    title: "Water on road",
    location: "Town",
    severity: "urgent",
    status: "pending",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    incidentId: "INC-004",
    title: "Water on road",
    location: "Town",
    severity: "urgent",
    status: "pending",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    incidentId: "INC-005",
    title: "Water on road",
    location: "Town",
    severity: "medium",
    status: "investigating",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    incidentId: "INC-006",
    title: "Water on road",
    location: "Town",
    severity: "high",
    status: "pending",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  }, {
    incidentId: "INC-007",
    title: "Water on road",
    location: "Town",
    severity: "urgent",
    status: "resolved",
    assignedOfficer: "John doe",
    reported: "2024-01-15 08:30 AM"
  },
]

export const userTableHeaders = [
  "User ID", "Name", "Email", "Phone", "Region", "City", "Role",
  "Action"
]

