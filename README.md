# trips

Travel itineraries built with [Astro](https://astro.build) and published to GitHub Pages.

Each trip is a data file plus shared components, so a new trip means writing content — not re-building the layout, timeline, or map.

## Trips

| Trip | Dates | Page |
| --- | --- | --- |
| Okinawa | 2026.09.20 – 09.23 | [`/okinawa-2026/`](https://devyeony.github.io/trips/okinawa-2026/) |

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/trips
npm run build    # static output to dist/
```

## Structure

```
src/
├── layouts/Trip.astro        # page shell: head, nav, footer, scroll-spy
├── components/               # Hero, RouteMap, Day, CardGrid, Checklist, …
├── data/
│   ├── types.ts              # the shape of a trip
│   └── okinawa-2026.ts       # one trip's content
└── pages/
    ├── index.astro           # trip hub
    └── okinawa-2026.astro     # assembles components from the data file
```

## Adding a trip

1. Copy `src/data/okinawa-2026.ts` to `src/data/<trip>.ts` and fill in the content
2. Copy `src/pages/okinawa-2026.astro` to `src/pages/<trip>.astro`, importing the new data
3. Add a card to `src/pages/index.astro` and a row to the table above
4. Push to `main` — GitHub Actions builds and deploys automatically

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with Astro and publishes `dist/` to GitHub Pages.

> The repo is public, so keep booking references, passport details, and phone numbers out of trip data.
