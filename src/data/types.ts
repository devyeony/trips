// Shape of a trip's data. Copy okinawa-2026.ts as a template for new trips.

export type LatLng = [number, number];

/** Physical/energy load shown as a 3-segment bar. */
export type Load = 1 | 2 | 3;

/** Inline tag keys map to the .t-* colour classes in global.css. */
export type TagKind = 'sea' | 'in' | 'opt' | 'eat' | 'me' | 'par';

export interface Tag {
  kind: TagKind;
  label: string;
}

/** A flight leg in the hero. */
export interface Leg {
  label: string;          // e.g. "가는 날 09.27 (일)"
  departTime: string;     // "08:00"
  departCode: string;     // "ICN 인천"
  arriveTime: string;     // "10:30"
  arriveCode: string;     // "OKA 나하"
  flight: string;         // "ZE633 · 2h30m"
}

/** A nav tab. `n` is the optional mono prefix like "D1". */
export interface NavItem {
  href: string;           // "#d1"
  label: string;          // "도착 · 챠탄 · 만좌모"
  n?: string;             // "D1"
}

/** One entry in the legend box. */
export type LegendItem =
  | { type: 'load'; load: Load; label: string }
  | { type: 'tag'; tags: Tag[]; label: string };

/** A stop on a day's timeline. */
export interface Stop {
  kind?: 'stop';
  when: string;           // "10:30"
  title: string;
  tags?: Tag[];
  desc?: string;
  duration?: string;      // foot: "1시간 15분"
  load?: Load;            // foot load bar
  key?: boolean;          // filled (coral) dot
}

/** A drive/transition row between stops. */
export interface Drive {
  kind: 'drive';
  label: string;          // "이동 · 10분"
}

export type TimelineEntry = Stop | Drive;

/** A day section. */
export interface Day {
  id: string;             // "d1"
  no: string;             // "DAY 01"
  title: string;
  date: string;           // "9월 27일 (일) · 나하 → ..."
  stats: { k: string; value?: string; load?: Load }[];
  timeline: TimelineEntry[];
  note?: string;          // HTML string (allows <b>)
}

/** A card in a grid (stay / plan B). */
export interface Card {
  kick: string;
  title: string;
  body?: string;          // HTML string
  list?: string[];        // HTML strings
}

/** A row in the prep checklist. */
export interface CheckRow {
  k: string;
  v: string;              // HTML string
}

/** A "generic" block section with a heading and card grid. */
export interface BlockSection {
  id: string;
  no: string;             // "STAY"
  title: string;
  cards: Card[];
}

/** Map pins. */
export interface MapStop {
  d: string;              // day key -> colour, "d1"
  n: string;              // label inside pin
  ll: LatLng;
  t: string;              // popup <em> line
  name: string;           // popup <b> line
  desc?: string;
}

export interface MapHotel {
  ll: LatLng;
  name: string;
  t: string;
  desc?: string;
}

export interface MapRoute {
  color: string;          // one of the day colours
  pts: LatLng[];
}

export interface DirLink {
  day: string;            // "DAY 1"
  href: string;
}

export interface TripMap {
  id: string;             // "map"
  no: string;             // "ROUTE"
  title: string;          // "4일간의 동선"
  mapId: string;          // dom id, "okmap"
  ariaLabel: string;
  dayColors: Record<string, string>;   // { d1:'#E2A32B', ... , stay:'#0E2C3B' }
  legend: { color: string; label: string }[];
  note: string;
  dirLinks: DirLink[];
  stops: MapStop[];
  hotels: MapHotel[];
  routes: MapRoute[];
  intro: Card[];          // cards under the map
}

/** The whole trip. */
export interface Trip {
  lang: string;
  title: string;          // <title>
  hero: {
    eyebrow: string;
    heading: string;      // HTML (allows <br>)
    sub: string;          // HTML (allows <b>)
    legs: Leg[];
  };
  nav: NavItem[];
  legend: { heading: string; items: LegendItem[] };
  map: TripMap;
  days: Day[];
  stay: BlockSection;
  prep: { id: string; no: string; title: string; rows: CheckRow[] };
  planB: BlockSection;
  footer: string;
}
