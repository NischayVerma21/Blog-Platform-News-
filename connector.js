let mysql = require('mysql');
 var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Your-sql-Password",
    database:"blog"
 })

 module.exports=con;


