DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;


-- creating tables --
  -- department table --
    CREATE TABLE department (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      department_name VARCHAR(30)
    );
  -- role table --
    CREATE TABLE role (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(30),
      salary DECIMAL,
      department_id INT,
      FOREIGN KEY (department_id) REFERENCES department(id)
    );
  -- employee table --
    CREATE TABLE employee (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(30),
      last_name VARCHAR(30),
      manager_id INT,
      role_id INT,
      FOREIGN KEY (role_id) REFERENCES role(id),
      FOREIGN KEY (manager_id) REFERENCES employee(id)

    );
-- seeds --
  -- department seeds --
    INSERT INTO department (department_name)
    VALUES  ("Sales"),
            ("Warehouse"),
            ("Customer Service"),
            ("Management"),
            ("Accounting");
  -- role seeds --
    INSERT INTO role (title, salary, department_id)
    VALUES  ("Warehouse Assistant", 55000, 2),
            ("Foreman", 62000, 2),
            ("Accountant", 48000, 5),
            ("Head of Accounting", 57000, 5),
            ("Sales Rep", 60000, 1),
            ("Receptionist", 40000, 4),
            ("Regional Manager", 70000, 4),
            ("Customer Service Rep", 32000, 3);
  -- employee seeds --
    INSERT INTO employee (first_name, last_name, manager_id, role_id)
    VALUES  ("Darryl", "Philbin", null, 2),
            ("Michael", "Scott", null, 7),
            ("Kelly","Kapoor", 2, 8),
            ("Kevin", "Malone", 2, 3),
            ("Oscar", "Martinez", 2, 3),
            ("Phyllis", "Vance", 2, 5),
            ("Angela", "Martin", 2, 4),
            ("Dwight", "Schrute", 2, 5),
            ("Pam", "Beesly", 2, 6),
            ("Jim", "Halpert", 2, 5);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;