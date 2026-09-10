// Smoke test for the built site.
//
// The failure this exists for: a stylesheet edit whose anchor no longer
// matches drops a rule silently, `npm run build` still passes, and the page
// ships broken — the map with no height, the tab bar under Leaflet, the hub
// card as an unstyled link. None of that is a build error, so assert the
// things that must be true about the output instead.
//
//   npm run check     (also runs as part of `npm run build`)

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const read = (p) => readFileSync(join(dist, p), 'utf8');
const asset = (re) => read(join('_astro', readdirSync(join(dist, '_astro')).find((f) => re.test(f))));

const css = asset(/^global\..*\.css$/);
const trip = read('okinawa-2026/index.html');
const hub = read('index.html');

const failures = [];
const check = (label, ok) => { if (!ok) failures.push(label); };
const countOf = (s, re) => (s.match(re) || []).length;

// Rules with no markup to point at, so nothing else would notice their loss.
for (const rule of [
  '.js .day{', '.js .day.on{', '.js .view{', '.js .view.on{',
  '.js .daytabs{', '.js .daytabs.on{',
  '.mapbox{', '#okmap{', '.pin{', '.leaflet-popup-content{',
  '.tripcard{', '.triplist{', 'footer{', 'main{',
  // Without this the open pill hovers white-on-white and 접기 disappears.
  'details[open] summary:hover .more{',
]) check(`global.css is missing ${rule}`, css.includes(rule));

// The tab bar has to outrank Leaflet's controls, which sit at 1000.
const z = css.match(/\.bar\{[^}]*z-index:(\d+)/);
check('.bar has no z-index', z);
check(`.bar z-index ${z?.[1]} must beat Leaflet's 1000`, z && Number(z[1]) > 1000);

// Structure of the trip page.
// One card per stop, whatever the trip's length happens to be.
check('stop cards do not match summaries',
  countOf(trip, /<details class="stop"/g) === countOf(trip, /<p class="sum">/g));
check('suspiciously few stop cards', countOf(trip, /<details class="stop"/g) > 40);
check('no fact tables', countOf(trip, /<dl class="facts">/g) > 30);
check('date tabs are not four', countOf(trip, /role="tab" data-day="d[1-4]"/g) === 4);
check('exactly one day should start open', countOf(trip, /class="day on"/g) === 1);
check('exactly one view should start open', countOf(trip, /class="view on"/g) === 1);

// Without JS every day and every view must still be reachable.
check('days are hidden server-side', !/class="day"[^>]*hidden/.test(trip));
check('views are hidden server-side', !/role="tabpanel"[^>]*hidden/.test(trip));
check('the .js marker never runs', trip.includes("classList.add('js')"));

// Map filter.
check('map legend is not filterable', countOf(trip, /data-day="(d[1-4]|all|stay)"[^>]*aria-pressed/g) === 6);

// Two stops sharing a coordinate draw on top of each other.
const stops = [...trip.matchAll(/"d":"(d\d)","n":"(\w+)","ll":\[([-\d.]+),([-\d.]+)\]/g)]
  .map((m) => ({ day: m[1], at: `${m[3]},${m[4]}` }));
const seen = new Map();
for (const s of stops) {
  const key = `${s.day} ${s.at}`;
  if (seen.has(key)) failures.push(`two ${s.day} pins share ${s.at}`);
  seen.set(key, true);
}

// Every pin must sit on its day's line, in marker order. The dashed lines and
// the numbered pins are separate arrays, so one can be edited and the other
// left behind — that is how American Village fell off day 1's route and how
// day 2's line kept pointing at Aeon's old location.
const md = JSON.parse(trip.match(/id="mapdata">(.*?)<\/script>/s)[1]);
const at = ([a, b]) => `${a},${b}`;
const hotels = new Set(md.hotels.map((h) => at(h.ll)));
for (const route of md.routes) {
  const onLine = route.pts.map(at);
  const unknown = onLine.filter(
    (p) => !hotels.has(p) && !md.stops.some((s) => at(s.ll) === p));
  for (const u of unknown) failures.push(`${route.d} route passes ${u}, which is not a pin`);

  const mine = md.stops.filter((s) => s.d === route.d);
  for (const s of mine) {
    if (!onLine.includes(at(s.ll))) failures.push(`${route.d} route skips pin ${s.n} (${s.name})`);
  }
  const order = onLine
    .map((p) => mine.find((s) => at(s.ll) === p)?.n)
    .filter(Boolean)
    .map(Number);
  const sorted = [...order].sort((a, b) => a - b);
  if (String(order) !== String(sorted)) {
    failures.push(`${route.d} route visits pins out of order: ${order.join(' → ')}`);
  }
}

check('hub card is unstyled', hub.includes('class="tripcard"'));

if (failures.length) {
  console.error('\nBuild check failed:\n' + failures.map((f) => `  ✗ ${f}`).join('\n') + '\n');
  process.exit(1);
}
console.log(`Build check passed — ${stops.length} map pins, ${countOf(trip, /<details class="stop"/g)} stop cards.`);
