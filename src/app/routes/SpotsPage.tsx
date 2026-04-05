import { useSearchParams } from "react-router-dom";

import { SpotCard } from "../../components/cards/SpotCard";
import { RegionChipGroup } from "../../components/common/RegionChipGroup";
import { Header } from "../../components/layout/Header";
import {
  getAvailablePrefectureOptions,
  getAvailableRegionOptions,
  getPublishedSpots,
  getRepresentativeWorkForSpot,
  getRelationsForSpot,
} from "../../lib/selectors";
import { isBroadRegionKey } from "../../lib/regions";
import pageStyles from "../../styles/pages.module.css";

export function SpotsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawRegion = searchParams.get("region");
  const rawPrefecture = searchParams.get("prefecture");
  const region = isBroadRegionKey(rawRegion) ? rawRegion : "all";
  const prefecture = rawPrefecture ?? (!isBroadRegionKey(rawRegion) && rawRegion ? rawRegion : "all");
  const visibleSpots = getPublishedSpots({
    prefecture,
    region,
  });
  const regionOptions = getAvailableRegionOptions();
  const prefectureOptions = [
    { value: "all", label: "すべて" },
    ...getAvailablePrefectureOptions(region),
  ];
  const regionLabel =
    regionOptions.find((option) => option.value === region)?.label ?? "すべて";
  const prefectureLabel =
    prefectureOptions.find((option) => option.value === prefecture)?.label ?? "すべて";

  return (
    <div className={pageStyles.page}>
      <Header
        breadcrumbs={[
          { label: "ホーム", to: "/" },
          { label: "スポット一覧" },
        ]}
        description="街の気分から場所を選び、その先の一冊へつなげます。名所検索ではなく、読みたくなる入口として並べています。"
        eyebrow="スポット一覧"
        title="場所から一冊を選ぶ"
      />

      <section className={pageStyles.sectionTight}>
        <div className={pageStyles.filterStack}>
          <div>
            <div className={pageStyles.filterLabel}>広域地域から絞る</div>
            <p className={pageStyles.filterHelp}>
              まずは大きな地域感から決めると、候補が見やすくなります。
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
            <div className={pageStyles.filterLabel}>都道府県から絞る</div>
            <p className={pageStyles.filterHelp}>
              同じ県の中で、どの場所から一冊へ入りたいかを比べられます。
            </p>
            <RegionChipGroup
              onChange={(nextPrefecture) => {
                const next = new URLSearchParams(searchParams);
                if (nextPrefecture === "all") {
                  next.delete("prefecture");
                } else {
                  next.set("prefecture", nextPrefecture);
                }
                setSearchParams(next, { replace: true });
              }}
              options={prefectureOptions}
              value={prefecture}
            />
          </div>
          <div className={pageStyles.selectionSummary}>
            <div className={pageStyles.summaryPill}>地域: {regionLabel}</div>
            <div className={pageStyles.summaryPill}>都道府県: {prefectureLabel}</div>
            <div className={pageStyles.summaryPill}>スポット: {visibleSpots.length}件</div>
          </div>
        </div>
      </section>

      <section className={pageStyles.section}>
        <p className={pageStyles.sectionLead}>
          まず場所を選び、その先にある代表作品から読みはじめます。検索よりも、場所の雰囲気で選びたい人向けの並びです。
        </p>
        <div className={pageStyles.listGrid}>
          {visibleSpots.map((spot) => {
            const representativeWork = getRepresentativeWorkForSpot(spot.spot_id);
            const workCount = getRelationsForSpot(spot.spot_id).length;

            return (
              <SpotCard
                key={spot.spot_id}
                representativeWorkTitle={representativeWork?.title ?? "作品準備中"}
                spot={spot}
                workCount={workCount}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
