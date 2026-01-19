import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export interface Config {
  nodeEnv: string;
  apiUrl: string;
  collabWsUrl: string;
  databaseUrl: string;
  redisUrl: string;
  s3Endpoint: string;
  s3AccessKey: string;
  s3SecretKey: string;
  s3Bucket: string;
}

export const config: Config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  apiUrl: process.env.API_URL || 'http://localhost:8000',
  collabWsUrl: process.env.COLLAB_WS_URL || 'ws://localhost:1234',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://localhost:5432/verstka',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  s3Endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
  s3AccessKey: process.env.S3_ACCESS_KEY || 'minioadmin',
  s3SecretKey: process.env.S3_SECRET_KEY || 'minioadmin',
  s3Bucket: process.env.S3_BUCKET || 'verstka',
};
