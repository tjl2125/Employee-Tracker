const mysql = require ('mysql');
const inquirer = require ('inquirer'); 
const consoleTable = require ('console.table');
const pass = require ('./config');

const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,
  
    user: 'root',
  
    password: pass,
    database: 'employee_db',
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

            case 'exit':
            connection.end();
            break;

            default:
            console.log("Error");

        }
    });
};

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

const updateEmployeeRole = () => {
    
}

  
  // Connect to the DB
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    runTracker();
  });
  