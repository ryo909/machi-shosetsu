import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { SelectedSpotPreviewCard } from "../../components/cards/SelectedSpotPreviewCard";
import { EmptyState } from "../../components/common/EmptyState";
import { RegionChipGroup } from "../../components/common/RegionChipGroup";
import { SectionHeading } from "../../components/common/SectionHeading";
import { Header } from "../../components/layout/Header";
import { JapanMapCard } from "../../components/map/JapanMapCard";
import { MapSpotMiniList } from "../../components/map/MapSpotMiniList";
import {
  getAvailablePrefectureOptions,
  getAvailableRegionOptions,
  getPrefectureMapSummaries,
  getPublishedSpots,
  getRepresentativeMapSpotsForPrefecture,
  getRepresentativeWorkForSpot,
  getSpotById,
} from "../../lib/selectors";
import { broadRegionLabels, isBroadRegionKey } from "../../lib/regions";
import pageStyles from "../../styles/pages.module.css";

function buildAreaSummary(
  region: string,
  prefectureLabel: string | null,
  prefectureCount: number,
  spotCount: number,
) {
  if (prefectureLabel) {
    return `${prefectureLabel}には ${spotCount} 件の文学スポットがあります。地図では代表スポットだけを静かに示し、詳しい出会いは一覧で拾えるようにしています。`;
  }

  if (region !== "all") {
    return `${broadRegionLabels[region as keyof typeof broadRegionLabels]}には ${prefectureCount} 県・${spotCount} 件のスポットがあります。まずは気になる県をひとつ選んでください。`;
  }

  return `全国では ${prefectureCount} 県に ${spotCount} 件の文学スポットがあります。地域を選んでから県へ絞ると、場所から一冊へ入りやすくなります。`;
}

