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
  const isRegionSelected = region !== "all";
  const isPrefectureSelected = prefecture !== "all";

  const handleRegionChange = (nextRegion: string) => {
    const next = new URLSearchParams(searchParams);

    if (nextRegion === "all") {
      next.delete("region");
      next.delete("prefecture");
      setSearchParams(next, { replace: true });
      return;
    }

    next.set("region", nextRegion);

    const nextPrefecture = next.get("prefecture");
    if (
      nextPrefecture &&
      !getAvailablePrefectureOptions(nextRegion).some((option) => option.value === nextPrefecture)
    ) {
      next.delete("prefecture");
    }

    setSearchParams(next, { replace: true });
  };

  const handlePrefectureChange = (nextPrefecture: string) => {
    const next = new URLSearchParams(searchParams);

    if (nextPrefecture === "all") {
      next.delete("prefecture");
      setSearchParams(next, { replace: true });
      return;
    }

    const targetOption = prefectureOptions.find((option) => option.value === nextPrefecture);
    next.set("prefecture", nextPrefecture);
    if (targetOption?.region) {
      next.set("region", targetOption.region);
    }
    setSearchParams(next, { replace: true });
  };

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
          <div className={pageStyles.mapMainColumn}>
            <JapanMapCard
              onSelectPrefecture={handlePrefectureChange}
              onSelectSpot={setSelectedSpotId}
              prefectures={prefectureSummaries}
              representativeSpots={representativeSpots}
              selectedPrefectureKey={prefecture}
              selectedRegion={region}
              selectedSpotId={selectedSpotId}
            />
          </div>

          <aside className={pageStyles.mapFiltersPanel}>
            {!isRegionSelected ? (
              <div className={pageStyles.detailBlock}>
                <div className={pageStyles.heroRegion}>地域から入る</div>
                <h2 className={pageStyles.spotTitle}>まずどの地域から見ますか</h2>
                <p className={pageStyles.heroDescription}>
                  地図の気配を見ながら、最初の地域だけを決める画面です。地域を選ぶと、次に都道府県と代表スポットが静かに現れます。
                </p>
                <div className={pageStyles.filterStack}>
                  <div>
                    <div className={pageStyles.filterLabel}>地域を選ぶ</div>
                    <RegionChipGroup
                      onChange={handleRegionChange}
                      options={regionOptions}
                      value={region}
                    />
                  </div>
                </div>
              </div>
            ) : !isPrefectureSelected ? (
              <div className={pageStyles.detailBlock}>
                <div className={pageStyles.heroRegion}>
                  {broadRegionLabels[region as keyof typeof broadRegionLabels]}
                </div>
                <div className={pageStyles.compactStepRow}>
                  <span>地域を選んだら</span>
                  <span aria-hidden="true">→</span>
                  <span>次は県を選ぶ</span>
                </div>
                <p className={pageStyles.heroDescription}>
                  この地域でスポットがある県だけを表示しています。次は気になる県をひとつ選んでください。
                </p>
                <div className={pageStyles.filterStack}>
                  <div>
                    <div className={pageStyles.filterLabel}>地域を選び直す</div>
                    <RegionChipGroup
                      onChange={handleRegionChange}
                      options={regionOptions}
                      value={region}
                    />
                  </div>
                  <div>
                    <div className={pageStyles.filterLabel}>都道府県を選ぶ</div>
                    <RegionChipGroup
                      onChange={handlePrefectureChange}
                      options={prefectureOptions}
                      value={prefecture}
                    />
                  </div>
                </div>
                <div className={pageStyles.selectionSummary}>
                  <div className={pageStyles.summaryPill}>
                    県候補: {Math.max(prefectureOptions.length - 1, 0)}件
                  </div>
                </div>
              </div>
            ) : (
              <div className={pageStyles.stack}>
                <div className={pageStyles.detailBlock}>
                  <div className={pageStyles.heroRegion}>
                    {selectedPrefectureOption?.label}
                  </div>
                  <div className={pageStyles.compactStepRow}>
                    <span>地域</span>
                    <span aria-hidden="true">→</span>
                    <span>県</span>
                    <span aria-hidden="true">→</span>
                    <span>代表スポット</span>
                  </div>
                  <div className={pageStyles.filterStack}>
                    <div>
                      <div className={pageStyles.filterLabel}>地域を見直す</div>
                      <RegionChipGroup
                        onChange={handleRegionChange}
                        options={regionOptions}
                        value={region}
                      />
                    </div>
                    <div>
                      <div className={pageStyles.filterLabel}>都道府県を見直す</div>
                      <RegionChipGroup
                        onChange={handlePrefectureChange}
                        options={prefectureOptions}
                        value={prefecture}
                      />
                    </div>
                  </div>
                  <div className={pageStyles.selectionSummary}>
                    <div className={pageStyles.summaryPill}>
                      スポット: {prefectureSpots.length}件
                    </div>
                    <div className={pageStyles.summaryPill}>
                      代表表示: {representativeSpots.length}件
                    </div>
                  </div>
                </div>

                {selectedSpot && selectedRepresentativeWork ? (
                  <div>
                    <SectionHeading title="代表スポット" meta="ここから入る" />
                    <SelectedSpotPreviewCard
                      representativeWorkTitle={selectedRepresentativeWork.title}
                      spot={selectedSpot}
                    />
                  </div>
                ) : null}
              </div>
            )}
          </aside>
        </div>
      </section>

      {!isRegionSelected ? (
        <section className={pageStyles.section}>
          <EmptyState message="地域を選ぶと、ここに都道府県ごとの入口とスポット一覧が表示されます。まずは地図の右側で気になる地域をひとつ選んでください。" />
        </section>
      ) : !isPrefectureSelected ? (
        <section className={pageStyles.section}>
          <div className={`${pageStyles.detailBlock} ${pageStyles.mapSelectionBand}`}>
            <div className={pageStyles.heroRegion}>
              {broadRegionLabels[region as keyof typeof broadRegionLabels]}
            </div>
            <h2 className={pageStyles.spotTitle}>次は都道府県を選ぶ</h2>
            <p className={pageStyles.heroDescription}>{summaryText}</p>
            <div className={pageStyles.selectionSummary}>
              <div className={pageStyles.summaryPill}>
                地域: {broadRegionLabels[region as keyof typeof broadRegionLabels]}
              </div>
              <div className={pageStyles.summaryPill}>
                県候補: {Math.max(prefectureOptions.length - 1, 0)}件
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className={pageStyles.section}>
            <div className={`${pageStyles.detailBlock} ${pageStyles.mapSelectionBand}`}>
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
                  地域: {broadRegionLabels[region as keyof typeof broadRegionLabels]}
                </div>
                <div className={pageStyles.summaryPill}>
                  都道府県: {selectedPrefectureOption?.label ?? "未選択"}
                </div>
                <div className={pageStyles.summaryPill}>
                  スポット: {prefectureSpots.length}件
                </div>
              </div>
            </div>
          </section>

          <section className={pageStyles.section}>
            <SectionHeading title="この県のスポット一覧" meta={`${prefectureSpots.length}件`} />
            <MapSpotMiniList
              onSelect={setSelectedSpotId}
              selectedSpotId={selectedSpotId}
              spots={miniListItems}
            />
          </section>

          {relatedWorks.length > 0 ? (
            <section className={pageStyles.section}>
              <SectionHeading title="この県から読みはじめる" meta="作品への入口" />
              <div className={pageStyles.listGrid}>
                {relatedWorks.map(({ spot, work }) => (
                  <Link
                    className={pageStyles.detailBlock}
                    key={`${spot.spot_id}-${work.work_id}`}
                    to={`/works/${work.slug}`}
                  >
                    <div className={pageStyles.heroRegion}>{spot.display_name}</div>
                    <h3 className={pageStyles.spotTitle}>{work.title}</h3>
                    <p className={pageStyles.heroDescription}>
                      {work.heroCopy ?? work.summary_short}
                    </p>
                    <div className={pageStyles.infoLabel}>{work.author}</div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
