import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SelectedSpotPreviewCard } from "../../components/cards/SelectedSpotPreviewCard";
import { EmptyState } from "../../components/common/EmptyState";
import { RegionChipGroup } from "../../components/common/RegionChipGroup";
import { SectionHeading } from "../../components/common/SectionHeading";
import { Header } from "../../components/layout/Header";
import { JapanMapCard } from "../../components/map/JapanMapCard";
import { MapSpotMiniList } from "../../components/map/MapSpotMiniList";
import {
  getAnchorRelationForSpot,
  getMapSpots,
  getRepresentativeWorkForSpot,
  getSpotById,
} from "../../lib/selectors";
import { regionOptions } from "../../styles/tokens";
import pageStyles from "../../styles/pages.module.css";

export function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region") ?? "all";
  const visibleSpots = getMapSpots(region);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(
    visibleSpots[0]?.spot_id ?? null,
  );

  useEffect(() => {
    if (!visibleSpots.some((spot) => spot.spot_id === selectedSpotId)) {
      setSelectedSpotId(visibleSpots[0]?.spot_id ?? null);
    }
  }, [selectedSpotId, visibleSpots]);

  const selectedSpot = selectedSpotId ? getSpotById(selectedSpotId) : null;
  const selectedRepresentativeWork =
    selectedSpotId && getRepresentativeWorkForSpot(selectedSpotId);

  const miniListItems = useMemo(
    () =>
      visibleSpots.map((spot) => ({
        spot,
        representativeWorkTitle:
          getAnchorRelationForSpot(spot.spot_id) &&
          getRepresentativeWorkForSpot(spot.spot_id)?.title
            ? getRepresentativeWorkForSpot(spot.spot_id)!.title
            : "作品準備中",
      })),
    [visibleSpots],
  );

  return (
    <div className={pageStyles.page}>
      <Header
        description="日本地図の上から気になる土地を選び、そこに似合う一冊へつなぎます。地理の正確さより、押しやすさと眺める楽しさを優先したMVPです。"
        eyebrow="地図から探す"
        title="文学スポットマップ"
      />

      <section className={pageStyles.sectionTight}>
        <RegionChipGroup
          onChange={(nextRegion) => {
            const next = new URLSearchParams(searchParams);
            if (nextRegion === "all") {
              next.delete("region");
            } else {
              next.set("region", nextRegion);
            }
            setSearchParams(next, { replace: true });
          }}
          options={regionOptions}
          value={region}
        />
      </section>

      <section className={pageStyles.section}>
        <JapanMapCard
          onSelect={setSelectedSpotId}
          selectedSpotId={selectedSpotId}
          spots={visibleSpots}
        />
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="選択中のスポット" />
        {selectedSpot && selectedRepresentativeWork ? (
          <SelectedSpotPreviewCard
            representativeWorkTitle={selectedRepresentativeWork.title}
            spot={selectedSpot}
          />
        ) : (
          <EmptyState message="気になる場所をタップしてください。選んだスポットの代表作品をここで案内します。" />
        )}
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="スポット一覧" meta={`${visibleSpots.length}件`} />
        <MapSpotMiniList
          onSelect={setSelectedSpotId}
          selectedSpotId={selectedSpotId}
          spots={miniListItems}
        />
      </section>
    </div>
  );
}
