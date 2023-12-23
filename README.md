# Library-Management-System

Simplify book and borrower management for Bosta task. This repository hosts the codebase for an efficient system built with Nodejs, Nestjs, and Express.

- [Library-Management-System](#library-management-system)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the app](#running-the-app)
  - [Database](#database)
  - [API Documentation](#api-documentation)
  - [License](#license)

## Installation

1. Clone the repository to your local machine.

## Database Setup

1. Create a new PostgreSQL database named `library`.
   - `CREATE DATABASE library;`
2. Run the following commands to create a new PostgreSQL user:
   - `CREATE ROLE admin WITH LOGIN PASSWORD 'admin';`
   - `ALTER ROLE admin SUPERUSER CREATEROLE CREATEDB;`
   - `GRANT ALL PRIVILEGES ON DATABASE blog TO admin;`
3. Run Redis server on port `6379`

**Note:** The `.env.example` file contains environment variables that are used by the application to connect to the database and Redis server, as well as the session secret key. Please review the file carefully before using it, and make any necessary changes to ensure that it works with your specific environment.

```bash
# install dependencies
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```

## Database

```bash
# to create a migration
$ pnpm run migration:create ./src/database/migrations/name

# to generate a migration
$ pnpm run migration:generate ./src/database/migrations/name

# to run migrations
$ pnpm run migration:run

# to rollback migrations
$ pnpm run migration:rollback

# to drop schema
$ pnpm run schema:drop

```

## API Documentation

[API](./docs/API.md) - Read the APIs documentation.

## License

Library-Management-System is [MIT licensed](LICENSE).
