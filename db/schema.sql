DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  movie_name VARCHAR(100) NOT NULL
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    employee_id INT,
    department TEXT NOT NULL,
    FOREIGN KEY (employee_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);
