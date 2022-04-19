# Simulate.Exchange

This project was generated using [Nx](https://nx.dev).

## Structure

| Directory      | Description                                          |
| -------------- | ---------------------------------------------------- |
| **apps**       | Primary applications and e2e tests                   |
| backend        | NestJS backend server                                |
| data-generator | Python server that generates data for an exchange    |
| exchange       | C++ Matching Engine, Exchange and Networking         |
| frontend       | NextJS frontend website                              |
| orchestrator   | Go application for managing exchanges                |
| **libs**       | Various libraries for the main applications          |
| assets         | Various assets (mostly images) for the frontend      |
| components     | Frontend components inside storybook                 |
| database       | Backend library for Prisma database communication    |
| gql            | Frontend library that defines GraphQL requests       |
| hooks          | Frontend library that contains various React hooks   |
| **prisma**     | PostgreSQL schema definition and migrations          |
| **tools**      | Various development tools                            |
| scripts        | More complex scripts to improve developer experience |
| spm            | SimulatePackageManager, manages our C++ applications |
| **media**      | Project files for custom media                       |

## Development server

Read `CONTRIBUTING.md` for information.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

## Understanding the Workspace

Run `nx graph` to see a diagram of the dependencies of your projects.
