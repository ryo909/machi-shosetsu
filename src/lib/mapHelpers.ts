import type { Spot } from "../data/types";

export type MapPoint = { x: number; y: number };

export type MapAnchor = {
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
};

type MapRegionKey =
  | "hokkaido"
  | "tohoku"
  | "kanto"
  | "chubu"
  | "kansai"
  | "chugokuShikoku"
  | "kyushu"
  | "okinawa";

type RegionCalibration = {
  bounds: {
    latMin: number;
    latMax: number;
    lngMin: number;
    lngMax: number;
  };
  north: string;
  south: string;
  west: string;
  east: string;
};

export type SpotMapSource = "latlng" | "fallback" | "missing";

export type SpotMapLayout = {
  spot: Spot;
  source: SpotMapSource;
  baseRatio: MapPoint | null;
  basePx: MapPoint | null;
  displayPx: MapPoint | null;
  fineOffsetPx: MapPoint;
  collisionAdjusted: boolean;
  zIndex: number;
};

const MAP_ANCHORS: MapAnchor[] = [
  { name: "sapporo", lat: 43.0618, lng: 141.3545, x: 0.638, y: 0.19 },
  { name: "hakodate", lat: 41.7687, lng: 140.7288, x: 0.58, y: 0.29 },
  { name: "aomori", lat: 40.8244, lng: 140.74, x: 0.53, y: 0.35 },
  { name: "tsugaru", lat: 40.9092, lng: 140.4337, x: 0.42, y: 0.41 },
  { name: "hanamaki", lat: 39.3886, lng: 141.1167, x: 0.495, y: 0.515 },
  { name: "sendai", lat: 38.2688, lng: 140.8721, x: 0.56, y: 0.46 },
  { name: "tsuruoka", lat: 38.7272, lng: 139.8268, x: 0.442, y: 0.469 },
  { name: "tono", lat: 39.5538, lng: 141.468, x: 0.506, y: 0.488 },
  { name: "tokyo", lat: 35.6764, lng: 139.65, x: 0.54, y: 0.603 },
  { name: "izu", lat: 34.85, lng: 138.93, x: 0.495, y: 0.69 },
  { name: "kanazawa", lat: 36.5613, lng: 136.6562, x: 0.365, y: 0.56 },
  { name: "karuizawa", lat: 36.3481, lng: 138.6346, x: 0.465, y: 0.572 },
  { name: "magome", lat: 35.5259, lng: 137.5689, x: 0.405, y: 0.632 },
  { name: "kinosaki", lat: 35.6251, lng: 134.8106, x: 0.336, y: 0.6 },
  { name: "kyoto", lat: 35.0116, lng: 135.7681, x: 0.382, y: 0.665 },
  { name: "osaka", lat: 34.6937, lng: 135.5023, x: 0.37, y: 0.69 },
  { name: "shingu", lat: 33.7339, lng: 135.9893, x: 0.402, y: 0.724 },
  { name: "hiroshima", lat: 34.3853, lng: 132.4553, x: 0.286, y: 0.712 },
  { name: "matsuyama", lat: 33.8392, lng: 132.7657, x: 0.308, y: 0.755 },
  { name: "fukuoka", lat: 33.5902, lng: 130.4017, x: 0.202, y: 0.742 },
  { name: "nagasaki", lat: 32.7503, lng: 129.8777, x: 0.122, y: 0.778 },
  { name: "kumamoto", lat: 32.8031, lng: 130.7079, x: 0.18, y: 0.77 },
  { name: "kagoshima", lat: 31.5966, lng: 130.5571, x: 0.2, y: 0.818 },
  { name: "naha", lat: 26.2125, lng: 127.6811, x: 0.082, y: 0.902 },
  { name: "koza", lat: 26.3344, lng: 127.8055, x: 0.088, y: 0.892 },
  { name: "okinawaMainNorth", lat: 26.5013, lng: 127.9454, x: 0.09, y: 0.882 },
  { name: "minamidaito", lat: 25.8285, lng: 131.2313, x: 0.186, y: 0.888 },
];

const anchorByName = Object.fromEntries(
  MAP_ANCHORS.map((anchor) => [anchor.name, anchor]),
) as Record<string, MapAnchor>;

