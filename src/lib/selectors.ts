import { relations } from "../data/relations";
import { spots } from "../data/spots";
import type { Relation, Spot, Work } from "../data/types";
import { works } from "../data/works";
import { getSpotBaseMapPoint } from "./mapHelpers";
import {
  broadRegionLabels,
  getBroadRegionOrderIndex,
  type BroadRegionKey,
} from "./regions";

type PublishedRelation = Relation & { status: "published" };
export type PublishedSpot = Spot & { status: "published" };
export type PublishedWork = Work & { status: "published" };
type SpotFilters = {
  region?: string | null;
  prefecture?: string | null;
};

type PrefectureOption = {
  value: string;
  label: string;
  region: string;
  count: number;
};

type PrefectureMapSummary = {
  value: string;
  label: string;
  region: string;
  count: number;
  point: { x: number; y: number } | null;
};

const relationTypePriority: Record<Relation["relation_type"], number> = {
  main_stage: 0,
  major_scene: 1,
  model_place: 2,
  popular_association: 3,
};

function normalizeSpotFilters(filters?: SpotFilters | string | null): SpotFilters {
  if (!filters) {
    return {};
  }

  if (typeof filters === "string") {
    return { prefecture: filters };
  }

  return filters;
}

export function isSpotPublished(spot: Spot): spot is PublishedSpot {
  return spot.status === "published";
}

export function isWorkPublished(work: Work): work is PublishedWork {
  return work.status === "published";
}

export function isRelationPublished(relation: Relation): relation is PublishedRelation {
  return relation.status === "published";
}

export function getPublishedSpots(filters?: SpotFilters | string | null): PublishedSpot[] {
  const { prefecture, region } = normalizeSpotFilters(filters);

  return spots
    .filter(isSpotPublished)
    .filter((spot) => (!region || region === "all" ? true : spot.region === region))
    .filter((spot) =>
      !prefecture || prefecture === "all"
        ? true
        : spot.region_key === prefecture || spot.parent_area === prefecture,
    )
    .sort((a, b) => a.priority - b.priority);
}

export function getAvailableRegionOptions() {
  const seen = new Set<string>();
  const options = [{ value: "all", label: "すべて" }];
  const regionOptions: Array<{ value: string; label: string }> = [];

  getPublishedSpots().forEach((spot) => {
    if (seen.has(spot.region)) {
      return;
    }
    seen.add(spot.region);
    regionOptions.push({
      value: spot.region,
      label: broadRegionLabels[spot.region as BroadRegionKey] ?? spot.region,
    });
  });

  regionOptions.sort((a, b) => {
    const orderDiff = getBroadRegionOrderIndex(a.value) - getBroadRegionOrderIndex(b.value);
    return orderDiff !== 0 ? orderDiff : a.label.localeCompare(b.label, "ja");
  });

  return options.concat(regionOptions);
}

export function getAvailablePrefectureOptions(region?: string | null): PrefectureOption[] {
  const counts = new Map<string, PrefectureOption>();

  getPublishedSpots({ region }).forEach((spot) => {
    const current = counts.get(spot.region_key);

    if (!current) {
      counts.set(spot.region_key, {
        value: spot.region_key,
        label: spot.parent_area,
        region: spot.region,
        count: 1,
      });
      return;
    }

    current.count += 1;
  });

  return Array.from(counts.values()).sort((a, b) => {
    const regionDiff = getBroadRegionOrderIndex(a.region) - getBroadRegionOrderIndex(b.region);
    return regionDiff !== 0 ? regionDiff : a.label.localeCompare(b.label, "ja");
  });
}

export function getMapSpots(filters?: SpotFilters | string | null): PublishedSpot[] {
  return getPublishedSpots(filters).filter(
    (spot) =>
      (spot.display_x !== null &&
        spot.display_x !== undefined &&
        spot.display_y !== null &&
        spot.display_y !== undefined) ||
      (spot.lat !== null && spot.lng !== null) ||
      (spot.map_x !== null && spot.map_y !== null),
  );
}

function getSpotRepresentativeMeta(spot: PublishedSpot) {
  const primaryRelation = getRelationsForSpot(spot.spot_id)[0] ?? null;

  return {
    relationPriority: primaryRelation
      ? relationTypePriority[primaryRelation.relation_type]
      : Number.MAX_SAFE_INTEGER,
    displayPriority: spot.display_priority ?? spot.priority,
  };
}

