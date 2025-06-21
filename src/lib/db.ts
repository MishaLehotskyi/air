import { Client } from 'pg';

let client: Client | null = null;

export function getClient() {
  if (!client) {
    client = new Client({ connectionString: process.env.DATABASE_URL });
    client.connect();
  }
  return client;
}