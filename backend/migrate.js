const fs = require('fs');
const path = require('path');
const { db } = require('./db/index'); // Adjust the path if necessary
const { sql }= require("drizzle-orm"); // Import sql for raw queries

async function runMigrations() {
  // Create migration tracking table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Read all migration files
  const migrationFiles = fs.readdirSync(path.join(__dirname, 'db/migrations'));

  for (const file of migrationFiles) {
    const migrationName = file;
    console.log({ migrationName });

    // Check if migration has already been applied using the sql template
    const [rows] = await db.execute(sql`SELECT * FROM migrations WHERE name = ${migrationName}`);

    if (rows.length === 0) {
      // Run migration
      const migration = require(`./db/migrations/${migrationName}`);
      await migration.up(db); // Pass the Drizzle connection

      // Track migration in the migrations table
      await db.execute(sql`INSERT INTO migrations (name) VALUES (${migrationName})`);
      console.log(`Migration ${migrationName} applied.`);
    } else {
      console.log(`Migration ${migrationName} has already been applied.`);
    }
  }
}

runMigrations()
.then(() => {
  // Example to rollback a specific migration
  // Uncomment to use
  // rollbackMigration('add-wex-columns.js');
  process.exit(0)
})
.catch((error) => {
  console.error('Error running migrations:', error);
  process.exit(1); // Exit with failure code
});

/**
 * To be used in case we want to do rollback.
 */
async function rollbackMigration(migrationName) {
  const migration = require(`./db/migrations/${migrationName}`);
  await migration.down(db); // Pass the Drizzle connection

  // Remove migration from the migrations table
  await db.execute(sql`DELETE FROM migrations WHERE name = ${migrationName}`);
  console.log(`Migration ${migrationName} rolled back.`);
}

