import {PrimeIcons} from 'primeng/api';
import {IIncidentSummary} from '@/interfaces/incident-interface';
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

export const incidentSeverities = [
  {label: 'All Severities', value: 'all'},
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

export const incidentFilters = [
  {label: 'All Status', value: 'all'},
  {label: 'Pending', value: 'pending'},
  {label: 'In Progress', value: 'in_progress'},
  {label: 'Resolved', value: 'resolved'}
];


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

export const incidentsSummary: IIncidentSummary[] = [
  {
    title: "total incidents",
    icon: PrimeIcons.EXCLAMATION_CIRCLE,
    number: 0,
    description: "total",
  },
  {
    title: "pending incidents",
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    number: 0,
    description: "pending",
  },
  {
    title: "under investigation",
    icon: PrimeIcons.CLOCK,
    number: 0,
    description: "in-progress",
  },
  {
    title: "total resolved incidents",
    icon: PrimeIcons.CHECK_CIRCLE,
    number: 0,
    description: "resolved",
  },

]

export const incidentTableHeaders = [
  "incident id", "title", "location", "severity", "status", "assigned officer", "reporter", "actions"
]

export const userTableHeaders = [
  "User ID", "Name", "Email", "Phone", "Region", "City", "Role",
  "Action"
]

