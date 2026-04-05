import { relations } from "../data/relations";
import { spots } from "../data/spots";
import type { Relation, Spot, Work } from "../data/types";
import { works } from "../data/works";
import type { RegionKey } from "../styles/tokens";

type PublishedRelation = Relation & { status: "published" };
export type PublishedSpot = Spot & { status: "published" };
export type PublishedWork = Work & { status: "published" };

export function isSpotPublished(spot: Spot): spot is PublishedSpot {
  return spot.status === "published";
}

export function isWorkPublished(work: Work): work is PublishedWork {
  return work.status === "published";
}

export function isRelationPublished(relation: Relation): relation is PublishedRelation {
  return relation.status === "published";
}

export function getPublishedSpots(region?: string | null): PublishedSpot[] {
  return spots
    .filter(isSpotPublished)
    .filter((spot) =>
      !region || region === "all"
        ? true
        : spot.region_key === region || spot.parent_area === region,
    )
    .sort((a, b) => a.priority - b.priority);
}

export function getAvailableRegionOptions() {
  const seen = new Set<string>();
  const options = [{ value: "all", label: "すべて" }];

  getPublishedSpots().forEach((spot) => {
    if (seen.has(spot.region_key)) {
      return;
    }
    seen.add(spot.region_key);
    options.push({ value: spot.region_key, label: spot.parent_area });
  });

  return options;
}

export function getMapSpots(region?: RegionKey | string | null): PublishedSpot[] {
  return getPublishedSpots(region).filter(
    (spot) =>
      (spot.display_x !== null &&
        spot.display_x !== undefined &&
        spot.display_y !== null &&
        spot.display_y !== undefined) ||
      (spot.lat !== null && spot.lng !== null) ||
      (spot.map_x !== null && spot.map_y !== null),
  );
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
  return getPublishedSpots(spot.region_key)
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
