import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var _db: ReturnType<typeof drizzle> | undefined;
}

// Disable prefetch as required for Supabase's "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = globalThis._db || drizzle({ client });

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db;
}

export { db };
