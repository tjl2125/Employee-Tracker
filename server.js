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