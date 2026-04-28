# Messenger Chat

Messenger Chat is now configured for **Vercel + Supabase**.

## 1. Set up Supabase

1. Create a Supabase project.
2. In Supabase SQL Editor, run:
   - `supabase/schema.sql`
3. In Supabase Auth:
   - Enable Email sign-in.
4. Copy:
   - Project URL
   - Anon public key

### Admin moderation setup

Admin access is hard-locked in `supabase/schema.sql` to:
- `cburdick28@brewstermadrid.com`
- `lbondi28@brewstermadrid.com`
- `arosario28@brewstermadrid.com`

These emails can use the admin panel and send custom typed messages. Approval emails for new registrations still go to `cburdick28@brewstermadrid.com`.
All other users are limited to preset quick messages/emojis.

## 2. Configure frontend Supabase keys

Edit `static/config.js`:

```js
window.MESSENGER_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT_ID.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY"
};
```

## 3. Configure free registration approval (Supabase Edge Functions + Brevo)

This repo now uses a **free approval flow**:
- Register submits a pending request
- `cburdick28@brewstermadrid.com` receives an approval email
- Approving sends the user an invite email to set their password

### A) Install Supabase CLI and login

```bash
brew install supabase/tap/supabase
supabase login
```

### B) Link your project

```bash
cd MessengerEmoji
supabase link --project-ref hnjziardboghvhyhyhcx
```

### C) Set function secrets

Use a free Brevo key (https://www.brevo.com/):

```bash
supabase secrets set \
  BREVO_API_KEY="YOUR_BREVO_API_KEY" \
  APPROVER_EMAIL="cburdick28@brewstermadrid.com" \
  APPROVAL_FROM_EMAIL="cburdick28@brewstermadrid.com" \
  APPROVAL_BASE_URL="https://hnjziardboghvhyhyhcx.supabase.co" \
  PUBLIC_APP_URL="https://YOUR_VERCEL_APP_URL" \
  APPROVAL_TOKEN_TTL_HOURS="24"
```

### D) Deploy functions

```bash
supabase functions deploy request-registration
supabase functions deploy approve-registration
```

The app calls:
- `POST /functions/v1/request-registration` from Register
- `GET /functions/v1/approve-registration?...` from the admin email link

## 4. Deploy on Vercel

- Root path serves `index.html`
- App UI is `/static/index.html`
- Vercel config is static-only (`vercel.json`)

Deploy this repo on Vercel normally.

## Local preview (legacy Python server)

You can still run the old local Python server:

```bash
pip install -r requirements.txt
python3 server.py
```
