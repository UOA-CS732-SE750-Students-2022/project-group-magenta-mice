# Contributing Guide

## Docker Development

Note: Due to an apparent bug in NX + Nest, the docker container will not work.
You can use it for a postgres instance, but unfortunately not for serving the
applications.

~~You can use the Visual Studio Code Remote Docker Extension to develop this~~
~~application in a docker container. This will allow you to get started with all~~
~~the needed dependencies already running.~~

## Prerequisites if Not Using Docker

- Access to a Postgres database
- Node v16 and NPM 8

## Optional Prerequisites

- Developing in **Visual Studio Code** is highly recommended for this
  repository.
- The following VS Code extensions:
  - GraphQL.vscode-graphql
  - esbenp.prettier-vscode
  - Prisma.prisma

## Setup

1. Create a root level `.env.local` file. Add keys based on the `.env.sample`
   file.
2. Run `npm install` to install all dependencies.
3. Run `npm run prisma:generate` to generate the Prisma type definitions.
4. Run `npm start` to begin serving the frontend and backend.

## Served Content

The table below shows the content that is served when running `npm start`.

| Name      | Port/URL                |
| --------- | ----------------------- |
| Frontend  | <http://localhost:4200> |
| Storybook | <http://localhost:4400> |
| Backend   | <http://localhost:3333> |
| DB Studio | <http://localhost:5555> |
