# My Contacts

A personal address book built during the JStack course. The React interface lets you add, edit, search, sort, and delete contacts; an Express API persists contacts and categories in PostgreSQL. The interface also includes loading, empty, and error states.

## Features

- Save a contact's name, email, phone number, and optional category.
- Edit and delete contacts from the list.
- Search and sort contacts.
- Create and use categories to organize the address book.

## Stack

| Part | Technology |
| --- | --- |
| Interface | React, JavaScript, styled-components |
| API | Node.js, Express, JavaScript, `pg` |
| Database | PostgreSQL |

The implementation uses **JavaScript**, not TypeScript. The previous README listed TypeScript in error.

## Repository layout

- `frontend/` — React application and UI.
- `api/` — Express routes, controllers, and PostgreSQL queries.
- `api/src/database/schema.sql` — database, extension, and table definitions.

## Running locally

You need Node.js, Yarn, and PostgreSQL. The API currently uses fixed local database settings in `api/src/database/index.js`: host `localhost`, port `5432`, user `root`, password `root`, database `mycontacts`. These are development settings in the source, not environment-variable configuration. Change that file if your local database differs.

Create the `mycontacts` database, connect to it, then execute the extension and table statements from `api/src/database/schema.sql`. The file itself contains a `CREATE DATABASE` statement, so run the remaining statements against the newly created database.

Start the API from `api/`:

```bash
yarn
yarn start
```

It listens on `http://localhost:8000`. In a second terminal, start the interface from `frontend/`:

```bash
yarn
yarn start
```

The frontend start script uses Windows `set PORT=3000` syntax. On Linux or macOS, run `PORT=3000 yarn react-scripts start` instead. These setup instructions are based on the repository configuration; the complete local flow has not been rerun as part of this documentation change.
