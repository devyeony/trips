// Shape of a trip's data. Copy okinawa-2026.ts as a template for new trips.

export type LatLng = [number, number];

/** Inline tag keys map to the .t-* colour classes in global.css. */
export type TagKind = 'sea' | 'in' | 'opt' | 'eat' | 'me' | 'par';

/** One row of the fact table shown when a stop is expanded.
 *  Pull these OUT of the prose - address, phone, hours, parking, price are
 *  what you hunt for on the day, and prose is the worst place to keep them. */
export interface Fact {
  k: string;              // short label: "주소" "전화" "영업" "주차" "요금"
  v: string;              // the fact itself, no sentences
}

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

/** A stop on a day's timeline, rendered as a collapsed card.
 *
 *  Collapsed, a reader sees: when · title · summary · tags · duration.
 *  Expanded, they additionally get `facts` then `detail`.
 *
 *  `detail` holds the original prose verbatim - moving it here is a rename,
 *  not a rewrite. Rewriting loses information; see docs/ui-redesign.md. */
export interface Stop {
  kind?: 'stop';
  when: string;           // "10:30"
  title: string;
  summary: string;        // always visible - one line, ~40 chars, no bold
  tags?: Tag[];
  duration?: string;      // "1시간 15분"
  key?: boolean;          // the plan hinges on this one
  facts?: Fact[];         // shown first when expanded
  detail?: string;        // HTML string - the original desc
}

/** A drive/transition row between stops. */
export interface Drive {
  kind: 'drive';
  label: string;          // "이동 · 10분"
}

export type TimelineEntry = Stop | Drive;

/** A day section. One day shows at a time, chosen by the date tabs. */
export interface Day {
  id: string;             // "d1"
  no: string;             // "DAY 01"
  title: string;
  date: string;           // "9월 27일 (일) · 나하 → ..."
  tab: { d: string; w: string };  // date-tab face: { d: "9/20", w: "일" }
  colour: string;         // day colour, shared with the map pins
  stats: { k: string; value: string }[];
  timeline: TimelineEntry[];
}

// There is deliberately no day-level summary or note. Anything that would
// have gone in one belongs to the stop it is about - a reader looking at
// 07:00 should not have to scroll back up to learn the beach has no showers.

/** A card in the info view. Nothing here collapses - the info view is the
 *  one place a reader scans rather than reads, and an accordion turned every
 *  answer into a tap. Prefer `facts` and `list` over `body`. */
export interface InfoCard {
  kick?: string;          // small mono label above the title
  title: string;
  body?: string;          // HTML string - a line or two, not paragraphs
  facts?: Fact[];         // same table as a stop: address, hours, price
  list?: string[];        // HTML strings - where most of the content lives
}

/** One block of the info view: 숙소, 현금, 짐, 플랜 B. */
export interface InfoSection {
  id: string;
  no: string;             // "STAY" "CASH" "PACK"
  title: string;
  note?: string;          // one line under the heading
  cards: InfoCard[];
}

/** Map pins. */
export interface MapStop {
  d: string;              // day key -> colour, "d1"
  n: string;              // label inside pin
  ll: LatLng;
  t: string;              // popup <em> line
  name: string;           // popup <b> line
  desc?: string;          // ONE line - the full story lives on the stop card
}

export interface MapHotel {
  d: string[];            // days this stay is in use - the Naha room is not
                          // on the map while you are still sleeping in Onna
  ll: LatLng;
  name: string;
  t: string;
  desc?: string;
}

export interface MapRoute {
  d: string;              // day key - lets the legend filter by day
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
  legend: { d: string; color: string; label: string }[];
  note: string[];         // one line each, rendered as a list
  dirLinks: DirLink[];
  stops: MapStop[];
  hotels: MapHotel[];
  routes: MapRoute[];
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
  views: { plan: string; map: string; info: string };  // top tab labels
  map: TripMap;
  days: Day[];
  /** The info view, top to bottom. Anything that belongs to one moment of
   *  the trip lives on that stop instead - this is trip-wide reference only. */
  info: InfoSection[];
}
