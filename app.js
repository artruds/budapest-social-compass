const data = window.BUDAPEST_COMPASS_DATA;

const colors = {
  stay: "#17a673",
  noise: "#bf3a8f",
  caution: "#e25b44",
  hardship: "#8f5a3c",
  fancy: "#2f80ed",
  posh: "#d49b20"
};

const state = {
  mode: "balanced",
  opacity: 0.72,
  selected: data.stays[0].id
};

let map;
let infoWindow;
let placesService;
let clickedLocationMarker;
let StayPin;
let CandidatePin;
let swimFrame;
let swimTimer;
let noiseLensActive = false;
let styleLensActive = false;
let infoOpen = false;
const stayOverlays = [];
const signalOverlays = {};
const noiseLensOverlays = [];
const styleLensOverlays = [];
const candidateVenueMarkers = [];
const socialLayerMarkers = {
  universities: [],
  studentHomes: [],
  studentSpots: []
};
const listingCandidate = {
  id: "city-garden-a-580",
  name: "City Garden A",
  price: "$580",
  position: [47.4856946, 19.0757421],
  address: "Corvin setany, District VIII",
  note: "Weekly price candidate from your screenshot"
};
const styleHotspots = [
  { tier: 1, name: "Andrassy 9-47", position: [47.5035, 19.0599], radius: 520, note: "polished boulevard, Opera, boutiques, dressed-up after-work crowd" },
  { tier: 1, name: "Fashion Street / Vorosmarty", position: [47.4971, 19.0509], radius: 390, note: "dense central fashion/cafe foot traffic" },
  { tier: 1, name: "Liszt Ferenc ter", position: [47.5038, 19.0630], radius: 280, note: "terrace cafes, early evening social square" },
  { tier: 2, name: "Kiraly / Gozsdu", position: [47.4980, 19.0595], radius: 430, note: "younger nightlife-adjacent social flow" },
  { tier: 2, name: "Raday utca", position: [47.4863, 19.0621], radius: 420, note: "student/cafe strip near Corvinus" },
  { tier: 2, name: "Bartok Bela ut", position: [47.4806, 19.0526], radius: 500, note: "Buda design/cafe corridor" },
  { tier: 2, name: "Pozsonyi ut", position: [47.5140, 19.0490], radius: 520, note: "Sunday brunch, polished local professionals" },
  { tier: 3, name: "Margaret Island", position: [47.5274, 19.0466], radius: 760, note: "weekend joggers, picnics, warm-weather strolls" },
  { tier: 3, name: "Varkert Bazar / Castle riverside", position: [47.4940, 19.0431], radius: 360, note: "Sunday riverside strolls and views" },
  { tier: 3, name: "Corvin setany", position: [47.4857, 19.0761], radius: 420, note: "Semmelweis / international med-student corridor" },
  { tier: 3, name: "Rudas rooftop", position: [47.4893, 19.0477], radius: 260, note: "trendy bath rooftop context" },
  { tier: 3, name: "Szechenyi Baths", position: [47.5188, 19.0820], radius: 360, note: "weekend bath crowd" },
  { tier: 3, name: "Semmelweis Medical", position: [47.4826, 19.0800], radius: 430, note: "international medical university flow" },
  { tier: 3, name: "Corvinus / Fovam ter", position: [47.4865, 19.0582], radius: 360, note: "business-school and cafe traffic" },
  { tier: 3, name: "MOME / Zugligeti", position: [47.5156, 18.9895], radius: 420, note: "design-school / artsy student context" },
  { tier: 3, name: "METU / Metropolitan", position: [47.5360, 19.0358], radius: 400, note: "fashion and media student context" }
];
const universityPins = [
  { name: "Semmelweis University", position: [47.4850, 19.0743], note: "medical university core around Üllői / Nagyvárad / Corvin" },
  { name: "Corvinus University", position: [47.4866, 19.0584], note: "business/economics campus by Fővám tér" },
  { name: "ELTE Faculty of Humanities", position: [47.4913, 19.0618], note: "student flow around Múzeum körút / Astoria" },
  { name: "BME", position: [47.4790, 19.0550], note: "technical university on the Buda riverfront" },
  { name: "MOME", position: [47.5155, 18.9897], note: "design/art school on the Buda side" },
  { name: "METU / Budapest Metropolitan", position: [47.5360, 19.0358], note: "media, communication, art and business student context" },
  { name: "NKE / Ludovika", position: [47.4814, 19.0857], note: "public service university around Orczy Garden" },
  { name: "Óbuda University", position: [47.5338, 19.0355], note: "north-Buda student campus cluster" }
];
const studentHomePins = [
  { name: "Dean's Home Budapest", position: [47.4787, 19.0806], note: "private international student residence on Tűzoltó utca" },
  { name: "Semmelweis Rezső Dormitory", position: [47.4795, 19.0914], note: "Semmelweis dormitory around Nagyvárad tér" },
  { name: "BME Martos Dormitory", position: [47.4756, 19.0562], note: "BME dorm near the central campus" },
  { name: "ELTE Kőrösi Csoma Sándor Dormitory", position: [47.4646, 19.0344], note: "large ELTE dormitory cluster in south Buda" },
  { name: "Óbudai Diák Hotel", position: [47.5565, 19.0383], note: "student hostel / accommodation option in Óbuda" },
  { name: "Ludovika Residence Hall", position: [47.4813, 19.0862], note: "NKE student residence around Orczy Garden" },
  { name: "Maverick / central student housing zone", position: [47.4942, 19.0558], note: "central private accommodation / hostel-style student zone" }
];
const studentSpotPins = [
  { name: "Corvinus Café / Pipa utca zone", position: [47.4860, 19.0586], note: "classic Corvinus student pub/cafe area" },
  { name: "Ráday utca cafes", position: [47.4863, 19.0621], note: "student-friendly cafe strip near Corvinus" },
  { name: "The Grund", position: [47.4851, 19.0782], note: "large student-friendly bar/garden near Corvin/Semmelweis; late-night risk for nearby rooms" },
  { name: "Menza / Liszt Ferenc tér", position: [47.5039, 19.0633], note: "terrace/cafe square with young social flow" },
  { name: "Gozsdu Udvar", position: [47.4975, 19.0592], note: "party-adjacent student/visitor evening flow" },
  { name: "Hadik / Bartók Béla", position: [47.4792, 19.0496], note: "Buda student/design cafe corridor" },
  { name: "Kelet Café", position: [47.4797, 19.0509], note: "Bartók Béla cafe/bookish student scene" },
  { name: "Pozsonyi brunch belt", position: [47.5140, 19.0490], note: "polished local/professional brunch and cafe corridor" },
  { name: "Puskin Mozi café", position: [47.4943, 19.0608], note: "cinema/cafe study-adjacent evening spot near Astoria" }
];
const activeLayers = new Set();
const activeSocialLayers = new Set(["universities", "studentHomes", "studentSpots"]);
const trafficHotspots = [
  { position: [47.4971, 19.0705], name: "Blaha Lujza ter junction", weight: 1 },
  { position: [47.5052, 19.0632], name: "Oktogon boulevard junction", weight: 0.9 },
  { position: [47.5109, 19.0579], name: "Nyugati station junction", weight: 0.9 },
  { position: [47.5003, 19.0839], name: "Keleti station frontage", weight: 0.95 },
  { position: [47.4978, 19.0549], name: "Deak Ferenc ter interchange", weight: 0.78 },
  { position: [47.4876, 19.0678], name: "Corvin ring-road junction", weight: 0.72 },
  { position: [47.4810, 19.0664], name: "Boráros ter traffic hub", weight: 0.68 },
  { position: [47.5073, 19.0246], name: "Szell Kalman ter transit hub", weight: 0.65 }
];
const highStreetCorridors = [
  {
    name: "Grand Boulevard / Nagykorut",
    risk: "tram, buses, late traffic, occasional bar spillover",
    path: [
      [47.5110, 19.0580],
      [47.5053, 19.0631],
      [47.4971, 19.0705],
      [47.4876, 19.0678],
      [47.4810, 19.0664]
    ]
  },
  {
    name: "Rákóczi út / Kossuth Lajos utca",
    risk: "major traffic spine and station approach",
    path: [
      [47.4943, 19.0522],
      [47.4971, 19.0705],
      [47.5003, 19.0839]
    ]
  },
  {
    name: "Andrássy / Oktogon",
    risk: "boulevard traffic plus evening venues",
    path: [
      [47.4978, 19.0549],
      [47.5052, 19.0632],
      [47.5148, 19.0770]
    ]
  },
  {
    name: "Jewish Quarter nightlife spine",
    risk: "clubs, bass, pedestrian noise, weekend spillover",
    path: [
      [47.4975, 19.0592],
      [47.4990, 19.0645],
      [47.5010, 19.0630],
      [47.5032, 19.0594]
    ]
  },
  {
    name: "Bajcsy-Zsilinszky / Nyugati edge",
    risk: "boulevard traffic and station movement",
    path: [
      [47.4978, 19.0549],
      [47.5057, 19.0559],
      [47.5109, 19.0579]
    ]
  }
];

