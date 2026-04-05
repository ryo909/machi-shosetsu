import { Link } from "react-router-dom";

import { FeaturedSpotCard } from "../../components/cards/FeaturedSpotCard";
import { ActionButton } from "../../components/common/ActionButton";
import { HeroSection } from "../../components/common/HeroSection";
import { SectionHeading } from "../../components/common/SectionHeading";
import { getRecommendedSpots, getRepresentativeWorkForSpot } from "../../lib/selectors";
import { regionOptions } from "../../styles/tokens";
import pageStyles from "../../styles/pages.module.css";

const regionAccents: Record<string, string> = {
  kyoto: "rgba(179, 138, 87, 0.12)",
  kamakura: "rgba(93, 118, 136, 0.1)",
  onomichi: "rgba(138, 160, 144, 0.1)",
  dogo: "rgba(169, 123, 108, 0.1)",
  otaru: "rgba(107, 124, 94, 0.1)",
  tokyo: "rgba(136, 113, 90, 0.1)",
};

export function HomePage() {
  const recommendedSpots = getRecommendedSpots(4);
  const regionShortcuts = regionOptions.filter((option) => option.value !== "all");

  return (
    <div className={pageStyles.page}>
      <HeroSection
        actions={
          <>
            <ActionButton to="/spots">地域から探す</ActionButton>
            <ActionButton to="/map" variant="secondary">
              地図から探す
            </ActionButton>
          </>
        }
        eyebrow="場所から出会う小説案内"
        text="住んでいる街にも、旅先にも。その場所にゆかりの一冊がきっとある。景色から入り、読みたくなる理由まで受け取れる文学案内です。"
        title="この街を、物語で歩く。"
      />

      <section className={pageStyles.section}>
        <SectionHeading title="まずはここから" meta="はじめてでも入りやすいスポット" />
        <div className={pageStyles.horizontalScroll}>
          {recommendedSpots.map((spot) => {
            const representativeWork = getRepresentativeWorkForSpot(spot.spot_id);
            return (
              <FeaturedSpotCard
                key={spot.spot_id}
                representativeWorkTitle={representativeWork?.title ?? "作品準備中"}
                spot={spot}
              />
            );
          })}
        </div>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="地域ショートカット" meta="気分の近い街から選ぶ" />
        <div className={pageStyles.grid}>
          {regionShortcuts.map((region) => (
            <Link
              className={pageStyles.detailBlock}
              key={region.value}
              to={`/spots?region=${region.value}`}
              style={{ background: regionAccents[region.value] || undefined }}
            >
              <div className={pageStyles.heroRegion}>{region.label}</div>
              <div className={pageStyles.heroDescription}>
                {region.label}から、まず読みたくなる一冊を探す
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="あとで読みたいを残す" />
        <Link className={pageStyles.detailBlock} to="/saved">
          <div className={pageStyles.heroRegion}>保存一覧</div>
          <h2 className={pageStyles.heroTitle}>自分の棚に、気になる場所と作品を置いておく</h2>
          <p className={pageStyles.heroDescription}>
            詳細画面から保存しておけば、旅の途中でも帰ってからでも、次の一冊に戻りやすくなります。
          </p>
        </Link>
      </section>
    </div>
  );
}
