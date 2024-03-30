# My Contacts - Your personal address book

## About

- [Preparing the environment](#install)
- [Running app in localhost](#localhost)

## 🧐 About

This project was made from the classes inside the [JStack](https://jstack.com.br/) course.

The application was made to be used as a personal address book, keeping your contacts in memory.

Here, you can contacts and registering their phone numbers and some social media informations as well.

Main Technologies included in this repository:

- [Typescript](https://www.typescriptlang.org/): JavaScript's superset with static typing, completely optional, but recommended.

- [React](https://reactjs.org/): A library built with focus on building web interfaces from Javascript components.

- [Express](https://expressjs.com/): A minimal, flexible and unopinionated backend framework used to build RESTful APIs in the NodeJS environment.

## Installation <a name="install" />
You'll need to install nodeJS to run this application. Node is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and etc. You can download the latest version on the [Offical Site](https://nodejs.org/en/download). It'as recommended to download the latest version maked as `LTS (Long Term Support)`.

After that, it will be required for you to have a database to keep al the data in memory. The easier way to make it is Using [Docker](https://docs.docker.com/get-docker/). Docker is a engine container that runs vrtual machines `(VMs)` from your computer kernel, making it easier to create and execute applications using containers. This assures you that the application running inside this isolated environment will not be affected by any version changes in your operational system, as well as making it easier to manage and scale these applications.

## Running app in localhost <a name="localhost" />
### Building Postgres database with Docker
After installing docker, open your terminal and type the docker command to check if docker was installed effectivelly.

Then, type the following command into the terminal:

> Here i'm defining the user and password as root and the port 5432 as the standard of postgres database, just to execute into the localhost. You can change it but don't forget to update the credentials in the `DATABASE_URL` environment variable in the `.env` inside the `api` folder.
#### Tags:
* `-e`: environment variables;
* `-d`: dettached mode, runs the docker container in background;
* `-p`: define the ports that the database is being exposed for your computer.
```bash
docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -d postgres -p 5432:5432
```

### Creating database with postgreSQL

With your container running, type the following command to get into it:
```bash
docker exec -it pg bash
```

To log into the postgres, type the command `psql -U` passing your username:

```bash
psql -U root
```

#### Tags:
* `\l`: list the database into the postgres database;
* `dt`: list all tables from this database;
* `\c`: connects with the selected database.

After this, let's create the database with SQL commands:

```sql
CREATE DATABASE mycontacts
```
```bash
\c mycontacts
```
```sql
CREATE DATABASE mycontacts
```
To generate the UUIDs, will be necessary to install the extension `uuid-ossp`
Then, type the commands in the file located inside `api/src/database/schema.sql`.

To execute the frontend and API, open two separate terminals, get into `api`  and `frontend` folders in each one of them and execute the following commands:

### Executing API on development mode
```bash
cd api
```
#### Installing the dependencies
```bash
yarn
```
#### Running in dev mode
```bash
yarn dev
```
### Executing Frontend on development mode
```bash
cd frontend
```
#### Installing the dependencies
```bash
yarn
```
#### Running in dev mode
```bash
yarn dev
```
