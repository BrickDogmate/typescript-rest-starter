import { createConnection, Connection, getConnection } from 'typeorm';

const dbHost: string = process.env.DB_HOST || 'localhost';
const dbPort: number = +process.env.DB_PORT || 3306;
const dbUser: string = process.env.DB_USER || 'root';
const dbPass: string = process.env.DB_PASS || '';
const dbName: string = process.env.DB_NAME || '';
const dbLogging: boolean = process.env.DB_LOGGING === 'true'

export function connDb(): Promise<Connection> {
  return createConnection({
    name: 'default',
    type: 'mysql',
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPass,
    database: dbName,
    entities: [
      `${__dirname}/**/*Entity.*`,
    ],
    logging: dbLogging,
    bigNumberStrings: false,
  });
}

export function configDb(): void {
  connDb().then((connection) => {
    console.log('db connected.');
  }).catch((err: any) => {
    console.error('Cannot connect to database', err);
  });
}

export async function closeDb(): Promise<void> {
  await getConnection().close();
}