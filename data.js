window.BUDAPEST_COMPASS_DATA = {
  center: [47.4979, 19.0402],
  heat: {
    noise: [
      [47.4990, 19.0645, 0.95, "Kazinczy / ruin bars", "Main party corridor around Kazinczy, Akacfa, Dob, and Kiraly."],
      [47.4975, 19.0592, 0.9, "Gozsdu Udvar", "Dense bar and restaurant courtyard; lively late."],
      [47.5010, 19.0630, 0.78, "Instant-Fogas area", "Large nightlife venues and street spillover."],
      [47.5052, 19.0632, 0.62, "Oktogon", "Traffic, trams, and nightlife edges."],
      [47.5090, 19.0600, 0.52, "Nagymezo utca", "Theatre and bar street with late movement."],
      [47.5003, 19.0839, 0.74, "Keleti station", "Rail traffic, taxi ranks, crowds, late arrivals."],
      [47.5109, 19.0579, 0.68, "Nyugati station", "Busy station edge and boulevard traffic."],
      [47.4971, 19.0705, 0.66, "Blaha Lujza ter", "Major junction, tram stops, underpasses, late traffic."],
      [47.4810, 19.0664, 0.46, "Boráros ter", "Transit junction and riverside traffic."],
      [47.4876, 19.0678, 0.44, "Corvin negyed", "Busy ring-road stop and evening foot traffic."]
    ],
    caution: [
      [47.4971, 19.0705, 0.78, "Blaha Lujza ter", "Large junction and underpass area; can feel scruffier late."],
      [47.5003, 19.0839, 0.74, "Keleti station edge", "Usual big-station mix: crowds, taxi approaches, loitering."],
      [47.5109, 19.0579, 0.58, "Nyugati station edge", "Busy station environment; stay alert around platforms and exits."],
      [47.4928, 19.0777, 0.62, "Nepszinhaz utca edge", "More uneven street feel than the polished inner districts."],
      [47.4891, 19.0826, 0.45, "Outer Jozsefvaros", "Mixed residential/industrial edges; less ideal for a first stay."],
      [47.4840, 19.0910, 0.42, "Orczy / outer VIII", "Functional, less tourist-oriented edge."],
      [47.4778, 19.0798, 0.36, "Outer Ferencvaros", "Some practical transit value, less charm for visitors."]
    ],
    hardship: [
      [47.5003, 19.0839, 0.82, "Keleti station", "Station frontage and underpasses can show visible street hardship."],
      [47.5109, 19.0579, 0.64, "Nyugati station", "Common big-station public-space pressure."],
      [47.4971, 19.0705, 0.64, "Blaha Lujza ter", "Busy underpass and junction environment."],
      [47.5001, 19.0249, 0.42, "Deli station", "Smaller station edge; occasional visible hardship."],
      [47.5073, 19.0246, 0.38, "Szell Kalman ter", "Large transit square with varied public-space use."],
      [47.4928, 19.0777, 0.5, "Nepszinhaz utca", "Mixed conditions; more visible hardship than polished tourist streets."]
    ],
    fancy: [
      [47.5009, 19.0467, 0.9, "District V riverfront", "Hotels, restaurants, Parliament views, and premium walkability."],
      [47.4978, 19.0526, 0.82, "Basilica / Deak area", "Central, polished, restaurant-heavy, expensive by local standards."],
      [47.5063, 19.0622, 0.82, "Andrassy Avenue", "Elegant boulevard, culture, luxury retail, and hotels."],
      [47.5020, 19.0344, 0.78, "Castle District", "Historic, scenic, hotel-polished, calmer at night."],
      [47.4844, 19.0528, 0.52, "Gellert / river Buda", "Spa, hotel, hill views, and calmer Buda feel."],
      [47.5136, 19.0490, 0.5, "Pozsonyi / Ujlipotvaros", "Smart residential restaurants and local polish."]
    ],
    posh: [
      [47.5282, 19.0175, 0.92, "Rozsadomb", "Classic wealthy Buda hillside residential area."],
      [47.5070, 18.9910, 0.82, "District XII hills", "Leafy, expensive, quiet, and residential."],
      [47.5020, 19.0344, 0.72, "Castle Hill", "Prestige hotels, history, views, and a slower pace."],
      [47.4924, 19.0188, 0.58, "Naphegy / Krisztinavaros", "Comfortable Buda streets near the center."],
      [47.5136, 19.0490, 0.5, "Ujlipotvaros", "Comfortable local dining and quiet residential blocks."],
      [47.5063, 19.0622, 0.48, "Andrassy Avenue", "Luxury retail and elegant architecture."],
      [47.4716, 19.0320, 0.42, "Sasad / XI", "Leafy Buda residential edge."],
      [47.5435, 18.9637, 0.4, "Huvosvolgy", "Affluent green fringe; not central."],
      [47.5011, 18.9730, 0.44, "Svabhegy", "Quiet hillside comfort, more car/transit planning needed."]
    ]
  },
  stays: [
    {
      id: "district-v",
      name: "District V, Belvaros-Lipotvaros",
      shortName: "District V",
      position: [47.5009, 19.0492],
      radius: 850,
      score: 92,
      modes: { balanced: 95, quiet: 76, nightlife: 74, premium: 91 },
      tags: ["first trip", "walkable", "polished"],
      copy: "The simplest first-stay choice: central, scenic, hotel-rich, and easy to navigate on foot.",
      tip: "Book away from Vaci utca and major tram junctions if sleep matters.",
      metrics: { central: 98, quiet: 64, premium: 88, value: 54 }
    },
    {
      id: "ujlipotvaros",
      name: "Ujlipotvaros / Pozsonyi",
      shortName: "Ujlipotvaros",
      position: [47.5142, 19.0502],
      radius: 760,
      score: 88,
      modes: { balanced: 89, quiet: 91, nightlife: 46, premium: 76 },
      tags: ["quiet", "local", "restaurants"],
      copy: "Calmer, grown-up Pest with cafes, Margaret Island access, and easy trams into the center.",
      tip: "Great for couples, work trips, and anyone who wants Budapest without party-street sleep tax.",
      metrics: { central: 78, quiet: 88, premium: 73, value: 72 }
    },
    {
      id: "castle",
      name: "Castle District / Taban",
      shortName: "Castle / Taban",
      position: [47.5019, 19.0342],
      radius: 700,
      score: 84,
      modes: { balanced: 82, quiet: 90, nightlife: 34, premium: 93 },
      tags: ["views", "historic", "premium"],
      copy: "Elegant and scenic Buda base with quieter nights, landmark views, and a slower rhythm.",
      tip: "Beautiful, but hilly. Check transit or taxi expectations before booking.",
      metrics: { central: 76, quiet: 91, premium: 94, value: 45 }
    },
    {
      id: "andrassy",
      name: "Andrassy / inner Terezvaros",
      shortName: "Andrassy",
      position: [47.5066, 19.0619],
      radius: 780,
      score: 82,
      modes: { balanced: 84, quiet: 65, nightlife: 78, premium: 86 },
      tags: ["culture", "elegant", "central"],
      copy: "Theatre, cafes, museums, and grand-boulevard energy, with nightlife close but avoidable.",
      tip: "Avoid lower-floor rooms directly on Oktogon or Nagymezo if you are noise-sensitive.",
      metrics: { central: 88, quiet: 61, premium: 84, value: 58 }
    },
    {
      id: "bartok",
      name: "Bartok Bela / Gellert, District XI",
      shortName: "Bartok / Gellert",
      position: [47.4809, 19.0524],
      radius: 760,
      score: 81,
      modes: { balanced: 83, quiet: 82, nightlife: 45, premium: 68 },
      tags: ["cafes", "calmer", "value"],
      copy: "A smart Buda-side option: local cafes, the Gellert area, river access, and fewer party crowds.",
      tip: "Best when you want calm but still want quick access to the Danube and metro.",
      metrics: { central: 70, quiet: 84, premium: 68, value: 78 }
    },
    {
      id: "palace",
      name: "Palace Quarter, inner District VIII",
      shortName: "Palace Quarter",
      position: [47.4898, 19.0652],
      radius: 620,
      score: 76,
      modes: { balanced: 78, quiet: 66, nightlife: 63, premium: 52 },
      tags: ["value", "cafes", "central"],
      copy: "Good-value central base around museums and cafes, especially closer to the inner ring.",
      tip: "Stay west/north of the rougher outer VIII edges if this is your first Budapest trip.",
      metrics: { central: 82, quiet: 62, premium: 50, value: 86 }
    },
    {
      id: "jewish-quarter",
      name: "Jewish Quarter edge, District VII",
      shortName: "District VII edge",
      position: [47.4989, 19.0617],
      radius: 690,
      score: 70,
      modes: { balanced: 72, quiet: 34, nightlife: 96, premium: 55 },
      tags: ["nightlife", "food", "lively"],
      copy: "Brilliant if you want bars, food, and late nights. The core is noisy; the edges are easier.",
      tip: "For sleep, avoid Kazinczy, Akacfa, Dob, and Kiraly-facing rooms on weekends.",
      metrics: { central: 90, quiet: 28, premium: 52, value: 70 }
    }
  ],
  sourceNotes: [
    "Recent 2026 accommodation guides consistently recommend District V for first-timers, District VII for nightlife, and XIII/XI/Buda areas for calmer stays.",
    "Nightlife concentration is modeled around District VII ruin-bar streets such as Kazinczy, Akacfa, Dob, Kiraly, and Gozsdu Udvar.",
    "Higher-caution and visible-hardship layers emphasize station edges, underpasses, and mixed outer VIII corridors commonly mentioned in visitor advice."
  ]
};