function latLng(position) {
  return { lat: position[0], lng: position[1] };
}

function distanceMeters(a, b) {
  const earth = 6371000;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const deltaLat = (b.lat - a.lat) * Math.PI / 180;
  const deltaLng = (b.lng - a.lng) * Math.PI / 180;
  const h = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
  return 2 * earth * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toLocalMeters(point, originLat) {
  return {
    x: point.lng * 111320 * Math.cos(originLat * Math.PI / 180),
    y: point.lat * 110540
  };
}

function distanceToSegmentMeters(point, start, end) {
  const originLat = point.lat;
  const p = toLocalMeters(point, originLat);
  const a = toLocalMeters(start, originLat);
  const b = toLocalMeters(end, originLat);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSq = dx * dx + dy * dy;
  if (!lengthSq) return Math.hypot(p.x - a.x, p.y - a.y);
  const t = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq, 0, 1);
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function distanceToCorridorMeters(point, corridor) {
  let closest = Infinity;
  for (let index = 0; index < corridor.path.length - 1; index += 1) {
    const start = latLng(corridor.path[index]);
    const end = latLng(corridor.path[index + 1]);
    closest = Math.min(closest, distanceToSegmentMeters(point, start, end));
  }
  return closest;
}

function popupHtml(title, copy) {
  return `<div class="popup-title">${title}</div><div class="popup-copy">${copy}</div>`;
}

function noisePopupHtml(title, copy) {
  return `
    <div class="popup-title">${title}</div>
    <div class="popup-copy">${copy}</div>
    <div class="popup-noise-tag">Sleep red flag</div>
  `;
}

function scoreColor(score) {
  if (score >= 82) return "#17a673";
  if (score >= 68) return "#d49b20";
  if (score >= 50) return "#e25b44";
  return "#b42318";
}

function compactList(items, max = 4) {
  const shown = items.slice(0, max).map((item) => item.name || item).filter(Boolean);
  const rest = Math.max(0, items.length - shown.length);
  return rest ? `${shown.join(", ")} +${rest} more` : shown.join(", ");
}

function closesAfter3am(place) {
  const text = place.opening_hours?.weekday_text?.join(" ").toLowerCase() || "";
  if (text.includes("open 24 hours")) return true;
  const closeTimes = [...text.matchAll(/[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/g)];
  return closeTimes.some((match) => {
    let hour = Number(match[1]);
    const suffix = match[3];
    if (suffix === "pm" && hour !== 12) hour += 12;
    if (suffix === "am" && hour === 12) hour = 0;
    return suffix === "am" && hour >= 3 && hour <= 7;
  });
}

function isClubLike(place) {
  const types = place.types || [];
  const name = (place.name || "").toLowerCase();
  if (types.includes("lodging")) return false;
  return types.includes("night_club") || /\bclub\b|disco|karaoke|party|dance/.test(name);
}

function isBarLike(place) {
  const types = place.types || [];
  const name = (place.name || "").toLowerCase();
  if (types.includes("lodging")) return false;
  return types.includes("bar") || /\bbar\b|pub|cocktail|wine|beer|sör|club/.test(name);
}

function markSwimming(duration = 1700) {
  const mapElement = document.getElementById("map");
  mapElement.classList.add("is-swimming");
  clearTimeout(swimTimer);
  swimTimer = setTimeout(() => mapElement.classList.remove("is-swimming"), duration);
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function interpolate(start, end, progress) {
  return start + (end - start) * progress;
}

function swimTo(position, zoom = 14.35, duration = 1850) {
  if (!map) return;
  cancelAnimationFrame(swimFrame);
  markSwimming(duration + 250);

  const startCenter = map.getCenter();
  const start = { lat: startCenter.lat(), lng: startCenter.lng(), zoom: map.getZoom() };
  const target = { lat: position[0], lng: position[1], zoom };
  const started = performance.now();

  function frame(now) {
    const raw = Math.min((now - started) / duration, 1);
    const eased = easeInOutCubic(raw);
    map.setCenter({
      lat: interpolate(start.lat, target.lat, eased),
      lng: interpolate(start.lng, target.lng, eased)
    });
    map.setZoom(interpolate(start.zoom, target.zoom, eased));
    if (raw < 1) {
      swimFrame = requestAnimationFrame(frame);
    }
  }

  swimFrame = requestAnimationFrame(frame);
}

function setOverlayOpacity() {
  Object.values(signalOverlays).flat().forEach((overlay) => {
    const multiplier = overlay.kind === "point" ? 0.2 : 0.42;
    overlay.shape.setOptions({
      fillOpacity: overlay.baseOpacity * state.opacity,
      strokeOpacity: overlay.strokeOpacity * state.opacity * multiplier
    });
  });
}

function clearNoiseLens() {
  noiseLensOverlays.splice(0).forEach((overlay) => overlay.setMap(null));
}

function addNoiseCircle(center, radius, color, title, copy, opacity = 0.2) {
  const circle = new google.maps.Circle({
    map,
    center,
    radius,
    strokeColor: color,
    strokeOpacity: 0.58,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: opacity,
    clickable: true,
    zIndex: 940
  });
  circle.addListener("click", () => {
    infoWindow.setContent(noisePopupHtml(title, copy));
    infoWindow.setPosition(center);
    infoWindow.open(map);
  });
  noiseLensOverlays.push(circle);
}

function addNoiseLens() {
  clearNoiseLens();

  highStreetCorridors.forEach((corridor) => {
    const path = corridor.path.map(latLng);
    const polyline = new google.maps.Polyline({
      map,
      path,
      strokeColor: "#b42318",
      strokeOpacity: 0.64,
      strokeWeight: 14,
      clickable: true,
      zIndex: 930
    });
    polyline.addListener("click", (event) => {
      infoWindow.setContent(noisePopupHtml(corridor.name, `Within roughly 15m of this corridor is a sleep-risk zone: ${corridor.risk}.`));
      infoWindow.setPosition(event.latLng);
      infoWindow.open(map);
    });
    noiseLensOverlays.push(polyline);

    corridor.path.forEach((point) => {
      addNoiseCircle(latLng(point), 65, "#b42318", corridor.name, `Road frontage and corner exposure: ${corridor.risk}.`, 0.1);
    });
  });

  trafficHotspots.forEach((hotspot) => {
    const radius = 30 + hotspot.weight * 55;
    addNoiseCircle(
      latLng(hotspot.position),
      radius,
      "#f97316",
      hotspot.name,
      `Within roughly ${Math.round(radius)}m of this crossing or station edge is a red flag for traffic, tram, taxi, or pedestrian noise.`,
      0.24
    );
  });

  data.heat.noise
    .filter(([, , intensity]) => intensity >= 0.52)
    .forEach(([lat, lng, intensity, title, copy]) => {
      addNoiseCircle(
        { lat, lng },
        120 + intensity * 190,
        intensity >= 0.8 ? "#a21caf" : "#c026d3",
        title,
        `${copy} Avoid street-facing rooms here if sleep matters.`,
        0.16 + intensity * 0.07
      );
    });
}

async function addPlacesNoiseLens() {
  if (!placesService || !google.maps.places) return;
  const searchCenters = [
    { name: "Jewish Quarter", position: [47.4990, 19.0645], radius: 520 },
    { name: "Gozsdu / Dob", position: [47.4975, 19.0592], radius: 430 },
    { name: "Oktogon / Nagymezo", position: [47.5052, 19.0632], radius: 420 },
    { name: "Nyugati", position: [47.5109, 19.0579], radius: 360 },
    { name: "Keleti", position: [47.5003, 19.0839], radius: 380 }
  ];
  const seen = new Set();
  const searches = await Promise.all(searchCenters.flatMap((center) => [
    nearbySearch(new google.maps.LatLng(center.position[0], center.position[1]), "bar", center.radius),
    nearbySearch(new google.maps.LatLng(center.position[0], center.position[1]), "night_club", center.radius)
  ]));

  searches
    .flatMap((result) => result.results || [])
    .filter((place) => place.geometry?.location && !seen.has(place.place_id) && seen.add(place.place_id))
    .slice(0, 34)
    .forEach((place) => {
      const position = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      const types = place.types || [];
      const isClub = types.includes("night_club");
      addNoiseCircle(
        position,
        isClub ? 95 : 70,
        isClub ? "#7e22ce" : "#db2777",
        place.name || "Nightlife venue",
        isClub ? "Google Places marks this as a nightclub or club-like venue. Treat nearby street-facing rooms as high risk." : "Google Places marks this as a bar. This is a mild warning unless it is directly below the room or part of a dense cluster.",
        isClub ? 0.25 : 0.08
      );
    });
}

function showNoiseLensSummary(statusText) {
  const sheet = document.getElementById("detailSheet");
  document.getElementById("sheetKicker").textContent = noiseLensActive ? "Noise lens active" : "Noise lens off";
  document.getElementById("sheetTitle").textContent = noiseLensActive ? "Most noisy sleep-risk areas" : "Noise lens hidden";
  document.getElementById("sheetCopy").textContent = noiseLensActive
    ? "Red corridors mark major high streets, orange circles mark crossroads, traffic-light and station edges, and purple halos emphasize clubs and late-night spillover. Ordinary bars are treated as a softer signal."
    : "Click Show noise again whenever you want the red-flag overlay.";
  document.getElementById("sheetMetrics").innerHTML = [
    detailMetricBlock("High streets", noiseLensActive ? 18 : 0, "#b42318"),
    detailMetricBlock("Crossroads", noiseLensActive ? 24 : 0, "#f97316"),
    detailMetricBlock("Nightlife", noiseLensActive ? 32 : 0, colors.noise),
    detailMetricBlock("Sleep risk", noiseLensActive ? 78 : 0, "#b42318")
  ].join("");
  document.getElementById("sheetTip").textContent = statusText;
  sheet.classList.add("open");
}

function clearStyleLens() {
  styleLensOverlays.splice(0).forEach((overlay) => overlay.setMap(null));
}

function styleColor(tier) {
  if (tier === 1) return "#e11d48";
  if (tier === 2) return "#f97316";
  return "#facc15";
}

function addStyleLens() {
  clearStyleLens();
  styleHotspots.forEach((spot) => {
    const outerCircle = new google.maps.Circle({
      map,
      center: latLng(spot.position),
      radius: spot.radius,
      strokeColor: styleColor(spot.tier),
      strokeOpacity: 0.62,
      strokeWeight: 2,
      fillColor: styleColor(spot.tier),
      fillOpacity: spot.tier === 1 ? 0.34 : spot.tier === 2 ? 0.28 : 0.22,
      clickable: true,
      zIndex: 760
    });
    const innerCircle = new google.maps.Circle({
      map,
      center: latLng(spot.position),
      radius: spot.radius * 0.38,
      strokeColor: styleColor(spot.tier),
      strokeOpacity: 0,
      strokeWeight: 0,
      fillColor: styleColor(spot.tier),
      fillOpacity: spot.tier === 1 ? 0.48 : spot.tier === 2 ? 0.38 : 0.3,
      clickable: true,
      zIndex: 761
    });
    const openPopup = () => {
      infoWindow.setContent(`
        <div class="popup-title">${spot.name}</div>
        <div class="popup-copy">Tier ${spot.tier} style/social scene: ${spot.note}.</div>
      `);
      infoWindow.setPosition(latLng(spot.position));
      infoWindow.open(map);
    };
    outerCircle.addListener("click", openPopup);
    innerCircle.addListener("click", openPopup);
    styleLensOverlays.push(outerCircle, innerCircle);
  });
}

function showStyleLensSummary() {
  const sheet = document.getElementById("detailSheet");
  document.getElementById("sheetKicker").textContent = styleLensActive ? "Beauty heat active" : "Beauty heat off";
  document.getElementById("sheetTitle").textContent = styleLensActive ? "Beauty / social-scene heat map" : "Beauty heat hidden";
  document.getElementById("sheetCopy").textContent = styleLensActive
    ? "This reframes the pasted list as stylish/social foot-traffic zones, not a score of individual people. Red is strongest, orange is very active, yellow is contextual."
    : "Style/social heat is hidden.";
  document.getElementById("sheetMetrics").innerHTML = [
    detailMetricBlock("Tier 1", styleLensActive ? 92 : 0, "#e11d48"),
    detailMetricBlock("Tier 2", styleLensActive ? 78 : 0, "#f97316"),
    detailMetricBlock("Tier 3", styleLensActive ? 58 : 0, "#eab308"),
    detailMetricBlock("Corvin", styleLensActive ? 62 : 0, colors.stay)
  ].join("");
  document.getElementById("sheetTip").textContent = styleLensActive
    ? "Your $580 Corvin spot is not isolated: it sits inside the Corvin/Semmelweis Tier 3 zone and is a quick jump to Raday, Andrassy, Gozsdu, and Fashion Street."
    : "Click Beauty heat whenever you want this layer back.";
  sheet.classList.add("open");
}

function clearStayOverlays() {
  stayOverlays.splice(0).forEach((overlay) => {
    if (overlay.setMap) overlay.setMap(null);
    if (overlay.shape) overlay.shape.setMap(null);
    if (overlay.pin) overlay.pin.setMap(null);
  });
}

function drawStays() {
  clearStayOverlays();
  data.stays.forEach((area) => {
    const modeScore = area.modes[state.mode];
    const active = area.id === state.selected;
    const circle = new google.maps.Circle({
      map: activeLayers.has("stay") ? map : null,
      center: latLng(area.position),
      radius: area.radius,
      strokeColor: colors.stay,
      strokeOpacity: active ? 0.72 : 0.26,
      strokeWeight: active ? 3 : 2,
      fillColor: colors.stay,
      fillOpacity: active ? 0.16 : 0.075,
      clickable: true
    });

    circle.addListener("click", (event) => scoreClickedLocation(event.latLng));

    const pin = new StayPin(area, modeScore);
    pin.setMap(activeLayers.has("stay") ? map : null);
    stayOverlays.push({ shape: circle, pin });
  });
}

function signalRadius(key, intensity) {
  const base = key === "fancy" || key === "posh" ? 610 : 520;
  return base + intensity * (key === "noise" ? 520 : 430);
}

function addSignalLayers() {
  Object.entries(data.heat).forEach(([key, points]) => {
    signalOverlays[key] = points.map(([lat, lng, intensity, title, copy]) => {
      const fillOpacity = key === "noise" || key === "caution" ? 0.16 : 0.13;
      const shape = new google.maps.Circle({
        map: activeLayers.has(key) ? map : null,
        center: { lat, lng },
        radius: signalRadius(key, intensity),
        strokeColor: colors[key],
        strokeOpacity: 0.24,
        strokeWeight: 1,
        fillColor: colors[key],
        fillOpacity: fillOpacity * intensity,
        clickable: true
      });

      shape.addListener("click", (event) => {
        scoreClickedLocation(event.latLng);
      });

      return {
        kind: "signal",
        key,
        shape,
        baseOpacity: fillOpacity * intensity,
        strokeOpacity: 0.24
      };
    });
  });
  setOverlayOpacity();
}

function modeSortedAreas() {
  return [...data.stays].sort((a, b) => b.modes[state.mode] - a.modes[state.mode]);
}

function renderAreaList() {
  const list = document.getElementById("areaList");
  list.innerHTML = "";

  modeSortedAreas().forEach((area) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `area-card${area.id === state.selected ? " active" : ""}`;
    button.innerHTML = `
      <div class="card-meta">
        <span class="mini-chip">${area.modes[state.mode]} fit</span>
        ${area.tags.map((tag) => `<span class="mini-chip">${tag}</span>`).join("")}
      </div>
      <h3>${area.name}</h3>
      <p>${area.copy}</p>
    `;
    button.addEventListener("click", () => selectArea(area.id, true));
    list.appendChild(button);
  });
}

function setBestFit() {
  const best = modeSortedAreas()[0];
  const score = best.modes[state.mode];
  const ring = document.getElementById("scoreRing");
  ring.textContent = score;
  ring.style.setProperty("--score", score);
  document.getElementById("bestFitTitle").textContent = best.name;
  document.getElementById("bestFitCopy").textContent = best.copy;
}

function metricBlock(label, value, color = colors.stay) {
  return `
    <div class="metric">
      <strong>${label}</strong>
      <div class="meter"><span style="width:${value}%;background:${color}"></span></div>
    </div>
  `;
}

function detailMetricBlock(label, value, color = colors.stay) {
  return metricBlock(label, clamp(Math.round(value), 0, 100), color);
}

function showSheet(area) {
  const sheet = document.getElementById("detailSheet");
  document.getElementById("sheetKicker").textContent = `${area.modes[state.mode]} ${state.mode} fit`;
  document.getElementById("sheetTitle").textContent = area.name;
  document.getElementById("sheetCopy").textContent = area.copy;
  document.getElementById("sheetTip").textContent = area.tip;
  document.getElementById("sheetMetrics").innerHTML = [
    metricBlock("Central", area.metrics.central),
    metricBlock("Quiet", area.metrics.quiet, "#2f80ed"),
    metricBlock("Premium", area.metrics.premium, "#d49b20"),
    metricBlock("Value", area.metrics.value, "#6c8f3d")
  ].join("");
  sheet.classList.add("open");
}

function showLocationLoading(position) {
  const sheet = document.getElementById("detailSheet");
  document.getElementById("sheetKicker").textContent = "Sleep score";
  document.getElementById("sheetTitle").textContent = "Checking this spot...";
  document.getElementById("sheetCopy").textContent = `${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}`;
  document.getElementById("sheetMetrics").innerHTML = [
    detailMetricBlock("Noise", 0, colors.noise),
    detailMetricBlock("Nightlife", 0, colors.caution),
    detailMetricBlock("Traffic", 0, "#d49b20"),
    detailMetricBlock("Sleep fit", 0, colors.stay)
  ].join("");
  document.getElementById("sheetTip").textContent = "Looking especially for nightclubs, club-like venues, station edges, and known loud corridors. Ordinary bars are a lighter signal.";
  sheet.classList.add("open");
}

function showLocationScore(result) {
  const score = Math.round(result.score);
  const riskText = result.redFlags.length
    ? result.redFlags.join(" ")
    : "No obvious sleep red flags from the available map signals.";
  document.getElementById("sheetKicker").textContent = `${score} sleep score`;
  document.getElementById("sheetTitle").textContent = result.label;
  document.getElementById("sheetCopy").textContent = riskText;
  document.getElementById("sheetMetrics").innerHTML = [
    detailMetricBlock("Sleep fit", score, scoreColor(score)),
    detailMetricBlock("Noise", 100 - result.penalties.noise, colors.noise),
    detailMetricBlock("Nightlife", 100 - result.penalties.nightlife, colors.caution),
    detailMetricBlock("Traffic", 100 - result.penalties.traffic, "#d49b20")
  ].join("");
  document.getElementById("sheetTip").textContent = result.tip;
  document.getElementById("detailSheet").classList.add("open");
}

function showCandidateLoading() {
  showLocationLoading(latLng(listingCandidate.position));
  document.getElementById("sheetKicker").textContent = `${listingCandidate.price} candidate`;
  document.getElementById("sheetTitle").textContent = listingCandidate.name;
  document.getElementById("sheetCopy").textContent = `${listingCandidate.address}. Checking exact-location sleep fit now.`;
}

function localSignalPenalty(position) {
  let noise = 0;
  let strongestNoise = null;
  data.heat.noise.forEach(([lat, lng, intensity, title]) => {
    const distance = distanceMeters(position, { lat, lng });
    const radius = 260 + intensity * 280;
    const influence = intensity * Math.exp(-((distance / radius) ** 2));
    const penalty = influence * 16;
    noise += penalty;
    if (!strongestNoise || penalty > strongestNoise.penalty) strongestNoise = { title, penalty, distance };
  });

  let traffic = 0;
  let strongestTraffic = null;
  trafficHotspots.forEach((hotspot) => {
    const target = latLng(hotspot.position);
    const distance = distanceMeters(position, target);
    const influence = hotspot.weight * Math.exp(-((distance / 145) ** 2));
    const penalty = influence * 11;
    traffic += penalty;
    if (!strongestTraffic || penalty > strongestTraffic.penalty) {
      strongestTraffic = { title: hotspot.name, penalty, distance };
    }
  });

  let road = 0;
  let strongestRoad = null;
  highStreetCorridors.forEach((corridor) => {
    const distance = distanceToCorridorMeters(position, corridor);
    const influence = Math.exp(-((distance / 42) ** 2));
    const penalty = influence * 13;
    road += penalty;
    if (!strongestRoad || penalty > strongestRoad.penalty) {
      strongestRoad = { title: corridor.name, penalty, distance };
    }
  });

  return {
    noise: clamp(noise, 0, 24),
    traffic: clamp(traffic + road, 0, 24),
    strongestNoise,
    strongestTraffic,
    strongestRoad
  };
}

function nearbySearch(location, type, radius) {
  return new Promise((resolve) => {
    if (!placesService || !google.maps.places) {
      resolve({ status: "UNAVAILABLE", results: [] });
      return;
    }

    placesService.nearbySearch({ location, radius, type }, (results, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK ||
        status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
      ) {
        resolve({ status, results: results || [] });
        return;
      }
      resolve({ status, results: [] });
    });
  });
}

function placeDetails(place) {
  return new Promise((resolve) => {
    if (!placesService || !place.place_id) {
      resolve(place);
      return;
    }

    placesService.getDetails({
      placeId: place.place_id,
      fields: ["name", "place_id", "types", "geometry", "opening_hours", "formatted_address", "url"]
    }, (details, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && details) {
        resolve({ ...place, ...details });
        return;
      }
      resolve(place);
    });
  });
}

