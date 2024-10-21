const { drizzle } = require('drizzle-orm/mysql2');
const mysql = require('mysql2/promise');

// Create a connection to the MySQL database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'local',
  socketPath: '/Users/deku/Library/Application Support/Local/run/lNp3VT8jI/mysql/mysqld.sock',
});

// Initialize Drizzle with the MySQL connection pool
const db = drizzle(connection);

module.exports = {
  db
}