export interface IIncident {
  title: string
  status: string
  severity: string
  details: string
  region: string
  city: string
  location: string
  date: string
  reporter: string
  assignedTo: string
}

export interface IIncidentSummary {
  title: string
  number: number
  description: string
  icon: string
}

export interface IIncidentDetails extends Pick<IIncident, "title" | "location" | "status"> {
  assignedOfficer: string
  reported: string
  severity: string
  incidentId: string
  description?: string
}

export interface IncidentsI {
  location: string
  status: "pending" | "investigating" | "resolved"
  incidentId: string
  category: string
  createdAt: string
  imageUrls: string[]
  description: string
  assignedOfficer: string
  reporter: string
}