const REGION_CALIBRATIONS: Record<MapRegionKey, RegionCalibration> = {
  hokkaido: {
    bounds: { latMin: 41.2, latMax: 45.8, lngMin: 139.4, lngMax: 145.8 },
    north: "sapporo",
    south: "hakodate",
    west: "hakodate",
    east: "sapporo",
  },
  tohoku: {
    bounds: { latMin: 37, latMax: 41.6, lngMin: 139.2, lngMax: 142.5 },
    north: "aomori",
    south: "sendai",
    west: "tsugaru",
    east: "tono",
  },
  kanto: {
    bounds: { latMin: 34.2, latMax: 37.4, lngMin: 138.8, lngMax: 140.9 },
    north: "karuizawa",
    south: "izu",
    west: "izu",
    east: "tokyo",
  },
  chubu: {
    bounds: { latMin: 34.8, latMax: 38.9, lngMin: 136, lngMax: 139.6 },
    north: "kanazawa",
    south: "magome",
    west: "kanazawa",
    east: "karuizawa",
  },
  kansai: {
    bounds: { latMin: 33.4, latMax: 36.9, lngMin: 134.2, lngMax: 136.9 },
    north: "kinosaki",
    south: "shingu",
    west: "kinosaki",
    east: "shingu",
  },
  chugokuShikoku: {
    bounds: { latMin: 32.8, latMax: 35.4, lngMin: 132, lngMax: 135 },
    north: "hiroshima",
    south: "matsuyama",
    west: "hiroshima",
    east: "matsuyama",
  },
  kyushu: {
    bounds: { latMin: 31, latMax: 34.4, lngMin: 129.3, lngMax: 131.8 },
    north: "fukuoka",
    south: "kagoshima",
    west: "nagasaki",
    east: "kumamoto",
  },
  okinawa: {
    bounds: { latMin: 24.8, latMax: 27.2, lngMin: 127.3, lngMax: 131.5 },
    north: "okinawaMainNorth",
    south: "naha",
    west: "naha",
    east: "minamidaito",
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function inverseLerp(min: number, max: number, value: number) {
  if (min === max) {
    return 0.5;
  }
  return clamp((value - min) / (max - min), 0, 1);
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function toRatioOffset(value?: number | null) {
  return value ? value / 100 : 0;
}

function getRegionForLatLng(lat: number, lng: number): MapRegionKey {
  if (lat >= 41.2) {
    return "hokkaido";
  }
  if (lat >= 37) {
    return "tohoku";
  }
  if (lat < 28.5) {
    return "okinawa";
  }
  if (lng <= 131.8) {
    return "kyushu";
  }
  if (lng <= 135) {
    return "chugokuShikoku";
  }
  if (lng <= 137.2) {
    return "kansai";
  }
  if (lng <= 139.6) {
    return "chubu";
  }
  return "kanto";
}

function projectTohokuPoint(lat: number, lng: number): MapPoint {
  const northness = inverseLerp(37.8, 41.15, lat);
  const eastness = inverseLerp(139.65, 141.55, lng);

  const westNorth = anchorByName.tsugaru;
  const westSouth = anchorByName.tsuruoka;
  const eastMid = anchorByName.hanamaki;
  const eastNorth = anchorByName.aomori;
  const eastSouth = anchorByName.sendai;

  const eastColumnBlend = lat >= eastMid.lat
    ? inverseLerp(eastMid.lat, eastNorth.lat, lat)
    : inverseLerp(eastSouth.lat, eastMid.lat, lat);

  const eastX = lat >= eastMid.lat
    ? lerp(eastMid.x, eastNorth.x, eastColumnBlend)
    : lerp(eastSouth.x, eastMid.x, eastColumnBlend);
  const eastY = lat >= eastMid.lat
    ? lerp(eastMid.y, eastNorth.y, eastColumnBlend)
    : lerp(eastSouth.y, eastMid.y, eastColumnBlend);
  const westX = lerp(westSouth.x, westNorth.x, northness);
  const westY = lerp(westSouth.y, westNorth.y, northness);

  return {
    x: clamp(lerp(westX, eastX, eastness), 0.32, 0.58),
    y: clamp(lerp(westY, eastY, eastness), 0.33, 0.58),
  };
}

function projectOkinawaPoint(lat: number, lng: number): MapPoint {
  const naha = anchorByName.naha;
  const koza = anchorByName.koza;
  const minamidaito = anchorByName.minamidaito;

  if (lng > 129.3) {
    const eastness = inverseLerp(127.8, minamidaito.lng, lng);
    const southness = inverseLerp(26.36, minamidaito.lat, lat);

    return {
      x: clamp(lerp(koza.x, minamidaito.x, eastness), 0.09, 0.22),
      y: clamp(lerp(koza.y, minamidaito.y, southness), 0.86, 0.93),
    };
  }

  const eastness = inverseLerp(naha.lng, koza.lng, lng);
  const northness = inverseLerp(naha.lat, anchorByName.okinawaMainNorth.lat, lat);

  return {
    x: clamp(lerp(naha.x, koza.x, eastness), 0.07, 0.11),
    y: clamp(lerp(naha.y, anchorByName.okinawaMainNorth.y, northness), 0.875, 0.91),
  };
}

export function projectLatLngToMapPoint(lat: number, lng: number): MapPoint {
  const regionKey = getRegionForLatLng(lat, lng);

  if (regionKey === "tohoku") {
    return projectTohokuPoint(lat, lng);
  }

  if (regionKey === "okinawa") {
    return projectOkinawaPoint(lat, lng);
  }

  const region = REGION_CALIBRATIONS[regionKey];
  const north = anchorByName[region.north];
  const south = anchorByName[region.south];
  const west = anchorByName[region.west];
  const east = anchorByName[region.east];

  const xRatio = inverseLerp(region.bounds.lngMin, region.bounds.lngMax, lng);
  const yRatio = inverseLerp(region.bounds.latMax, region.bounds.latMin, lat);

  return {
    x: clamp(lerp(west.x, east.x, xRatio), 0.02, 0.98),
    y: clamp(lerp(north.y, south.y, yRatio), 0.04, 0.96),
  };
}

export function getSpotMapSource(spot: Spot): SpotMapSource {
  if (spot.lat !== null && spot.lng !== null) {
    return "latlng";
  }
  if (spot.map_x !== null && spot.map_y !== null) {
    return "fallback";
  }
  return "missing";
}

export function getSpotBaseMapPoint(spot: Spot): { point: MapPoint | null; source: SpotMapSource } {
  const source = getSpotMapSource(spot);

  if (source === "latlng") {
    return { point: projectLatLngToMapPoint(spot.lat as number, spot.lng as number), source };
  }

  if (source === "fallback") {
    return {
      point: {
        x: (spot.map_x as number) / 100,
        y: (spot.map_y as number) / 100,
      },
      source,
    };
  }

  return { point: null, source };
}

function getPairMinDistancePx(a: SpotMapLayout, b: SpotMapLayout) {
  const aCrowded = a.source === "latlng";
  const bCrowded = b.source === "latlng";
  return aCrowded || bCrowded ? 24 : 20;
}

function clampDisplacement(base: MapPoint, current: MapPoint, maxDistance: number) {
  const dx = current.x - base.x;
  const dy = current.y - base.y;
  const distance = Math.hypot(dx, dy);

  if (distance <= maxDistance || distance === 0) {
    return current;
  }

  const scale = maxDistance / distance;
  return {
    x: base.x + dx * scale,
    y: base.y + dy * scale,
  };
}

function clampPointToImage(point: MapPoint, width: number, height: number) {
  return {
    x: clamp(point.x, 14, width - 14),
    y: clamp(point.y, 18, height - 18),
  };
}

export function buildSpotMapLayout(
  spots: Spot[],
  size: { width: number; height: number },
  selectedSpotId?: string | null,
): SpotMapLayout[] {
  const initial = spots
    .map((spot) => {
      const { point, source } = getSpotBaseMapPoint(spot);

      if (!point) {
        return {
          spot,
          source,
          baseRatio: null,
          basePx: null,
          displayPx: null,
          fineOffsetPx: { x: 0, y: 0 },
          collisionAdjusted: false,
          zIndex: 1,
        } satisfies SpotMapLayout;
      }

      const basePx = {
        x: point.x * size.width,
        y: point.y * size.height,
      };

      return {
        spot,
        source,
        baseRatio: point,
        basePx,
        displayPx: { ...basePx },
        fineOffsetPx: {
          x: size.width * toRatioOffset(spot.fine_dx),
          y: size.height * toRatioOffset(spot.fine_dy),
        },
        collisionAdjusted: false,
        zIndex: 2,
      } satisfies SpotMapLayout;
    })
    .filter((item) => item.basePx !== null && item.displayPx !== null);

  const movable = initial as Array<SpotMapLayout & { basePx: MapPoint; displayPx: MapPoint }>;

  for (let iteration = 0; iteration < 12; iteration += 1) {
    let moved = false;

    for (let i = 0; i < movable.length; i += 1) {
      for (let j = i + 1; j < movable.length; j += 1) {
        const a = movable[i];
        const b = movable[j];
        const minDistance = getPairMinDistancePx(a, b);
        let dx = b.displayPx.x - a.displayPx.x;
        let dy = b.displayPx.y - a.displayPx.y;
        let distance = Math.hypot(dx, dy);

        if (distance >= minDistance) {
          continue;
        }

        if (distance < 0.001) {
          const angle = ((i + 1) * 17 + (j + 1) * 29) * (Math.PI / 180);
          dx = Math.cos(angle);
          dy = Math.sin(angle);
          distance = 1;
        }

        const overlap = minDistance - distance;
        const nx = dx / distance;
        const ny = dy / distance;
        const aWeight = a.spot.spot_id === selectedSpotId ? 0.35 : 0.5;
        const bWeight = b.spot.spot_id === selectedSpotId ? 0.35 : 0.5;

        a.displayPx = {
          x: a.displayPx.x - nx * overlap * aWeight,
          y: a.displayPx.y - ny * overlap * aWeight,
        };
        b.displayPx = {
          x: b.displayPx.x + nx * overlap * bWeight,
          y: b.displayPx.y + ny * overlap * bWeight,
        };
        moved = true;
      }
    }

    movable.forEach((item) => {
      const relax = item.spot.spot_id === selectedSpotId ? 0.2 : 0.14;
      const maxDistance = item.spot.spot_id === selectedSpotId ? 26 : 20;

      item.displayPx = {
        x: item.displayPx.x + (item.basePx.x - item.displayPx.x) * relax,
        y: item.displayPx.y + (item.basePx.y - item.displayPx.y) * relax,
      };
      item.displayPx = clampDisplacement(item.basePx, item.displayPx, maxDistance);
    });

    if (!moved) {
      break;
    }
  }

  return spots.map((spot) => {
    const match = movable.find((item) => item.spot.spot_id === spot.spot_id);

    if (!match || !match.basePx || !match.displayPx) {
      const source = getSpotMapSource(spot);
      return {
        spot,
        source,
        baseRatio: null,
        basePx: null,
        displayPx: null,
        fineOffsetPx: { x: 0, y: 0 },
        collisionAdjusted: false,
        zIndex: 1,
      } satisfies SpotMapLayout;
    }

    // Order matters for maintenance:
    // 1. lat/lng or fallback gives the base position
    // 2. collision handling adjusts only the display position
    // 3. fine_dx / fine_dy are applied last as a small manual nudge
    const displayPx = clampPointToImage(
      {
        x: match.displayPx.x + match.fineOffsetPx.x,
        y: match.displayPx.y + match.fineOffsetPx.y,
      },
      size.width,
      size.height,
    );

    const collisionAdjusted =
      Math.abs(displayPx.x - match.basePx.x) > 0.75 ||
      Math.abs(displayPx.y - match.basePx.y) > 0.75;

    return {
      ...match,
      displayPx,
      collisionAdjusted,
      zIndex:
        spot.spot_id === selectedSpotId
          ? 40
          : collisionAdjusted
            ? 20 + Math.round(displayPx.y / 20)
            : 10 + Math.round(displayPx.y / 24),
    };
  });
}

export function clampSelection<T>(items: T[], currentIndex: number) {
  if (items.length === 0) {
    return null;
  }
  return items[Math.max(0, Math.min(currentIndex, items.length - 1))];
}
