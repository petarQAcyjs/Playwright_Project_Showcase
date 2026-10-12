import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://libretranslate.com',
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.mymemory.translated.net',
  DEFAULT_TIMEOUT: 30000,
  API_TIMEOUT: 10000,
  IS_CI: !!process.env.CI,
};
