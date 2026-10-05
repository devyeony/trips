import type { Trip } from "../types";

// 뼈대만 있습니다. 날짜와 항공편만 정해졌고, 숙소·일정은 정해지면 채워 넣으세요.
// 구성은 오키나와와 같습니다 — 일정 3일, 지도, 정보(현금·기념품).

// Day colours reused by both the map and the legend.
const C = {
  d1: "#E2A32B",
  d2: "#17968F",
  d3: "#DE5238",
  stay: "#0E2C3B",
};

export const fukuoka2027: Trip = {
  lang: "ko",
  title: "후쿠오카 여행",

  hero: {
    eyebrow: "2027.02.28 – 03.02 (2박 3일)",
    heading: "후쿠오카 여행",
    sub: "",
    legs: [
      {
        label: "가는 날 02.28 (일)",
        departTime: "06:00",
        departCode: "ICN 인천",
        arriveTime: "07:35",
        arriveCode: "FUK 후쿠오카",
        flight: "1시간 35분",
      },
      {
        label: "오는 날 03.02 (화)",
        departTime: "15:50",
        departCode: "FUK 후쿠오카",
        arriveTime: "17:20",
        arriveCode: "ICN 인천",
        flight: "1시간 30분",
      },
    ],
  },

  views: { plan: "일정", map: "지도", info: "정보" },

  map: {
    id: "map",
    no: "ROUTE",
    title: "3일간의 동선",
    mapId: "fukmap",
    ariaLabel: "후쿠오카 방문지 지도",
    center: [33.5902, 130.4207], // 하카타역
    dayColors: C,
    legend: [
      { d: "d1", color: C.d1, label: "1일차" },
      { d: "d2", color: C.d2, label: "2일차" },
      { d: "d3", color: C.d3, label: "3일차" },
    ],
    note: [
      "지도를 보려면 인터넷 연결이 필요합니다.",
      "마커를 누르면 시간과 설명이 나옵니다.",
      "범례를 누르면 그날 동선만, 숙소만 따로 볼 수 있습니다 — 한 번 더 누르면 전체로 돌아옵니다.",
      "연결선은 직선 표시입니다 — 실제 경로는 아래 구글 지도에서 확인하세요.",
    ],
    dirLinks: [],
    stops: [],
    hotels: [],
    routes: [],
  },

  days: [
    {
      id: "d1",
      tab: { d: "2/28", w: "일" },
      colour: C.d1,
      no: "DAY 01",
      title: "도착",
      date: "2월 28일 (일) · 인천 → 후쿠오카",
      stats: [],
      timeline: [],
    },
    {
      id: "d2",
      tab: { d: "3/1", w: "월" },
      colour: C.d2,
      no: "DAY 02",
      title: "미정",
      date: "3월 1일 (월)",
      stats: [],
      timeline: [],
    },
    {
      id: "d3",
      tab: { d: "3/2", w: "화" },
      colour: C.d3,
      no: "DAY 03",
      title: "출발",
      date: "3월 2일 (화) · 후쿠오카 → 인천",
      stats: [],
      timeline: [],
    },
  ],

  // ── 정보 탭 ────────────────────────────────────────────────────────
  // 여행 전체에 걸리는 것만 둡니다. 특정 시각에만 쓰는 이야기는 그 일정의
  // 「자세히 보기」로 갑니다.
  info: [
    {
      id: "cash",
      no: "CASH",
      title: "현금",
      cards: [],
    },
    {
      id: "gift",
      no: "GIFT",
      title: "기념품",
      cards: [],
    },
  ],
};
