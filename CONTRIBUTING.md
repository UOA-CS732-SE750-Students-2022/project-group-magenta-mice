# Contributing Guide

## Absolute Prerequisites

Firebase is used in this project for authentication. You will need to create a
Firebase project and obtain a Firebase API key from a [service
account](https://firebase.google.com/support/guides/service-accounts).

Once you have this key (in the form of a JSON file), you can add it to the
`/key` directory. Name the file `firebase.json`.

## Docker Development

You can use the Visual Studio Code Remote Docker Extension to develop this
application in a docker container. This will allow you to get started with all
the needed dependencies already running.

1. You will need the Containers extension.
2. Reopen the folder in the container
3. Create `.env.local` with the Postgresql connection string. The default
   connection string for the docker Postgres container is
   `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"`
4. Ensure any dependencies are installed `npm i`, you may need `npm i --force`
   for peer dependency warnings.
5. Run `sudo npm prisma:migrate-dev` to prepare your database schema.
6. Run the application. You may need sudo privileges i.e. `sudo npm start`.

### Notes

- The dev container should also allow you to build the C++ exchange without any
  configuration. The `debug.sh` script should allow you to build the
  application, which creates the `./build/exchange` artifact.

- `sudo` seems to be required for the above actions. You are welcome to try
  without it but it would not work otherwise for me.

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

## Development Processes

- Updating the database schema will require a migration. After editing the
  schema file, run `npm run prisma:migrate-dev`.
- After modifying the frontend GraphQL query definitions in the `lib/gql`
  directory, you will need to manually run the generator to update the typings
  and generated code, `npm run gql:generate`.
- After producing components inside either the `hooks` or `components`
  libraries, you can run `index:generate` to automatically export these modules
  to the `index.ts` file and hence available to other libraries or applications.
