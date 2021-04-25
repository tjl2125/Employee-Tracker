const mysql = require ('mysql');
const inquirer = require ('inquirer'); 
const cTable = require ('console.table');
const pass = require ('./config');

const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,
  
    user: 'root',
  
    password: pass,
    database: 'employee_db',
  });

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    runTracker();
  });

  const runTracker = () => {
    inquirer 
        .prompt ([
            {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',  
            choices: [
            'Add a department, role, or employee', 
            'View departments, roles, or employees', 
            'Update employee roles', 
            'Exit',
                    ],
            }
        ])
        .then((answer) => {
            switch(answer.action) {
                case 'Add a department, role, or employee':
                addDRE();
                break; 

                case 'View departments, roles, or employees':
                viewDRE();
                break; 

                case 'Update employee roles':
                updateEmployeeRole();
                break;

                case 'Exit':
                connection.end();
                break;

                default:
                console.log("Error");

            }
        });
    };

// first choice from inital prompt
const addDRE = () => {
    inquirer
    .prompt ([
        {
            name: 'add',
            message: 'What are you trying to add?',
            type: 'list',
            choices: [
                'Add a department',
                'Add a role',
                'Add an employee',
                'Exit',
            ],
        }
    ])
    .then ((answer) => {
        switch(answer.add) {
            case 'Add a department':
            addDepartment();
            break; 

            case 'Add a role':
            addRole();
            break; 

            case 'Add an employee':
            addEmp();
            break;

            case 'Exit':
            connection.end();
            break;

            default:
            console.log("Error");

        }
    });
};

const addDepartment = () => {
    inquirer
    .prompt ([
        {
            name: 'depName',
            message: "Please add department name",
            type: "input"
        }
    ])
    .then ((answer) => {
        console.log('Adding new department...\n');
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.depName], 
        function(err, res) {
          if (err) throw err;
          console.log(`${answer.depName} department has been added`)
          console.table(res)
          runTracker()
  })
  })
}

const addRole = () => {
    inquirer
    .prompt ([
        {
            name: 'roleName',
            message: "Please add name of new role",
            type: "input"
        },
        {
          type: "input",
          message: "Please enter the salary for this role",
          name: "salaryTotal"
        },
        {
          type: "input",
          message: "Please enter the department id number",
          name: "deptID"
        }
    ])
    .then ((answer) => {
        console.log('Adding new role...\n');
        connection.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], 
          function(err, res) {
            if (err) throw err;
            console.log(`${answer.roleName} role has been added`)
            console.table(res);
            runTracker();
          });
        });
    }

const addEmp = () => {
    inquirer
    .prompt ([
        {
            name: 'empFirst',
            message: "Please add first name of employee",
            type: "input"
        },
        {
          name: 'empLast',
          message: "Please add last name of employee",
          type: "input"
       },
       {
        name: 'roleID',
        message: "Please add role ID number employee",
        type: "input"
      },
      {
        name: 'managerID',
        message: "Please add manager ID number",
        type: "input"
      },

    ])
    .then ((answer) => {
        console.log('Adding new employee...\n');
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.empFirst, answer.empLast, answer.roleID, answer.managerID], 
        function(err, res) {
          if (err) throw err;
          console.log(`${answer.empFirst} has been added`)
          console.table(res);
          runTracker();
        });
      });
  };

//second choice
const viewDRE = () => {
    inquirer 
    .prompt ([
        {
            name: 'view',
            message: 'What do you want to view?',
            type: 'list',
            choices: [
                'View a department',
                'View a role',
                'View an employee',
                'Exit',
            ],
        }
    ])
    .then ((answer) => {
        switch(answer.view) {
            case 'View a department':
            viewDepartment();
            break; 

            case 'View a role':
            viewRole();
            break; 

            case 'View an employee':
            viewEmp();
            break;

            case 'Exit':
            connection.end();
            break;

            default:
            console.log("Error");

        }
    });
};

const viewDepartment = () => {
  let query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runTracker();
  });
};

  const viewRole = () => {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      runTracker();
    });
  };

  const viewEmp = () => {
  let query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runTracker();
  });
};


//third choice
const updateEmployeeRole = () => {
  inquirer 
  .prompt([
    {
      type: "input",
      message: "Which employee do you want to update",
      name: "namePick"
    },
    {
      type: "input",
      message: "What information do you want to update",
      name: "updateRole"
    }
  ])   
  .then ((answer) => {
    connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.namePick],
    function(err, res) {
      if (err) throw err;
      console.table(res);
      runTracker();
    });
  });
};

  

  