async function detailedPlaces(places, limit = 12) {
  const unique = [];
  const seen = new Set();
  places.forEach((place) => {
    if (place.place_id && !seen.has(place.place_id)) {
      seen.add(place.place_id);
      unique.push(place);
    }
  });
  return Promise.all(unique.slice(0, limit).map(placeDetails));
}

async function placesNoisePenalty(position) {
  const location = new google.maps.LatLng(position.lat, position.lng);
  const [barsFrontage, barsNear, barsWide, clubsNear, transitNear] = await Promise.all([
    nearbySearch(location, "bar", 75),
    nearbySearch(location, "bar", 170),
    nearbySearch(location, "bar", 300),
    nearbySearch(location, "night_club", 330),
    nearbySearch(location, "transit_station", 130)
  ]);

  const frontageBars = barsFrontage.results.length;
  const nearBars = barsNear.results.length;
  const wideBars = barsWide.results.length;
  const transit = transitNear.results.length;
  const clubDetails = await detailedPlaces(clubsNear.results, 10);
  const barDetails = await detailedPlaces([...barsFrontage.results, ...barsNear.results], 12);
  const clubLike = clubDetails.filter(isClubLike);
  const lateBars = barDetails.filter((place) => !isClubLike(place) && isBarLike(place) && closesAfter3am(place));
  const clubs = clubLike.length;
  const nightlife = clamp(frontageBars * 0.8 + nearBars * 0.25 + wideBars * 0.06 + clubs * 11.5 + lateBars.length * 4.5, 0, 42);
  const traffic = clamp(transit * 2.6, 0, 9);

  return {
    nightlife,
    traffic,
    counts: { frontageBars, nearBars, wideBars, clubs, lateBars: lateBars.length, transit },
    clubLike,
    lateBars,
    samples: [...clubLike, ...lateBars].slice(0, 4).map((place) => place.name).filter(Boolean),
    status: [barsFrontage.status, barsNear.status, barsWide.status, clubsNear.status, transitNear.status].find((item) => item !== google.maps.places.PlacesServiceStatus.OK && item !== google.maps.places.PlacesServiceStatus.ZERO_RESULTS) || "OK"
  };
}

