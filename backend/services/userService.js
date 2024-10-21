/**
 * Add user related query function here to query the database and use it in the
 * API
 */
const { db } = require('../db');
const { sql } = require('drizzle-orm');

// Example: Fetching user by ID
const getUserById = async (userId) => {
  const query = sql`SELECT * FROM wp_users WHERE ID = ${userId}`;
  const [rows] = await db.execute(query);
  return rows;
};

// Example: Updating wex_tokens for a user
const updateWexTokens = async (userId, tokens) => {
  const query = sql`
    UPDATE wp_users 
    SET wex_tokens = ${tokens} 
    WHERE ID = ${userId};
  `;
  await db.execute(query);
};

module.exports = {
  getUserById,
  updateWexTokens,
};
