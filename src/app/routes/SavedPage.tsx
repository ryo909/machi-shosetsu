import { Link } from "react-router-dom";
import { useState } from "react";

import { EmptyState } from "../../components/common/EmptyState";
import { TabSwitcher } from "../../components/common/TabSwitcher";
import { Header } from "../../components/layout/Header";
import { getRepresentativeWorkForSpot, getRelationsForSpot, getSavedSpotsByIds, getSavedWorksByIds } from "../../lib/selectors";
import { useSavedSpots, useSavedWorks } from "../../lib/useSavedItems";
import pageStyles from "../../styles/pages.module.css";

const tabs = [
  { value: "spots", label: "保存した場所" },
  { value: "works", label: "保存した作品" },
];

export function SavedPage() {
  const [tab, setTab] = useState("spots");
  const { savedSpotIds } = useSavedSpots();
  const { savedWorkIds } = useSavedWorks();
  const savedSpots = getSavedSpotsByIds(savedSpotIds);
  const savedWorks = getSavedWorksByIds(savedWorkIds);

  return (
    <div className={pageStyles.page}>
      <Header
        breadcrumbs={[
          { label: "ホーム", to: "/" },
          { label: "保存一覧" },
        ]}
        description="気になった場所と作品を、あとで読むための自分の棚として残せます。"
        eyebrow="保存一覧"
        title="あとで歩く、あとで読む"
      />

      <section className={pageStyles.savedTabs}>
        <TabSwitcher onChange={setTab} tabs={tabs} value={tab} />
      </section>

      <section className={pageStyles.section}>
        {tab === "spots" ? (
          savedSpots.length > 0 ? (
            <div className={pageStyles.stack}>
              {savedSpots.map((spot) => (
                <Link
                  className={`${pageStyles.detailBlock} ${pageStyles.savedItem}`}
                  key={spot.spot_id}
                  to={`/spots/${spot.slug}`}
                >
                  <div className={pageStyles.heroRegion}>{spot.parent_area}</div>
                  <h3 className={pageStyles.spotTitle}>{spot.display_name}</h3>
                  <p className={pageStyles.heroDescription}>{spot.list_copy}</p>
                  <div className={pageStyles.infoLabel}>
                    代表作品: {getRepresentativeWorkForSpot(spot.spot_id)?.title ?? "作品準備中"} /{" "}
                    {getRelationsForSpot(spot.spot_id).length}作品
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState message="まだ保存はありません。気になる場所や作品を見つけたら、あとで読めるように残しておけます。" />
          )
        ) : savedWorks.length > 0 ? (
          <div className={pageStyles.stack}>
            {savedWorks.map((work) => (
              <Link
                className={`${pageStyles.detailBlock} ${pageStyles.savedItem}`}
                key={work.work_id}
                to={`/works/${work.slug}`}
              >
                <div className={pageStyles.heroRegion}>{work.author}</div>
                <h3 className={pageStyles.spotTitle}>{work.title}</h3>
                <p className={pageStyles.heroDescription}>{work.summary_short}</p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState message="まだ保存はありません。気になる場所や作品を見つけたら、あとで読めるように残しておけます。" />
        )}
      </section>

      <section className={pageStyles.section}>
        <div className={pageStyles.ctaRow}>
          <Link className="pillLink secondary" to="/">
            トップへ戻る
          </Link>
          <Link className="pillLink" to="/spots">
            スポットを探す
          </Link>
        </div>
      </section>
    </div>
  );
}