function setClickedLocationMarker(position, score) {
  if (!clickedLocationMarker) {
    clickedLocationMarker = new google.maps.Marker({
      map,
      clickable: false,
      zIndex: 999,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: scoreColor(score),
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 3
      }
    });
  }

  clickedLocationMarker.setPosition(position);
  clickedLocationMarker.setIcon({
    path: google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillColor: scoreColor(score),
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 3
  });
}

function clearCandidateVenueMarkers() {
  candidateVenueMarkers.splice(0).forEach((marker) => marker.setMap(null));
}

function venueMarkerIcon(kind) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: kind === "club" ? 9 : 7,
    fillColor: kind === "club" ? "#7e22ce" : "#db2777",
    fillOpacity: 0.94,
    strokeColor: "#ffffff",
    strokeWeight: 2
  };
}

function addCandidateVenueMarkers(places) {
  clearCandidateVenueMarkers();
  const venues = [
    ...places.clubLike.map((place) => ({ place, kind: "club" })),
    ...places.lateBars.map((place) => ({ place, kind: "late-bar" }))
  ];

  venues.forEach(({ place, kind }) => {
    const location = place.geometry?.location;
    if (!location) return;
    const marker = new google.maps.Marker({
      map,
      position: { lat: location.lat(), lng: location.lng() },
      title: place.name,
      zIndex: 1001,
      label: {
        text: kind === "club" ? "CLUB" : "3AM",
        color: "#ffffff",
        fontSize: "10px",
        fontWeight: "900"
      },
      icon: venueMarkerIcon(kind)
    });
    marker.addListener("click", () => {
      const hours = place.opening_hours?.weekday_text?.join("<br>") || "Opening hours not available from Google Places.";
      infoWindow.setContent(`
        <div class="popup-title">${place.name}</div>
        <div class="popup-copy">${kind === "club" ? "Club-like / nightclub result" : "Bar that appears open past 3am"}</div>
        <div class="popup-copy">${hours}</div>
      `);
      infoWindow.open({ map, anchor: marker });
    });
    candidateVenueMarkers.push(marker);
  });
}

