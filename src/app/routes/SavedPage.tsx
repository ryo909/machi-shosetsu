import { Link } from "react-router-dom";
import { useState } from "react";

import { TabSwitcher } from "../../components/common/TabSwitcher";
import { Header } from "../../components/layout/Header";
import { getRepresentativeWorkForSpot, getRelationsForSpot, getSavedSpotsByIds, getSavedWorksByIds } from "../../lib/selectors";
import { useSavedSpots, useSavedWorks } from "../../lib/useSavedItems";
import pageStyles from "../../styles/pages.module.css";

export function SavedPage() {
  const [tab, setTab] = useState("spots");
  const { savedSpotIds } = useSavedSpots();
  const { savedWorkIds } = useSavedWorks();
  const savedSpots = getSavedSpotsByIds(savedSpotIds);
  const savedWorks = getSavedWorksByIds(savedWorkIds);
  const tabs = [
    { value: "spots", label: `保存した場所 (${savedSpots.length})` },
    { value: "works", label: `保存した作品 (${savedWorks.length})` },
  ];

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
        <div className={pageStyles.detailBlock}>
          <div className={pageStyles.heroRegion}>自分の棚</div>
          <h2 className={pageStyles.spotTitle}>あとで歩く場所と、あとで読む一冊を残しておく</h2>
          <p className={pageStyles.heroDescription}>
            旅先で見つけた場所も、気になった作品も、保存しておけば次に開く入口が残ります。読みかけの気分を途切れさせずに戻れる場所です。
          </p>
          <div className={pageStyles.selectionSummary}>
            <div className={pageStyles.summaryPill}>場所: {savedSpots.length}件</div>
            <div className={pageStyles.summaryPill}>作品: {savedWorks.length}件</div>
          </div>
        </div>
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
            <div className={pageStyles.detailBlock}>
              <div className={pageStyles.heroRegion}>まだ保存はありません</div>
              <p className={pageStyles.heroDescription}>
                気になる場所を残しておくと、次に歩きたい街からすぐ読み直せます。まずはスポット一覧から、自分の棚に一件置いてみてください。
              </p>
            </div>
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
          <div className={pageStyles.detailBlock}>
            <div className={pageStyles.heroRegion}>まだ保存はありません</div>
            <p className={pageStyles.heroDescription}>
              作品を保存しておくと、次に読みたくなったときに場所との関係ごと思い出せます。スポット詳細や作品詳細から残しておけます。
            </p>
          </div>
        )}
      </section>

      <section className={pageStyles.section}>
        <div className={pageStyles.ctaRow}>
          <Link className="pillLink" to="/spots">
            スポットを探す
          </Link>
          <Link className="pillLink secondary" to="/">
            トップへ戻る
          </Link>
        </div>
      </section>
    </div>
  );
}
