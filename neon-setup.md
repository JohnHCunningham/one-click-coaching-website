# Quick Neon Postgres Setup

## Option 1: Vercel Marketplace (Recommended)

1. Go to: https://vercel.com/integrations/neon
2. Click "Add Integration"
3. Select your project: "one-click-coaching-website"
4. Neon will auto-provision database
5. Environment variables auto-added to Vercel

## Option 2: Neon Direct

1. Go to: https://console.neon.tech
2. Sign up with GitHub (same account as Vercel)
3. Create new project: "occ-copilot-db"
4. Copy connection string
5. Add to Vercel manually

Connection string format:
postgresql://[user]:[password]@[endpoint]/[dbname]

Add as POSTGRES_URL to Vercel.
