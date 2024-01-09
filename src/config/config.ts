import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: {
      version: process.env.APP_VERSION,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
  };
});