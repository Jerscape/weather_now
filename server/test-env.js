
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Construct __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: resolve(__dirname, './.env') });

// Log environment variables to verify they are loaded correctly
console.log('Environment Variables:');
console.log('PGUSER:', process.env.PGUSER);
console.log('PGHOST:', process.env.PGHOST);
console.log('PGDATABASE:', process.env.PGDATABASE);
console.log('PGPASSWORD:', process.env.PGPASSWORD);
console.log('PGPORT:', process.env.PGPORT);
