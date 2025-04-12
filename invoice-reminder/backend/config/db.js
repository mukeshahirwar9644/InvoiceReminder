const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql-mukesh.alwaysdata.net',
  user: 'mukesh',
  password: 'mukesh@123',
  database: 'mukesh_invoice'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

module.exports = db;
