import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts', // Adjust path if necessary
  out: './db/migrations',
  dialect: 'mysql',                  // Ensure this is 'mysql2'
  dbCredentials: {
    url: 'mysql://root:root@localhost/local?socket=/Users/deku/Library/Application Support/Local/run/lNp3VT8jI/mysql/mysqld.sock',
  },
});
