import pkg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';


// Destructure Pool from the default import
const { Pool } = pkg;

// Construct __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: resolve(__dirname, './.env') });

// Log environment variables to verify they are loaded correctly
console.log('PGUSER:', process.env.PGUSER);
console.log('PGHOST:', process.env.PGHOST);
console.log('PGDATABASE:', process.env.PGDATABASE);
console.log('PGPASSWORD:', process.env.PGPASSWORD);
console.log('PGPORT:', process.env.PGPORT);

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Database connected:', result.rows);
  });
});

export default pool;
