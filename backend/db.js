const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',   // Change this to your host if you're using a remote DB
  user: 'root',        // Your MySQL username
  password: '',        // Your MySQL password
  database: 'your_database_name'  // Your database name
});


// Connect to MySQL
connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to the MySQL database as ID ' + connection.threadId);
  });
  
  module.exports = connection;