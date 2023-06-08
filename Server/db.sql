CREATE DATABASE practica;
use practica;

CREATE TABLE userNew(
    email varchar(50) PRIMARY KEY,
    name varchar(50) NOT NULL,
    password varchar(10) NOT NULL
);