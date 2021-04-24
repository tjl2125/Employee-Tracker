-- USE employees_db;


INSERT INTO department (name)
VALUES ("Engineering"), ("Sales"), ("Legal"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1), ("Lead Engineer", 160000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emily", "Rodriguez", 1, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Elizabeth", "Wrixon", 2);