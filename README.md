# City Monitoring and Reporting Platform (cmrp-frontend)

A modern Angular 20 web application that enables city stakeholders to report, monitor, and manage incidents across the city. It features incident dashboards, filtering, and detail views, along with user management.

## Key Features

- Incident Management
  - Highlights with totals (active, in-progress, resolved)
  - Search, severity, and status filters
  - Paginated table with inline status/severity tags
  - Incident detail dialog with update actions
- My Incidents: view and manage incidents related to the signed-in user
- Users: list and filter city users by role/region
- Responsive UI using Tailwind CSS and PrimeNG components

## Tech Stack

- Angular 20
- PrimeNG 20 + PrimeIcons
- Tailwind CSS v4 + tailwindcss-primeui
- NgRx Signals
- AWS Amplify/CDK

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- Package manager eg:Y arn 1.x

### Install

```
yarn install
```

### Development server

```
yarn start
```

This runs `ng serve` (Angular dev server). By default it serves in development configuration. Open http://localhost:4200 in your browser.

### Build

```
yarn build
```

- Production build is the default configuration (`angular.json`), with output hashing and disabled source maps.
- Development build:

```
yarn run watch
```

### Unit tests

```
yarn test
```

Runs Karma + Jasmine test runner configured by Angular.

## Project Structure

```
cmrp-frontend/
├─ src/
│  ├─ app/
│  │  └─ pages/
│  │     └─ dashboard-layout/
│  │        ├─ incidents/
│  │        │  ├─ incidents.html
│  │        │  ├─ incidents.ts
│  │        │  ├─ incident-details/
│  │        │  │  ├─ incident-details.html
│  │        │  │  └─ incident-details.ts
│  │        │  └─ incident-highlight/
│  │        │     ├─ incident-highlight.html
│  │        │     └─ incident-highlight.ts
│  │        ├─ my-incidents/
│  │        │  ├─ my-incidents.html
│  │        │  └─ my-incidents.ts
│  │        └─ users/
│  │           └─ users.ts
│  ├─ assets/
│  ├─ constants/
│  │  └─ index.ts        
│  ├─ environments/
│  └─ styles.css 
├─ public/               
├─ angular.json         
├─ package.json        
├─ yarn.lock
└─ tsconfig*.json
```

## UI/UX and Styling

- Tailwind CSS v4
- PrimeNG components component library
- PrimeIcons

## Configuration and Constants

Key UI constants (filters, categories, regions, table headers, sidebar items)
