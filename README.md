## Cheatsheet

```bash
# run the development server
pnpm dev
# generate SQL migration files from `src/db/schema.ts` to `supabase/migrations`
pnpm exec drizzle-kit generate
# apply generated SQL migration files to supabase
pnpm exec drizzle-kit migrate
```
