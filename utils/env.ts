import dotenv from 'dotenv';
import path from 'path';

// 1. Determine the environment from the terminal (defaults to 'qa' if not set)
const environment = process.env.ENV || 'qa';

// 2. Load the correct .env file relative to the project root
dotenv.config({ path: path.resolve(__dirname, `../.env.${environment}`) });

// 🔍 Add this temporary debug line:
console.log(`--- ACTIVE ENV: ${environment} ---`);
console.log(`Playground URL: ${process.env.PLAYGROUND_URL}`);
console.log(`Conduit URL: ${process.env.CONDUIT_URL}`);

// 3. Export an object containing your environment-specific URLs
export const URLs = {
    playground: process.env.PLAYGROUND_URL || '',
    conduit: process.env.CONDUIT_URL || '',
};