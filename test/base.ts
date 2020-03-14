import { getConnection } from 'typeorm';

export async function connectServer() {
  // Clears the cache so a new server instance is used for each test.
  delete require.cache[require.resolve('../src/server')];
  const conn = await getConnection('default');
  if (!conn.isConnected) await conn.connect();
}
