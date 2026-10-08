// Every trip, newest first. A trip is a folder under src/trips/ holding its
// trip.ts; listing it here gives it a page at /<slug>/ and a card on the hub.

import type { Trip } from './types';
import { fukuoka2027 } from './fukuoka-2027/trip';
import { okinawa2026 } from './okinawa-2026/trip';

export interface TripEntry {
  slug: string;           // folder name and URL path
  trip: Trip;
  card: { eyebrow: string; title: string; sub: string };
}

export const trips: TripEntry[] = [
  {
    slug: 'fukuoka-2027',
    trip: fukuoka2027,
    card: { eyebrow: '2027.02.28 – 03.02 (2박 3일)', title: '후쿠오카 여행', sub: '유후인 1박 + 텐진 1박.' },
  },
  {
    slug: 'okinawa-2026',
    trip: okinawa2026,
    card: { eyebrow: '2026.09.20 – 09.23 (3박 4일)', title: '오키나와 여행', sub: '온나 2박 + 나하 1박.' },
  },
];