function markerIcon(color, scale = 8) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale,
    fillColor: color,
    fillOpacity: 0.96,
    strokeColor: "#ffffff",
    strokeWeight: 2
  };
}

function addSocialMarkers(layerName, pins, color, label) {
  socialLayerMarkers[layerName].forEach((marker) => marker.setMap(null));
  socialLayerMarkers[layerName] = pins.map((pin) => {
    const marker = new google.maps.Marker({
      map: activeSocialLayers.has(layerName) ? map : null,
      position: latLng(pin.position),
      title: pin.name,
      icon: markerIcon(color),
      label: {
        text: label,
        color: "#ffffff",
        fontSize: "10px",
        fontWeight: "900"
      },
      zIndex: 910
    });
    marker.addListener("click", () => {
      infoWindow.setContent(`
        <div class="popup-title">${pin.name}</div>
        <div class="popup-copy">${pin.note}</div>
      `);
      infoWindow.open({ map, anchor: marker });
    });
    return marker;
  });
}

function addSocialLayers() {
  addSocialMarkers("universities", universityPins, "#2563eb", "UNI");
  addSocialMarkers("studentHomes", studentHomePins, "#0891b2", "STAY");
  addSocialMarkers("studentSpots", studentSpotPins, "#16a34a", "SPOT");
}

