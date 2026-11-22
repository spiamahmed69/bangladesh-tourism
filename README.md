# Beautiful Bangladesh — Modern Tourism Board Website

A modern, bilingual (English + Bangla) redesign concept of the Bangladesh Tourism Board website. React 19 + Vite + Tailwind CSS v4 + React Router. No backend — trip plans and feedback are stored in the browser's localStorage only.

Live: https://bangladesh-tourism-nu.vercel.app

## Pages (20 prerendered routes)
- Home — hero, search, featured destinations, experiences, six seasons, why visit
- Destinations — filter by category + EN/BN search, 12 destination cards
- Destination detail (12) — hero, description, highlights, best time, other destinations
- Experiences — Beach, Hills & Clouds, Wildlife, Heritage, Rivers & Lakes, Food & Culture
- Plan Your Trip — interest / days / season / budget → day-by-day suggested itinerary, save trips locally
- Travel Essentials — visa, best time, money, transport, safety & health, language & etiquette
- Gallery, About, Contact, 404

## Bilingual
Every UI string is in `src/lib/i18n.jsx` (STRINGS, EN + BN). The header toggle switches instantly without reload and persists under localStorage key `bt-lang` (default `en`). Destination content comes from `src/data/destinations.js` `_en`/`_bn` fields. Prerendered HTML is in English (default); Bangla renders client-side after the language toggle.

## Honesty notes
- **Unofficial concept** — this is not the official government website. The footer and About page say so in both languages and link to the official sites: tourismboard.gov.bd, beautifulbangladesh.gov.bd, visitbangladesh.gov.bd.
- **Photos are illustrative** (Unsplash, verified HTTP 200) and labelled as such; they are not claimed to be photos of the exact places named.
- **No invented facts** — BTB formed 2010, under the Ministry of Civil Aviation and Tourism, headquarters Parjatan Bhaban, West Agargaon, Dhaka. No CEO name, phone number, email or statistics are invented; the Contact page lists no BTB phone/email.
- Visa rules are not listed with fees — the Essentials page tells visitors to check the nearest Bangladesh mission / official portal.
- The trip planner produces a *suggested* itinerary only and says to check transport and bookings before travelling.

## Develop
```bash
npm run dev
npm run build   # sitemap + vite build + SSR bundle + prerender all 20 routes
```
Do not run `npm install` on the VM (registry fails); node_modules is already installed. Deploy: import the repo in Vercel (Vite preset). `vercel.json` rewrites SPA routes to `index.html`; prerendered `dist/<route>/index.html` files are served directly.
