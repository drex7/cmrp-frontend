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

export interface IncidentI {
  location: string
  status: IncidentType
  incidentId: string
  category: string
  description: string
  assignedOfficer: string
  severity: "low" | "medium" | "high" | "critical"
  title: string
  imageUrls?: string[]
  createdBy?: string
  createdAt?: Date
  updatedBy?: string
  updatedAt?: Date
  region?: string
  city?: string
  reporter_region?: string
  report_city?: string
}

export interface ImageI {
  file: File;
  url: string;
}

export interface CreateIncidentI {
  title: string
  category: string
  severity: string
  location: string
  description: string
  images: ImageI[]
}
