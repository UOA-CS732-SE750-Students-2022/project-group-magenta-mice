# Simulate.Exchange

<p align="center">
  <img src="./media/logo/logo.svg?raw=true" width="350" />
</p>

<p align="center">
  <a href="https://github.com/UOA-CS732-SE750-Students-2022/simulate.exchange/actions/workflows/merge.yml/badge.svg">
    <img alt="Build Status" src="https://github.com/UOA-CS732-SE750-Students-2022/simulate.exchange/actions/workflows/merge.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@simulate-exchange/core">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@simulate-exchange/core">
  </a>
</p>

This project was generated using [Nx](https://nx.dev).

## Structure

| Directory      | Description                                          |
| -------------- | ---------------------------------------------------- |
| **_apps_**     | Primary applications and e2e tests                   |
| backend        | NestJS backend server                                |
| data-generator | Python server that generates data for an exchange    |
| exchange       | C++ Matching Engine, Exchange and Networking         |
| frontend       | NextJS frontend website                              |
| orchestrator   | Go application for managing exchanges                |
| **_libs_**     | Various libraries for the main applications          |
| assets         | Various assets (mostly images) for the frontend      |
| components     | Frontend components inside storybook                 |
| database       | Backend library for Prisma database communication    |
| gql            | Frontend library that defines GraphQL requests       |
| hooks          | Frontend library that contains various React hooks   |
| **_prisma_**   | PostgreSQL schema definition and migrations          |
| **_tools_**    | Various development tools                            |
| scripts        | More complex scripts to improve developer experience |
| spm            | SimulatePackageManager, manages our C++ applications |
| **_media_**    | Project files for custom media                       |

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
