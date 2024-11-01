let mysql = require('mysql');
 var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Nischay@1234",
    database:"blog"
 })

 module.exports=con;


