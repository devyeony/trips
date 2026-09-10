# trips

Travel itineraries built with [Astro](https://astro.build) and published to GitHub Pages.

Each trip is a data file plus shared components, so a new trip means writing content — not re-building the layout, timeline, or map.

Pages are built for readers in their 60s on a phone: stops are collapsed cards
you tap to expand, one day shows at a time, and a "큰 글자" control scales the
whole page and remembers the choice. With JavaScript off the page degrades to a
single scroll containing every day and every section.

## Trips

| Trip | Dates | Page |
| --- | --- | --- |
| Okinawa | 2026.09.20 – 09.23 · 3박 4일 | [`/okinawa-2026/`](https://devyeony.github.io/trips/okinawa-2026/) |

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/trips
npm run build    # static output to dist/
```

## Structure

```
src/
├── layouts/Trip.astro        # page shell: view tabs, date tabs, text size
├── components/
│   ├── Stop.astro            # one stop, as a collapsed card
│   ├── Facts.astro           # address / phone / hours / parking / price
│   ├── Accordion.astro       # collapsed row, used across the info view
│   ├── More.astro            # the "자세히 보기" affordance
│   ├── DayTabs.astro         # four fixed date tabs, never a scroll
│   └── Day, Hero, RouteMap, CardGrid, Checklist, Tags
├── data/
│   ├── types.ts              # the shape of a trip
│   └── okinawa-2026.ts       # one trip's content
└── pages/
    ├── index.astro           # trip hub
    └── okinawa-2026.astro     # assembles the three views
```

### Writing a stop

`summary` is the line that shows while the card is closed — one sentence, no
bold. `facts` holds anything you would otherwise hunt for mid-paragraph on the
day itself. `detail` is the long prose, revealed on tap.

```ts
{
  when: "16:35",
  key: true,                         // the plan hinges on this one
  title: "선셋 비치 · 동생 수영 30분",
  summary: "17시 전에 도착하면 갑니다 — 동생만 30분",
  facts: [{ k: "유영", v: "9:00~17:30 (9월)" },
          { k: "주차", v: "챠탄공원 무료 450대 · 6:00~22:00" }],
  detail: "…",
}
```

Keep bold to one per paragraph. At a third of the body text it stopped meaning
anything, which is what prompted this layout in the first place.

## Adding a trip

1. Copy `src/data/okinawa-2026.ts` to `src/data/<trip>.ts` and fill in the content
2. Copy `src/pages/okinawa-2026.astro` to `src/pages/<trip>.astro`, importing the new data
3. Add a card to `src/pages/index.astro` and a row to the table above
4. Push to `main` — GitHub Actions builds and deploys automatically

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with Astro and publishes `dist/` to GitHub Pages.

> The repo is public, so keep booking references, passport details, and phone numbers out of trip data.
