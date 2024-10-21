const { sql } = require('drizzle-orm'); // Import sql from drizzle-orm

const up = async (db) => {
  // Modify user_registered to have a valid default value
  await db.execute(sql`
    ALTER TABLE wp_users
    MODIFY user_registered DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL;
  `);
  
  // Add the new columns
  await db.execute(sql`
    ALTER TABLE wp_users
    ADD COLUMN wex_tokens INT DEFAULT 10 NOT NULL,
    ADD COLUMN wex_points INT DEFAULT 0 NOT NULL;
  `);
};

const down = async (db) => {
  await db.execute(sql`
    ALTER TABLE wp_users
    DROP COLUMN wex_tokens,
    DROP COLUMN wex_points;
  `);
};

// Export the functions
module.exports = {
  up,
  down,
};
