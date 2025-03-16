import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Load environment variables
config({ path: ".env" });

// Disable prefetch as required for Supabase's "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle({ client });
