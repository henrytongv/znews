# Database Setup Guide

## Issue: "no 'POSTGRES_URL' env var was found"

The `@vercel/postgres` library looks for the `POSTGRES_URL` environment variable. This guide will help you set it up correctly.

## Quick Fix

Add `POSTGRES_URL` to your `.env.local` file:

```env
# Use the same connection string for both variables
POSTGRES_URL=your_postgres_connection_string
DATABASE_URL=your_postgres_connection_string
```

## Detailed Setup

### Option 1: Neon (Recommended for Development)

1. **Create Neon Account**
   - Go to https://neon.tech
   - Sign up (free, no credit card needed)

2. **Create Database**
   - Create a new project: "znews"
   - Copy the connection string

3. **Update .env.local**
   ```env
   POSTGRES_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb
   DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb
   ```

4. **Run Setup Script**
   - Go to Neon Console → SQL Editor
   - Copy contents of `scripts/setup-database.sql`
   - Paste and execute

### Option 2: Vercel Postgres (Production)

1. **Create Database**
   - In Vercel Dashboard: Storage → Create Database → Postgres
   - Vercel automatically sets `POSTGRES_URL` environment variable

2. **For Local Development**
   - Copy connection string from Vercel dashboard
   - Add to `.env.local`:
   ```env
   POSTGRES_URL=postgres://...
   ```

3. **Run Setup Script**
   - In Vercel Dashboard → Storage → Your Database → Query
   - Copy contents of `scripts/setup-database.sql`
   - Execute

### Option 3: Docker (Local Development)

```bash
# Start PostgreSQL
docker run --name znews-postgres \
  -e POSTGRES_PASSWORD=znews_pass \
  -e POSTGRES_USER=znews_user \
  -e POSTGRES_DB=znews_db \
  -p 5432:5432 \
  -d postgres:16-alpine

# Update .env.local
POSTGRES_URL=postgres://znews_user:znews_pass@localhost:5432/znews_db
DATABASE_URL=postgres://znews_user:znews_pass@localhost:5432/znews_db

# Run setup script
docker exec -i znews-postgres psql -U znews_user -d znews_db < scripts/setup-database.sql
```

## Verify Setup

1. **Start dev server**
   ```bash
   npm run dev
   ```

2. **Check console output**
   - First request: "Syncing articles from newsdata.io..."
   - Second request: "Articles already synced today, skipping..."

3. **Check database**
   - `articles` table should have data
   - `sync_log` table should have today's entry

## Troubleshooting

### Error: "no 'POSTGRES_URL' env var was found"
- **Solution**: Add `POSTGRES_URL` to `.env.local`
- Both `POSTGRES_URL` and `DATABASE_URL` should have the same value

### Error: "Connection refused"
- **Solution**: Check that your database is running
- Verify connection string is correct
- Check firewall/security settings

### Error: "relation 'articles' does not exist"
- **Solution**: Run the setup script in `scripts/setup-database.sql`

### Error: "SSL required"
- **Solution**: Add `?sslmode=require` to your connection string
- Example: `postgres://user:pass@host/db?sslmode=require`

## Environment Variables Reference

| Variable | Required | Used By | Notes |
|----------|----------|---------|-------|
| `POSTGRES_URL` | Yes | @vercel/postgres | Primary connection string |
| `DATABASE_URL` | Fallback | @vercel/postgres | Used if POSTGRES_URL not set |
| `NEWSDATA_API_KEY` | Yes | API routes | newsdata.io API key |

## Support

- Neon documentation: https://neon.tech/docs
- Vercel Postgres docs: https://vercel.com/docs/storage/vercel-postgres
- @vercel/postgres GitHub: https://github.com/vercel/storage
