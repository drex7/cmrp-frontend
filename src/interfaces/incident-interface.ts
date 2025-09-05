import {IncidentType} from '@/types/index';

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
  status: IncidentType
  incidentId: string
  category: string
  description: string
  assignedOfficer: string
  severity: "low" | "critical"
  reporter: string
  title: string
  imageUrls?: string[]
  createdBy?: string
  createdAt?: Date
  updatedBy?: string
  updatedAt?: Date
}
