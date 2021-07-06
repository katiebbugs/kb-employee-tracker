// dependencies
  const inquirer = require("inquirer");
  const mysql = require("mysql2");

// connection
  const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "katiebbugs",
    database: "employee_db"
  });

  db.connect(function(err) {
      if (err) throw err
      console.log('Database Connected');
      startPrompt();
  });

// prompt
function startPrompt() {
  console.log("\n----- Employee Tracker -----\n");
  inquirer.prompt([
  {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices:
      [
        "View all departments", 
        "View all roles",
        "View all employees", 
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit"
      ]
  }
])
  .then(function(res) {
    switch (res.choice) {
      case "View all departments":
        viewAllDepartments();
      break;

      case "View all roles":
        viewAllRoles();
      break;

      case "View all employees":
        viewAllEmployees();
      break;

      case "Add a department":
        addDepartment();
      break;

      case "Add a role":
        addRole();
      break;

      case "Add an employee":
        addEmployee();
      break;

      case "Update an employee role":
        updateEmployee();
      break;

      case 'Exit':
        db.end();
      break;
    }
  });
}

// choices
  // department
  var departmentArr = [];
    function selectDepartment() {
      db.query("SELECT * FROM department", (err, res) =>  {
        if (err) {
          console.log(err);
        }
        for (var i = 0; i < res.length; i++) {
          departmentArr.push(res[i].department_name);
        }
    
      })
      return departmentArr;
    }
  // role
    var roleArr = [];
    function selectRole() {
      db.query("SELECT * FROM role", (err, res) => {
        if (err) {
          console.log(err);
        }
        for (var i = 0; i < res.length; i++) {
          roleArr.push(res[i].title);
        }
      })
      return roleArr;
    }
  // manager
    var managersArr = [];
    function selectManager() {
      db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", (err, res) => {
        if (err) {
          console.log(err);
        }
        for (var i = 0; i < res.length; i++) {
          managersArr.push(res[i].first_name);
        }
    
      })
      return managersArr;
    }
// routes
  // view all departments
    function viewAllDepartments() {
      db.query("SELECT * FROM department", (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log("\n----- Departments -----\n");
        console.table(res);
        startPrompt();
      });
    }
  // view all roles
    function viewAllRoles() {
      db.query("SELECT * FROM role LEFT JOIN department ON (department.id = role.department_id)", (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log("\n----- Roles -----\n");
        console.table(res);
        startPrompt();
      });
    }
  // view all employees
    function viewAllEmployees() {
      db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log("\n----- Employees -----\n");
        console.table(res);
        startPrompt();
      });
    }
  // add a department
    function addDepartment() { 
      inquirer.prompt([
          {
            name: "department_name",
            type: "input",
            message: "What is the name of this new department?"
          }
      ])
        .then(function(res) {
          db.query("INSERT INTO department SET ? ",
            {
              department_name: res.name
            },
            function(err) {
              if (err) {
                console.log(err);
              }
              console.log("\n----- Department Added -----\n");
              console.table(res);
              startPrompt();
            }
          )
        });
    }
  // add a role
  function addRole() { 
    db.query("SELECT role.title, role.salary, role.department_id FROM role", (err, res) => {
      inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of this role?"
        },
        {
          name: "salary",
          type: "input",
          message: "What will the salary be?"
  
        },
        {
          name: "department",
          type: "list",
          message: "What department will this role fall under?",
          choices: selectDepartment()
        }
      ])
        .then(function(res) {
          var departmentId = selectDepartment().indexOf(res.department) + 1
          db.query("INSERT INTO role SET ? ",
            {
              title: res.title,
              salary: res.salary,
              department_id: departmentId
            },
            function(err) {
              if (err) throw err
              console.log("\n----- Role Added -----\n");
              console.table(res);
              startPrompt();
            }
          )
        });
    });
  }
  // add an employee
    function addEmployee() { 
      db.query("SELECT employee.first_name, employee.last_name, employee.manager_id, employee.role_id FROM employee", (err, res) => {
      inquirer.prompt([
          {
            name: "first_name",
            type: "input",
            message: "Enter their first name"
          },
          {
            name: "last_name",
            type: "input",
            message: "Enter their last name"
          },
          {
            name: "role",
            type: "list",
            message: "What will their their role?",
            choices: selectRole()
          },
          {
            name: "manager",
            type: "list",
            message: "Who is their managers name?",
            choices: selectManager()
          }
      ])
        .then(function(res) {
        var roleId = selectRole().indexOf(res.role) + 1;
        var managerId = selectManager().indexOf(res.manager) + 1;
        db.query("INSERT INTO employee SET ? ", 
          {
            first_name: res.first_name,
            last_name: res.last_name,
            manager_id: managerId,
            role_id: roleId
          },
          function(err) {
            if (err) {
              console.log(err);
            }
            console.log("\n----- Employee Added -----\n");
            console.table(res);
            startPrompt();
          })
        })
      });
    }
  // update an employee role
  function updateEmployee() {
    db.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "list",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "list",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(res) {
        var roleId = selectRole().indexOf(res.role) + 1
        db.query("UPDATE employee SET role_id = ? WHERE last_name = ?", roleId, res.lastName,
        function(err){
          if (err) {
            console.log(err);
          }
            console.table(res)
            startPrompt()
        })
  
    });
  });

  }

  // "UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE id = (SELECT id FROM employee WHERE first_name = ?)"