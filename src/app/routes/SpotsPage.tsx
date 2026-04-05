import { useSearchParams } from "react-router-dom";

import { SpotCard } from "../../components/cards/SpotCard";
import { RegionChipGroup } from "../../components/common/RegionChipGroup";
import { Header } from "../../components/layout/Header";
import { getPublishedSpots, getRepresentativeWorkForSpot, getRelationsForSpot } from "../../lib/selectors";
import { regionOptions } from "../../styles/tokens";
import pageStyles from "../../styles/pages.module.css";

export function SpotsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region") ?? "all";
  const visibleSpots = getPublishedSpots(region);

  return (
    <div className={pageStyles.page}>
      <Header
        description="街の気分から場所を選び、その先の一冊へつなげます。名所検索ではなく、読みたくなる入口として並べています。"
        eyebrow="スポット一覧"
        title="場所から一冊を選ぶ"
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
        <div className={pageStyles.stack}>
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