function setSocialLayer(layerName, visible) {
  if (visible) activeSocialLayers.add(layerName);
  else activeSocialLayers.delete(layerName);
  socialLayerMarkers[layerName]?.forEach((marker) => marker.setMap(visible ? map : null));
  syncSocialButtons(layerName, visible);
}

function syncSocialButtons(layerName, visible) {
  document.querySelectorAll(`[data-social-layer="${layerName}"]`).forEach((button) => {
    button.setAttribute("aria-pressed", String(visible));
    button.classList.toggle("inactive", !visible);
  });
}

async function scoreClickedLocation(latLngValue) {
  const position = { lat: latLngValue.lat(), lng: latLngValue.lng() };
  showLocationLoading(position);
  setClickedLocationMarker(position, 55);

  const local = localSignalPenalty(position);
  const places = await placesNoisePenalty(position);
  addCandidateVenueMarkers(places);
  const penalties = {
    noise: clamp(local.noise, 0, 30),
    nightlife: clamp(places.nightlife, 0, 38),
    traffic: clamp(local.traffic + places.traffic, 0, 28)
  };
  const totalPenalty = penalties.noise + penalties.nightlife + penalties.traffic;
  const score = clamp(100 - totalPenalty, 18, 98);
  const redFlags = [];

  if (places.counts.clubs > 0) redFlags.push(`Club-like venues nearby: ${compactList(places.clubLike)}.`);
  if (places.counts.lateBars > 0) redFlags.push(`Bars that appear open past 3am: ${compactList(places.lateBars)}.`);
  if (places.counts.frontageBars >= 3 && places.counts.clubs === 0 && places.counts.lateBars === 0) redFlags.push(`${places.counts.frontageBars} ordinary bar results directly nearby, so check for street-facing noise.`);
  else if (places.counts.clubs === 0 && places.counts.nearBars >= 8) redFlags.push(`${places.counts.nearBars} bars within roughly 170m.`);
  else if (places.counts.clubs === 0 && places.counts.wideBars >= 18) redFlags.push(`${places.counts.wideBars} bars within roughly 300m.`);
  if (local.strongestNoise?.penalty > 5) redFlags.push(`Close to the ${local.strongestNoise.title} nightlife/noise corridor.`);
  if (local.strongestRoad?.penalty > 5) redFlags.push(`Within about ${Math.round(local.strongestRoad.distance)}m of ${local.strongestRoad.title}.`);
  if (local.strongestTraffic?.penalty > 5 || places.counts.transit >= 2) redFlags.push("Likely traffic or transit-edge noise.");
  if (places.samples.length) redFlags.push(`Late-night sample: ${places.samples.join(", ")}.`);
  if (places.status !== "OK") redFlags.push("Google Places returned limited data, so this score leans more on local map signals.");

  let tip = "Looks sleep-friendly by the available signals. Still check whether the exact room faces a main road, tram line, courtyard bar, or hotel service entrance.";
  if (places.counts.clubs > 0 && score < 68) tip = "Nightclub red flag: bass, queues, taxis, and late spillover can matter more than ordinary bar noise. Prefer another block or a rear-facing high floor.";
  else if (score < 50) tip = "Red flag for sleep: pick a rear-facing room, higher floor, or choose a different block.";
  else if (score < 68) tip = "Mixed sleep outlook: probably manageable with the right room, but avoid street-facing windows.";
  else if (score < 82) tip = "Decent, but check the exact building frontage and weekend nightlife before booking.";

  setClickedLocationMarker(position, score);
  showLocationScore({
    label: "Clicked map location",
    score,
    penalties,
    redFlags,
    tip
  });
}

