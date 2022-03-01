CREATE DATABASE db_lavoz;

USE db_lavoz;

CREATE TABLE usuarios(
    id_usuarios INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    movil VARCHAR(20) NOT NULL,
    ciudad VARCHAR(75) NOT NULL,
    direccion VARCHAR(75) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

DESCRIBE usuarios;