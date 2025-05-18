// Configure environment variables for different environments
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Configures environment variables from multiple possible sources
 * This allows the app to run in different environments (local development, Docker, etc.)
 */
export function configureEnv() {
  // Try to determine project root directory
  let rootDir: string;
  
  try {
    // If called from a module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    rootDir = path.resolve(__dirname, '..');
  } catch (error) {
    // Fallback to current working directory if not in ESM context
    rootDir = process.cwd();
  }

  // Try different environment files in order of precedence
  const envFiles = [
    '.env',
    '.env.local',
    '.env.development',
    '.env.production'
  ];

  let loaded = false;
  
  // Log for debugging
  console.log(`Looking for environment files in: ${rootDir}`);
  
  for (const file of envFiles) {
    const envPath = path.join(rootDir, file);
    if (fs.existsSync(envPath)) {
      console.log(`Loading environment variables from ${file}`);
      dotenv.config({ path: envPath });
      loaded = true;
    }
  }

  // Even if no files found, environment variables might be set directly (e.g. in Docker)
  if (!loaded) {
    console.log('No .env files found. Using existing environment variables.');
  }

  // Verify critical environment variables
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined. Please set it in .env, .env.local, or in your environment.');
  }

  return process.env;
}

export default configureEnv;