async function scoreCandidateLocation() {
  const position = latLng(listingCandidate.position);
  showCandidateLoading();
  setClickedLocationMarker(position, 55);
  await scoreClickedLocation({
    lat: () => position.lat,
    lng: () => position.lng
  });
  document.getElementById("sheetTitle").textContent = `${listingCandidate.name} · ${listingCandidate.price}/week`;
  const currentCopy = document.getElementById("sheetCopy").textContent;
  document.getElementById("sheetCopy").textContent = currentCopy === "No obvious sleep red flags from the available map signals."
    ? `${listingCandidate.address}. No obvious sleep red flags from the available map signals.`
    : `${listingCandidate.address}. ${currentCopy}`;
}

function selectArea(id, fly) {
  const area = data.stays.find((item) => item.id === id);
  if (!area) return;
  state.selected = id;
  drawStays();
  renderAreaList();
  showSheet(area);
  if (fly) swimTo(area.position, 14.35, 1850);
}

function setLayerMap(layerName, visible) {
  if (layerName === "stay") {
    stayOverlays.forEach((overlay) => {
      overlay.shape.setMap(visible ? map : null);
      overlay.pin.setMap(visible ? map : null);
    });
    return;
  }

  signalOverlays[layerName]?.forEach((overlay) => overlay.shape.setMap(visible ? map : null));
}

function applyLayerVisibility(layerName, visible) {
  if (visible) activeLayers.add(layerName);
  else activeLayers.delete(layerName);
  setLayerMap(layerName, visible);
  syncLayerControls(layerName, visible);
}

function syncLayerControls(layerName, visible) {
  document.querySelectorAll(`[data-layer="${layerName}"]`).forEach((input) => {
    input.checked = visible;
  });
  document.querySelectorAll(`[data-map-layer="${layerName}"]`).forEach((button) => {
    button.setAttribute("aria-pressed", String(visible));
    button.classList.toggle("inactive", !visible);
  });
}

function showSleepScoreHint() {
  const sheet = document.getElementById("detailSheet");
  document.getElementById("sheetKicker").textContent = "Sleep score mode";
  document.getElementById("sheetTitle").textContent = "Click any exact building or corner";
  document.getElementById("sheetCopy").textContent = "The app will rate that point using club-like venues, late bars, transit edges, traffic corridors, and the local noise layer. Restaurants do not count as sleep risk.";
  document.getElementById("sheetMetrics").innerHTML = [
    detailMetricBlock("Clubs", 92, colors.noise),
    detailMetricBlock("Late bars", 58, colors.caution),
    detailMetricBlock("Traffic", 72, "#d49b20"),
    detailMetricBlock("Restaurants", 8, colors.stay)
  ].join("");
  document.getElementById("sheetTip").textContent = "Click the $580 pin, a hotel, or any side street. A rear-facing room can score very differently from the same block on a boulevard.";
  sheet.classList.add("open");
}

async function toggleNoiseLens() {
  noiseLensActive = !noiseLensActive;
  const button = document.getElementById("showNoiseButton");
  button.setAttribute("aria-pressed", String(noiseLensActive));
  button.classList.toggle("active", noiseLensActive);

  if (!noiseLensActive) {
    clearNoiseLens();
    button.querySelector("span:last-child").textContent = "Show noise";
    showNoiseLensSummary("Noise lens is hidden. Your existing base layers are still available.");
    return;
  }

  button.disabled = true;
  button.querySelector("span:last-child").textContent = "Loading noise...";
  addNoiseLens();
  showNoiseLensSummary("Loading Google Places nightclubs first, with bars as a softer supporting signal...");

  try {
    await addPlacesNoiseLens();
    showNoiseLensSummary("Avoid red corridors, orange junction circles, and especially purple nightclub halos if sleep matters. Ordinary bars are a softer signal unless they are dense or directly below the room.");
    swimTo([47.4991, 19.0648], 14.05, 1450);
  } finally {
    button.disabled = false;
    button.querySelector("span:last-child").textContent = "Hide noise";
  }
}

function toggleStyleLens() {
  styleLensActive = !styleLensActive;
  syncStyleButtons();

  if (styleLensActive) {
    addStyleLens();
    showStyleLensSummary();
    swimTo([47.4978, 19.0578], 13.25, 1300);
    return;
  }

  clearStyleLens();
  showStyleLensSummary();
}

