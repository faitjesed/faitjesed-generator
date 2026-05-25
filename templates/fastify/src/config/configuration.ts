import { configDotenv } from 'dotenv';
import type { BaseConfiguration } from '@/types';

configDotenv();

export const Configuration: BaseConfiguration = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
