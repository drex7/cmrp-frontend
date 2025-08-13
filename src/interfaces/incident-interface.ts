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
  title: string,
  number: number,
  description: string,
  icon: string
}