export function getRepresentativeMapSpotsForPrefecture(
  prefecture?: string | null,
  maxVisible = 3,
) {
  const visibleSpots = getMapSpots({ prefecture }).filter(
    (spot) => spot.map_mode !== "hidden",
  );

  const sorted = [...visibleSpots].sort((a, b) => {
    const aMeta = getSpotRepresentativeMeta(a);
    const bMeta = getSpotRepresentativeMeta(b);

    if (aMeta.relationPriority !== bMeta.relationPriority) {
      return aMeta.relationPriority - bMeta.relationPriority;
    }

    if (aMeta.displayPriority !== bMeta.displayPriority) {
      return aMeta.displayPriority - bMeta.displayPriority;
    }

    return a.priority - b.priority;
  });

  const limit =
    sorted.length <= 2 ? sorted.length : sorted.length <= 5 ? Math.min(3, sorted.length) : 3;

  return sorted.slice(0, Math.min(limit, maxVisible));
}

export function getPrefectureMapSummaries(region?: string | null): PrefectureMapSummary[] {
  return getAvailablePrefectureOptions(region).map((option) => {
    const representativeSpot = getRepresentativeMapSpotsForPrefecture(option.value, 1)[0] ?? null;
    const point = representativeSpot
      ? getSpotBaseMapPoint(representativeSpot).point
      : null;

    return {
      value: option.value,
      label: option.label,
      region: option.region,
      count: option.count,
      point,
    };
  });
}

export function getSpotBySlug(slug?: string): PublishedSpot | undefined {
  return spots.find(
    (spot): spot is PublishedSpot => spot.slug === slug && isSpotPublished(spot),
  );
}

export function getWorkBySlug(slug?: string): PublishedWork | undefined {
  return works.find(
    (work): work is PublishedWork => work.slug === slug && isWorkPublished(work),
  );
}

export function getRelationsForSpot(spotId: string): PublishedRelation[] {
  return relations
    .filter(isRelationPublished)
    .filter((relation) => relation.spot_id === spotId)
    .sort((a, b) => {
      if (a.is_anchor !== b.is_anchor) {
        return a.is_anchor ? -1 : 1;
      }
      return a.display_rank - b.display_rank;
    });
}

export function getRelationsForWork(workId: string): PublishedRelation[] {
  return relations
    .filter(isRelationPublished)
    .filter((relation) => relation.work_id === workId)
    .sort((a, b) => {
      if (a.is_anchor !== b.is_anchor) {
        return a.is_anchor ? -1 : 1;
      }
      return a.display_rank - b.display_rank;
    });
}

export function getAnchorRelationForSpot(spotId: string): PublishedRelation | null {
  return getRelationsForSpot(spotId).find((relation) => relation.is_anchor) ?? null;
}

export function getAnchorRelationForWork(workId: string): PublishedRelation | null {
  return getRelationsForWork(workId).find((relation) => relation.is_anchor) ?? null;
}

export function getWorkById(workId: string): PublishedWork | null {
  return (
    works.find(
      (work): work is PublishedWork => work.work_id === workId && isWorkPublished(work),
    ) ?? null
  );
}

export function getSpotById(spotId: string): PublishedSpot | null {
  return (
    spots.find(
      (spot): spot is PublishedSpot => spot.spot_id === spotId && isSpotPublished(spot),
    ) ?? null
  );
}

export function getSpotWorkPairs(spotId: string) {
  return getRelationsForSpot(spotId)
    .map((relation) => {
      const work = getWorkById(relation.work_id);
      return work ? { relation, work } : null;
    })
    .filter((pair): pair is { relation: PublishedRelation; work: PublishedWork } => pair !== null);
}

export function getWorkSpotPairs(workId: string) {
  return getRelationsForWork(workId)
    .map((relation) => {
      const spot = getSpotById(relation.spot_id);
      return spot ? { relation, spot } : null;
    })
    .filter((pair): pair is { relation: PublishedRelation; spot: PublishedSpot } => pair !== null);
}

export function getRepresentativeWorkForSpot(spotId: string) {
  const anchor = getAnchorRelationForSpot(spotId);
  if (anchor) {
    return getWorkById(anchor.work_id);
  }

  const first = getRelationsForSpot(spotId)[0];
  return first ? getWorkById(first.work_id) : null;
}

export function getRecommendedSpots(limit = 4) {
  return getPublishedSpots().slice(0, limit);
}

export function getRelatedSpotsForSpot(spot: PublishedSpot, limit = 2) {
  return getPublishedSpots({ prefecture: spot.region_key })
    .filter((candidate) => candidate.spot_id !== spot.spot_id)
    .slice(0, limit);
}

export function getSavedSpotsByIds(ids: string[]) {
  return ids
    .map((id) => getSpotById(id))
    .filter((spot): spot is PublishedSpot => spot !== null);
}

export function getSavedWorksByIds(ids: string[]) {
  return ids
    .map((id) => getWorkById(id))
    .filter((work): work is PublishedWork => work !== null);
}
