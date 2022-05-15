<h1 align="center">
  <img src="./media/logo/logo.svg?raw=true" width="350" />
  
  [simulate.exchange](https://simulate.exchange)
</h1>

<p align="center">
  <a href="https://github.com/UOA-CS732-SE750-Students-2022/simulate.exchange/actions/workflows/merge.yml/badge.svg">
    <img alt="Build Status" src="https://github.com/UOA-CS732-SE750-Students-2022/simulate.exchange/actions/workflows/merge.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@simulate-exchange/core">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@simulate-exchange/core">
  </a>
</p>

<div align="center">
  
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)
  ![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
  ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB?&color=blue)
</div>

A trading exchange simulator made for testing trading bots and running trading
competitions with per instrument trading history and overall P/L leaderboards.
Exchanges are dynamically created and hosted over isolated websocket connections
and are setup to use the trading instruments that you define.

### Deployed at: [simulate.exchange](https://simulate.exchange)

<details open="open">
<summary>Table of Contents</summary>

- [Screenshot](#screenshot)
- [Structure](#structure)
- [Architecture](#architecture)
- [Basic Frontend/Backend Setup](#basic-frontendbackend-setup)
  - [Cloning](#cloning)
  - [Absolute Prerequisites](#absolute-prerequisites)
  - [Docker Development](#docker-development)
    - [Notes](#notes)
  - [Non-Docker Setup](#non-docker-setup)
    - [Prerequisites](#prerequisites)
    - [Optional Prerequisites](#optional-prerequisites)
    - [Running the Application](#running-the-application)
  - [Served Content](#served-content)
  - [Development Processes](#development-processes)
- [Complete Staging Setup](#complete-staging-setup)
  - [Frontend and Backend](#frontend-and-backend)
  - [Exchange](#exchange)
  - [Data Generator](#data-generator)
  - [Trading Clients](#trading-clients)
- [Build](#build)
- [Running unit tests](#running-unit-tests)
- [Troubleshooting](#troubleshooting)
  - [Unexpected Type Errors](#unexpected-type-errors)
  - [Build Issues](#build-issues)
  </details>

This project was generated using [Nx](https://nx.dev).

## Screenshot

![Exchange](https://user-images.githubusercontent.com/54062686/168464890-5a0dc651-573f-4acc-87da-7a082bca296e.png)

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

## Architecture

We leverage docker and a custom orchestrator to create dynamic, isolated
exchanges and accompanying data generators.

Below is a high level architecture diagram displaying how the components of our
app function together practically.

![image](https://user-images.githubusercontent.com/54062686/168465163-79e65dbb-bebd-4dc5-9706-83e7999a3e90.png)

## Basic Frontend/Backend Setup

### Cloning

Clone the repo with `git clone --recursive`. A bug in NX creates a directory
outside the repo when running, so please clone at least two directories deep
into a place you have write access (i.e. `/home/user/a/b/clone-here` instead of
`/home/user/clone-here`).

### Absolute Prerequisites

Firebase is used in this project for authentication. You will need to create a
[Firebase project](https://console.firebase.google.com/) and obtain a Firebase
API key from a [service
account](https://firebase.google.com/support/guides/service-accounts).

Once you have this key (in the form of a JSON file), you can add it to the
`/key` directory. Name the file `firebase.json`.

You will need to enable the authentication feature in your Firebase project. Add
Google as a sign-in method provider.

### Docker Development

You can use the Visual Studio Code Remote Docker Extension to develop this
application in a docker container. This will allow you to get started with all
the needed dependencies already running.

1. You will need the Containers extension.
2. Reopen the folder in the container (do this by clicking on the remote VS Code
   icon in the bottom left corner of the window.)
3. Create `.env.local` with the Postgresql connection string. The default
   connection string for the docker Postgres container is
   `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"`
4. Ensure any dependencies are installed `npm i`, you may need `npm i --force`
   for peer dependency warnings.
5. Run `sudo run npm prisma:migrate-dev` to prepare your database schema.
6. Run the application. You may need sudo privileges i.e. `sudo npm start`.

#### Notes

- The dev container should also allow you to build the C++ exchange without any
  configuration. The `debug.sh` script should allow you to build the
  application, which creates the `./build/exchange` artifact.

- `sudo` seems to be required for the above actions. You are welcome to try
  without it but it would not work otherwise for me.

### Non-Docker Setup

#### Prerequisites

- Access to a Postgres database
- Node v16 and NPM 8

#### Optional Prerequisites

- Developing in **Visual Studio Code** is highly recommended for this
  repository.
- The following VS Code extensions:
  - GraphQL.vscode-graphql
  - esbenp.prettier-vscode
  - Prisma.prisma

#### Running the Application

0. Create a root level `.env.local` file. Add keys based on the `.env.sample`
   file.
1. Run `npm install` to install all dependencies.
2. Run `npm run prisma:generate` to generate the Prisma type definitions.
3. Run `npm start` to begin serving the frontend and backend.

### Served Content

The table below shows the content that is served when running `npm start`.

| Name      | Port/URL                |
| --------- | ----------------------- |
| Frontend  | <http://localhost:4200> |
| Storybook | <http://localhost:4400> |
| Backend   | <http://localhost:3333> |
| DB Studio | <http://localhost:5555> |

### Development Processes

- Updating the database schema will require a migration. After editing the
  schema file, run `npm run prisma:migrate-dev`.
- After modifying the frontend GraphQL query definitions in the `lib/gql`
  directory, you will need to manually run the generator to update the typings
  and generated code, `npm run gql:generate`.
- After producing components inside either the `hooks` or `components`
  libraries, you can run `index:generate` to automatically export these modules
  to the `index.ts` file and hence available to other libraries or applications.

## Complete Staging Setup

### Frontend and Backend

Follow above instructions to prepare the Frontend and Backend for running.

### Exchange

1. Build the exchange, or download the artifact from the GitHub build actions.
2. Update or create a config JSON file for the exchange. View
   `example-config.json` for an example of this.
   - `port` is the port the exchange will listen on.
   - `instruments` is a list of instruments that the exchange will support. The
     ID field is the most important, this needs to be a valid instrument ID from
     the database.
   - `database` is the database connection string to your Postgres database.
   - `exchangeID` is the ID of this exchange in the database. Note that all
     instruments listed must be from this exchange.
   - `marketMakerKey` is a special login key for the exchange. Clients that
     connect using this key will be exempt from the regular limits. This should
     match the `marketMakerKey` inside the database, but is not required.
3. Run the exchange with `./path/to/exchange your_config.json`

### Data Generator

1. Follow the `README.md` instructions inside the `data-generator` directory on
   the steps for running the data generator.
2. Update the `config.json` file with the valid settings.
   - `port` is the port the exchange is running on.
   - `host` is the hostname the exchange is running on.
   - `instruments` outlines all the instruments on the exchange, and provides
     the parameters for the instruments. Use the `ordinal` field to match the
     instruments with the exchange (i.e the first instrument in the exchange
     list is ordinal 0, second ordinal 1 etc).
   - `marketMakerKey` is a special login key for the exchange. This is required
     to make the data generator exempt from regular limits. This needs to match
     the `marketMakerKey` inside the exchange config.

### Trading Clients

Create a new NPM project and install the [Simulate Exchange NPM
Package](https://www.npmjs.com/package/@simulate-exchange/core). Follow the
instructions inside the package, or on the help page on your exchange page on
the website.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in
the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

Run `npm run e2e` to execute the end-to-end tests via
[Cypress](https://www.cypress.io).

You will need in the frontend-e2e folder:

- `cypress.env.json`

  - Copy in a user UID from your Firebase project (auth in the firebase
    console).
  - This will require at least one user logged in for the first time

- `serviceAccount.json`
  - Generate and rename into file from your Firebase project (service accounts)

You can see what they should look like in the `cypress.env.sample.json` and
`serviceAccount.sample.json` files

Run frontend e2e test with `npm run frontend-e2e`

## Troubleshooting

Some common solutions to various problems:

### Unexpected Type Errors

- Restart the TS server (TypeScript: Restart TS Server)
- Restart the GraphQL language server (VSCode GraphQL: Manual Restart)

### Build Issues

- If you have permissions errors, you may need to move the repo. A bug in the Nx
  CLI appears to create a directory out two levels from the project root, so
  please move the repo inside folders where you have permissions to write out
  two levels.
- Other build issues may be fixed by removing the `dist` folder at the project
  root.
