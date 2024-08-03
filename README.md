# api-shortly

**api-shortly** is a URL shortening service built with TypeScript, Express, and Drizzle ORM. It provides a simple API to shorten URLs and manage them.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/domkarv/api-shortly.git
    cd api-shortly
    ```

2. Install dependencies using pnpm:
    ```bash
    pnpm install
    ```

3. Create a `.env` file in the root directory and add your environment variables as per `.env.sample`:
    ```env
    PORT=
    DATABASE_URL=
    ```

4. Build the project:
    ```bash
    pnpm build
    ```

## Usage

1. To start the development server:
    ```bash
    pnpm dev
    ```

2. To start the production server:
    ```bash
    pnpm start
    ```

## Scripts

- `dev:tsc`: Starts TypeScript in watch mode.
- `dev:node`: Starts Node.js with source maps and environment variables.
- `dev`: Builds the project and starts the development server.
- `build`: Compiles TypeScript files.
- `prestart`: Builds the project before starting the server.
- `start`: Starts the server with environment variables.
- `format`: Formats the code using Prettier.
- `db:introspect`: Introspects the database schema using Drizzle Kit.
- `db:generate`: Generates database schema files using Drizzle Kit.
- `db:migrate`: Runs database migrations.
- `db:studio`: Starts Drizzle Kit studio.
- `db:drop`: Drops the database schema.

## Tech Stack

- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Drizzle ORM**: A TypeScript ORM for SQL databases that provides a pleasant developer experience.
- **Neon Database**: A serverless, PostgreSQL-compatible database.
- **nanoid**: A tiny, secure URL-friendly unique string ID generator.
