import env from "#/utils/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: env.database_uri,
});

const db = drizzle({ client: pool });

export default db;