export function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawRegion = searchParams.get("region");
  const rawPrefecture = searchParams.get("prefecture");
  const region = isBroadRegionKey(rawRegion) ? rawRegion : "all";
  const prefecture = rawPrefecture ?? (!isBroadRegionKey(rawRegion) && rawRegion ? rawRegion : "all");

  const regionOptions = getAvailableRegionOptions();
  const prefectureOptions: Array<{
    value: string;
    label: string;
    region?: string;
    count?: number;
  }> = [
    { value: "all", label: "すべて" },
    ...getAvailablePrefectureOptions(region),
  ];
  const prefectureSummaries = getPrefectureMapSummaries(region === "all" ? null : region);
  const prefectureSpots =
    prefecture !== "all"
      ? getPublishedSpots({
          prefecture,
          region,
        })
      : [];
  const representativeSpots =
    prefecture !== "all" ? getRepresentativeMapSpotsForPrefecture(prefecture, 5) : [];

  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(
    representativeSpots[0]?.spot_id ?? null,
  );

  useEffect(() => {
    if (prefecture === "all") {
      setSelectedSpotId(null);
      return;
    }

    if (!prefectureSpots.some((spot) => spot.spot_id === selectedSpotId)) {
      setSelectedSpotId(representativeSpots[0]?.spot_id ?? prefectureSpots[0]?.spot_id ?? null);
    }
  }, [prefecture, prefectureSpots, representativeSpots, selectedSpotId]);

  const selectedPrefectureOption =
    prefectureOptions.find((option) => option.value === prefecture) ?? null;
  const selectedSpot = selectedSpotId ? getSpotById(selectedSpotId) : null;
  const selectedRepresentativeWork =
    selectedSpotId && selectedSpot ? getRepresentativeWorkForSpot(selectedSpotId) : null;

  const miniListItems = useMemo(
    () =>
      prefectureSpots.map((spot) => ({
        spot,
        representativeWorkTitle: getRepresentativeWorkForSpot(spot.spot_id)?.title ?? "作品準備中",
      })),
    [prefectureSpots],
  );

  const relatedWorks = useMemo(() => {
    const seen = new Set<string>();

    return prefectureSpots
      .map((spot) => {
        const work = getRepresentativeWorkForSpot(spot.spot_id);
        return work ? { spot, work } : null;
      })
      .filter((item): item is { spot: (typeof prefectureSpots)[number]; work: NonNullable<ReturnType<typeof getRepresentativeWorkForSpot>> } => item !== null)
      .filter((item) => {
        if (seen.has(item.work.work_id)) {
          return false;
        }
        seen.add(item.work.work_id);
        return true;
      })
      .slice(0, 3);
  }, [prefectureSpots]);

  const summaryText = buildAreaSummary(
    region,
    selectedPrefectureOption?.label ?? null,
    prefectureSummaries.length,
    prefecture === "all" ? prefectureSummaries.reduce((sum, item) => sum + item.count, 0) : prefectureSpots.length,
  );

  return (
    <div className={pageStyles.page}>
      <Header
        breadcrumbs={[
          { label: "ホーム", to: "/" },
          { label: "地図から探す" },
        ]}
        description="全国地図は厳密な位置比較ではなく、地域と都道府県から文学スポットへ入るための入口として使います。まずは広い地域感から、次に県ごとの気配へ絞り込みます。"
        eyebrow="地図から探す"
        title="地域と都道府県から探す"
      />

      <section className={pageStyles.section}>
        <div className={pageStyles.mapExplorerStage}>
          <aside className={pageStyles.mapFiltersPanel}>
            <div className={`${pageStyles.detailBlock} ${pageStyles.filterIntroCard}`}>
              <div className={pageStyles.heroRegion}>はじめかた</div>
              <h2 className={pageStyles.spotTitle}>地域から、県へ、スポットへ</h2>
              <div className={pageStyles.stepList}>
                <div className={pageStyles.stepItem}>
                  <div className={pageStyles.stepNumber}>1</div>
                  <div className={pageStyles.stepBody}>
                    <div className={pageStyles.stepTitle}>広域地域を選ぶ</div>
                    <div className={pageStyles.stepText}>
                      まずは北海道、東北、関東のような大きな地域感から絞ります。
                    </div>
                  </div>
                </div>
                <div className={pageStyles.stepItem}>
                  <div className={pageStyles.stepNumber}>2</div>
                  <div className={pageStyles.stepBody}>
                    <div className={pageStyles.stepTitle}>都道府県を選ぶ</div>
                    <div className={pageStyles.stepText}>
                      スポットがある県だけを見ながら、次に気になる土地を決めます。
                    </div>
                  </div>
                </div>
                <div className={pageStyles.stepItem}>
                  <div className={pageStyles.stepNumber}>3</div>
                  <div className={pageStyles.stepBody}>
                    <div className={pageStyles.stepTitle}>代表スポットから入る</div>
                    <div className={pageStyles.stepText}>
                      地図では入口になる数件だけを示し、詳しくは右側の一覧で拾います。
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={pageStyles.detailBlock}>
              <div className={pageStyles.filterStack}>
                <div>
                  <div className={pageStyles.filterLabel}>1. 広域地域を選ぶ</div>
                  <p className={pageStyles.filterHelp}>
                    気分の近い地域から決めると、地図が見やすくなります。
                  </p>
                  <RegionChipGroup
                    onChange={(nextRegion) => {
                      const next = new URLSearchParams(searchParams);

                      if (nextRegion === "all") {
                        next.delete("region");
                      } else {
                        next.set("region", nextRegion);
                      }

                      const nextPrefecture = next.get("prefecture");
                      if (
                        nextPrefecture &&
                        !getAvailablePrefectureOptions(nextRegion).some(
                          (option) => option.value === nextPrefecture,
                        )
                      ) {
                        next.delete("prefecture");
                      }

                      setSearchParams(next, { replace: true });
                    }}
                    options={regionOptions}
                    value={region}
                  />
                </div>
                <div>
                  <div className={pageStyles.filterLabel}>2. 都道府県を選ぶ</div>
                  <p className={pageStyles.filterHelp}>
                    県を選ぶと、代表スポットと一覧が右側に現れます。
                  </p>
                  <RegionChipGroup
                    onChange={(nextPrefecture) => {
                      const next = new URLSearchParams(searchParams);

                      if (nextPrefecture === "all") {
                        next.delete("prefecture");
                        setSearchParams(next, { replace: true });
                        return;
                      }

                      const targetOption = prefectureOptions.find(
                        (option) => option.value === nextPrefecture,
                      );

                      next.set("prefecture", nextPrefecture);
                      if (targetOption?.region) {
                        next.set("region", targetOption.region);
                      }
                      setSearchParams(next, { replace: true });
                    }}
                    options={prefectureOptions}
                    value={prefecture}
                  />
                </div>
                <div className={pageStyles.selectionSummary}>
                  <div className={pageStyles.summaryPill}>
                    地域: {region === "all" ? "未選択" : broadRegionLabels[region as keyof typeof broadRegionLabels]}
                  </div>
                  <div className={pageStyles.summaryPill}>
                    都道府県: {selectedPrefectureOption?.label ?? "未選択"}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className={pageStyles.mapMainColumn}>
            <JapanMapCard
              onSelectPrefecture={(prefectureKey) => {
                const next = new URLSearchParams(searchParams);
                const targetOption = prefectureOptions.find(
                  (option) => option.value === prefectureKey,
                );

                next.set("prefecture", prefectureKey);
                if (targetOption?.region) {
                  next.set("region", targetOption.region);
                }
                setSearchParams(next, { replace: true });
              }}
              onSelectSpot={setSelectedSpotId}
              prefectures={prefectureSummaries}
              representativeSpots={representativeSpots}
              selectedPrefectureKey={prefecture}
              selectedRegion={region}
              selectedSpotId={selectedSpotId}
            />
          </div>

          <aside className={pageStyles.mapDetailsPanel}>
            <div className={pageStyles.stack}>
              <div className={pageStyles.detailBlock}>
                <div className={pageStyles.heroRegion}>
                  {selectedPrefectureOption?.label ?? "全国から探す"}
                </div>
                <h2 className={pageStyles.spotTitle}>
                  {selectedPrefectureOption
                    ? `${selectedPrefectureOption.label}の文学スポット`
                    : "地域から都道府県を選ぶ"}
                </h2>
                <p className={pageStyles.heroDescription}>{summaryText}</p>
                <div className={pageStyles.selectionSummary}>
                  <div className={pageStyles.summaryPill}>
                    県マーカー: {prefectureSummaries.length}件
                  </div>
                  <div className={pageStyles.summaryPill}>
                    代表スポット: {representativeSpots.length}件
                  </div>
                </div>
              </div>

              {selectedSpot && selectedRepresentativeWork ? (
                <div>
                  <SectionHeading
                    title="まず見るスポット"
                    meta="県を選んだら、ここから入る"
                  />
                  <SelectedSpotPreviewCard
                    representativeWorkTitle={selectedRepresentativeWork.title}
                    spot={selectedSpot}
                  />
                </div>
              ) : (
                <EmptyState message="まずは地域を選び、次に都道府県をひとつ選んでください。県が決まると、入口になる代表スポットと一覧がここに整います。" />
              )}

              {prefecture !== "all" ? (
                <div>
                  <SectionHeading
                    title="この県のスポット一覧"
                    meta={`${prefectureSpots.length}件`}
                  />
                  <MapSpotMiniList
                    onSelect={setSelectedSpotId}
                    selectedSpotId={selectedSpotId}
                    spots={miniListItems}
                  />
                </div>
              ) : null}

              {relatedWorks.length > 0 ? (
                <div className={pageStyles.detailBlock}>
                  <div className={pageStyles.heroRegion}>この県から読みはじめる</div>
                  <div className={pageStyles.infoList}>
                    {relatedWorks.map(({ spot, work }) => (
                      <div className={pageStyles.infoItem} key={`${spot.spot_id}-${work.work_id}`}>
                        <div className={pageStyles.infoLabel}>{spot.display_name}</div>
                        <Link className={pageStyles.infoValueLink} to={`/works/${work.slug}`}>
                          {work.title} / {work.author}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