function syncStyleButtons() {
  [
    { id: "showStyleButton", on: "Hide beauty", off: "Beauty heat" },
    { id: "showBeautyMapButton", on: "Hide beauty", off: "Beauty heat" }
  ].forEach(({ id, on, off }) => {
    const button = document.getElementById(id);
    if (!button) return;
    button.setAttribute("aria-pressed", String(styleLensActive));
    button.classList.toggle("active", styleLensActive);
    const label = button.querySelector("span:last-child");
    if (label) label.textContent = styleLensActive ? on : off;
  });
}

function setInfoOpen(open) {
  infoOpen = open;
  const shell = document.getElementById("appShell");
  const button = document.getElementById("moreInfoButton");
  shell.classList.toggle("info-open", infoOpen);
  button.setAttribute("aria-pressed", String(infoOpen));
  button.classList.toggle("active", infoOpen);
  button.querySelector("span:last-child").textContent = infoOpen ? "Hide info" : "More info";
}

function wireControls() {
  document.getElementById("moreInfoButton").addEventListener("click", () => setInfoOpen(!infoOpen));
  document.getElementById("showNoiseButton").addEventListener("click", toggleNoiseLens);
  document.getElementById("showStyleButton").addEventListener("click", toggleStyleLens);
  document.getElementById("showBeautyMapButton").addEventListener("click", toggleStyleLens);
  document.getElementById("sleepScoreHintButton").addEventListener("click", showSleepScoreHint);

  document.querySelectorAll("[data-social-layer]").forEach((button) => {
    button.addEventListener("click", () => {
      const layerName = button.dataset.socialLayer;
      setSocialLayer(layerName, !activeSocialLayers.has(layerName));
    });
  });

  document.querySelectorAll("[data-map-layer]").forEach((button) => {
    button.addEventListener("click", () => {
      const layerName = button.dataset.mapLayer;
      applyLayerVisibility(layerName, !activeLayers.has(layerName));
    });
  });

  document.querySelectorAll("[data-layer]").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      applyLayerVisibility(event.target.dataset.layer, event.target.checked);
    });
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      document.querySelectorAll("[data-mode]").forEach((item) => item.classList.toggle("active", item === button));
      setBestFit();
      drawStays();
      renderAreaList();
      selectArea(modeSortedAreas()[0].id, true);
    });
  });

  document.getElementById("opacityRange").addEventListener("input", (event) => {
    const percent = Number(event.target.value);
    state.opacity = percent / 100;
    document.getElementById("opacityValue").textContent = `${percent}%`;
    setOverlayOpacity();
  });

  document.getElementById("resetView").addEventListener("click", () => {
    swimTo(data.center, 13, 2050);
  });

  document.getElementById("sheetClose").addEventListener("click", () => {
    document.getElementById("detailSheet").classList.remove("open");
  });

  document.getElementById("infoButton").addEventListener("click", () => {
    document.getElementById("methodDialog").showModal();
  });
}

window.initMap = function initMap() {
  StayPin = class extends google.maps.OverlayView {
    constructor(area, score) {
      super();
      this.area = area;
      this.score = score;
      this.position = latLng(area.position);
      this.div = null;
    }

    onAdd() {
      this.div = document.createElement("button");
      this.div.type = "button";
      this.div.className = "stay-marker google-stay-marker";
      this.div.setAttribute("aria-label", `${this.area.name}, ${this.score} fit`);
      this.div.innerHTML = `<span>${this.score}</span>`;
      this.div.addEventListener("click", () => {
        selectArea(this.area.id, false);
        infoWindow.setContent(popupHtml(this.area.name, this.area.copy));
        infoWindow.setPosition(this.position);
        infoWindow.open(map);
      });
      this.getPanes().overlayMouseTarget.appendChild(this.div);
    }

    draw() {
      if (!this.div) return;
      const projection = this.getProjection();
      const point = projection.fromLatLngToDivPixel(this.position);
      this.div.style.transform = `translate(${point.x - 18}px, ${point.y - 38}px)`;
    }

    onRemove() {
      this.div?.remove();
      this.div = null;
    }
  };

  CandidatePin = class extends google.maps.OverlayView {
    constructor(candidate) {
      super();
      this.candidate = candidate;
      this.position = latLng(candidate.position);
      this.div = null;
    }

    onAdd() {
      this.div = document.createElement("button");
      this.div.type = "button";
      this.div.className = "candidate-price-pin";
      this.div.setAttribute("aria-label", `${this.candidate.name}, ${this.candidate.price} per week`);
      this.div.innerHTML = `<span>${this.candidate.price}</span>`;
      this.div.addEventListener("click", () => {
        scoreCandidateLocation();
        swimTo(this.candidate.position, 15.4, 1350);
      });
      this.getPanes().overlayMouseTarget.appendChild(this.div);
    }

    draw() {
      if (!this.div) return;
      const projection = this.getProjection();
      const point = projection.fromLatLngToDivPixel(this.position);
      this.div.style.transform = `translate(${point.x - 34}px, ${point.y - 46}px)`;
    }

    onRemove() {
      this.div?.remove();
      this.div = null;
    }
  };

  map = new google.maps.Map(document.getElementById("map"), {
    center: latLng(data.center),
    zoom: 13,
    minZoom: 11,
    maxZoom: 18,
    mapTypeId: "roadmap",
    gestureHandling: "greedy",
    clickableIcons: true,
    keyboardShortcuts: true,
    isFractionalZoomEnabled: true,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    rotateControl: false,
    scaleControl: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    styles: [
      { featureType: "poi.business", stylers: [{ visibility: "off" }] },
      { featureType: "poi.medical", stylers: [{ visibility: "off" }] },
      { featureType: "poi.school", stylers: [{ visibility: "off" }] },
      { featureType: "transit.station", stylers: [{ visibility: "on" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ saturation: -12 }, { lightness: 10 }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#a9d5ee" }] },
      { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f6f4ee" }] }
    ]
  });

  infoWindow = new google.maps.InfoWindow({ maxWidth: 280 });
  placesService = new google.maps.places.PlacesService(map);
  window.scoreClickedLocation = scoreClickedLocation;
  addSignalLayers();
  drawStays();
  addSocialLayers();
  renderAreaList();
  setBestFit();
  wireControls();
  ["stay", "noise", "caution", "hardship", "fancy", "posh"].forEach((layer) => syncLayerControls(layer, false));
  setInfoOpen(false);
  styleLensActive = true;
  addStyleLens();
  syncStyleButtons();
  map.addListener("click", (event) => {
    if (event.placeId) event.stop();
    if (!infoOpen) return;
    scoreClickedLocation(event.latLng);
  });
};
