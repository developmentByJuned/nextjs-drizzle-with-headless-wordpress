const { sql } = require('drizzle-orm'); // Import sql from drizzle-orm

const up = async (db) => {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

const down = async (db) => {
  await db.execute(sql`
    DROP TABLE IF EXISTS migrations;
  `);
};

// Export the functions
module.exports = {
  up,
  down,
};
