
  CREATE table users (
	id SERIAL PRIMARY KEY,
	fullname VARCHAR(60) NOT NULL,
	username VARCHAR(20) UNIQUE NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(200) NOT NULL,
	lastlogin INT,
	banned BOOL DEFAULT false
);

CREATE table categories (
	id INTEGER PRIMARY KEY,
	userid INTEGER NOT NULL,
	taskname VARCHAR(100) NOT NULL
);

CREATE table tasks (
	id INTEGER PRIMARY KEY,
	userid INTEGER NOT NULL,
	taskname VARCHAR(100) NOT NULL,
	hours NUMERIC NOT NULL,
	date INTEGER NOT NULL
);