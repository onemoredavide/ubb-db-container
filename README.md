# ubb-db

A local MySQL 8.4 database in Docker for the UBB Databases course, with Drizzle Studio for browsing it.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) (with Docker Compose)
- [Node.js](https://nodejs.org/) 20.12 or newer
- [pnpm](https://pnpm.io/installation)

## Setup

```sh
cp .env.sample .env   # local credentials, change them if you like
pnpm install
pnpm db:up            # start MySQL in the background
```

The first startup takes a few seconds while MySQL creates the database. Check that the container is up with `docker ps`: the `ubb-db-mysql` container should show `(healthy)`.

## Commands

| Command          | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `pnpm db:up`     | Start the MySQL container                       |
| `pnpm db:down`   | Stop the container (data is kept)               |
| `pnpm db:studio` | Open Drizzle Studio to browse the database      |

To wipe the database and start from scratch, run `docker compose down -v`. This deletes all data.

## Connecting with a database client

Use any MySQL client (DBeaver, DataGrip, TablePlus, MySQL Workbench, the `mysql` CLI, etc.) with these settings. The values come from `.env`, so update them if you changed it.

| Setting  | Value       |
| -------- | ----------- |
| Host     | `localhost` |
| Port     | `3307`      |
| Database | `ubb`       |
| User     | `ubb`       |
| Password | `ubb`       |

To get full privileges (for example, to create more databases), log in as `root` with password `root` instead.

From the terminal, without installing anything:

```sh
docker exec -it ubb-db-mysql mysql -uubb -pubb ubb
```

## No database client? Use Drizzle Studio

Drizzle Studio is a web UI for browsing tables and editing rows. It's included in this repo:

```sh
pnpm db:studio
```

Then open <https://local.drizzle.studio> in your browser. Keep the command running while you use it.

## Troubleshooting

**`Access denied for user 'ubb'@'localhost'`**: another MySQL server on your machine is probably using the port, so you're connecting to that server instead of the container. That's why this repo uses port `3307` instead of the default `3306`. If `3307` is also taken, change `MYSQL_PORT` and the port in `DATABASE_URL` in `.env`, then run `pnpm db:up` again.

**Credential changes don't apply**: MySQL reads the `MYSQL_*` variables only when the database is first created. After changing them, reset the data with `docker compose down -v` and run `pnpm db:up`.
