# DIYH

Idle play-to-earn game on Solana — tap, earn dickoin, swap to $DIYH.

## Local dev

```bash
npm install
cp .env.example .env.local   # then fill Supabase keys (see below)
npm run dev
```

Open `http://localhost:5173`

## New Supabase project (cloud save + ONLINE NOW)

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. **SQL Editor** → paste & run all of `supabase/schema.sql`
3. **Project Settings → API** → copy:
   - **Project URL** → `VITE_SUPABASE_URL` (e.g. `https://abcdefgh.supabase.co`, no trailing slash, no `/rest/v1/`)
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
4. Put both in `.env.local` (never commit this file)
5. Restart `npm run dev` — game Settings should show cloud sync, not “Local save only”

Tables created: `game_saves`, `player_presence`

## New GitHub repo

Remote lama (`yami-kiosk/Growdy`) sudah dihapus dari project ini.

```bash
# 1. Buat repo kosong di GitHub akun baru (Public, tanpa README)

# 2. Hubungkan & push (ganti USERNAME)
git remote add origin https://github.com/playdiyh/diyh.git
git add .
git commit -m "Rebrand to DIYH and prepare fresh GitHub + Supabase setup."
git push -u origin main
```

Login push pakai **Personal Access Token** akun GitHub baru (Settings → Developer settings → Tokens → scope `repo`).

## Deploy Vercel

1. [vercel.com/new](https://vercel.com/new) → Import repo GitHub baru
2. Framework: **Vite** (auto-detected)
3. **Environment Variables** (Production + Preview):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy → test `/game` → Settings → cloud save connected

Env var Vite hanya dibaca saat **build** — set env dulu, lalu redeploy kalau sudah pernah deploy tanpa env.

## Structure

```
├── index.html, game.html, …   # Pages (clean URLs via vercel.json)
├── js/                        # Game engine, wallet, navigation
├── css/
├── assets/
└── supabase/schema.sql        # Run once on new Supabase project
```
