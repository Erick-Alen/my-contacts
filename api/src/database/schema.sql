CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories(
	id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
	name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts(
	id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
	name VARCHAR NOT NULL,
	email VARCHAR UNIQUE,
	phone VARCHAR,
	category_id UUID,
	foreign key (category_id) references categories(id)
);
