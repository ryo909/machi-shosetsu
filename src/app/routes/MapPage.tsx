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
  getAvailableRegionOptions,
  getAnchorRelationForSpot,
  getMapSpots,
  getRepresentativeWorkForSpot,
  getSpotById,
} from "../../lib/selectors";
import pageStyles from "../../styles/pages.module.css";

export function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region") ?? "all";
  const visibleSpots = getMapSpots(region);
  const regionOptions = getAvailableRegionOptions();
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
        breadcrumbs={[
          { label: "ホーム", to: "/" },
          { label: "地図から探す" },
        ]}
        description="日本地図の上から気になる土地を選び、その場所から次の一冊へつなぎます。位置関係をつかみやすくしつつ、押しやすさも優先した文学スポットマップです。"
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
        <div className={pageStyles.mapStage}>
          <div className={pageStyles.mapMainColumn}>
            <JapanMapCard
              onSelect={setSelectedSpotId}
              selectedSpotId={selectedSpotId}
              spots={visibleSpots}
            />
          </div>
          <aside className={pageStyles.mapPreviewColumn}>
            <SectionHeading title="選択中のスポット" meta={selectedSpot ? "地図を見ながら確認" : "まずは地図から選ぶ"} />
            {selectedSpot && selectedRepresentativeWork ? (
              <SelectedSpotPreviewCard
                representativeWorkTitle={selectedRepresentativeWork.title}
                spot={selectedSpot}
              />
            ) : (
              <EmptyState message="地図上のスポットを選ぶと、ここに案内が表示されます。旅先や気になる街を選んでください。" />
            )}
          </aside>
        </div>
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
