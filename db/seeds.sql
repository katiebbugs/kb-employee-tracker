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