import { Link } from "react-router-dom";

import { FeaturedSpotCard } from "../../components/cards/FeaturedSpotCard";
import { ActionButton } from "../../components/common/ActionButton";
import { HeroSection } from "../../components/common/HeroSection";
import { SectionHeading } from "../../components/common/SectionHeading";
import { getRecommendedSpots, getRepresentativeWorkForSpot } from "../../lib/selectors";
import { APP_COPY, APP_NAME, APP_TAGLINE } from "../../lib/site";
import { regionOptions } from "../../styles/tokens";
import pageStyles from "../../styles/pages.module.css";

const regionAccents: Record<string, string> = {
  kyoto: "rgba(179, 138, 87, 0.12)",
  kanagawa: "rgba(93, 118, 136, 0.1)",
  hiroshima: "rgba(138, 160, 144, 0.1)",
  ehime: "rgba(169, 123, 108, 0.1)",
  hokkaido: "rgba(107, 124, 94, 0.1)",
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
        eyebrow={APP_NAME}
        text="住んでいる街にも、旅先にも。その場所にゆかりの一冊がきっとある。景色から入り、読みたくなる理由まで受け取れる文学案内です。"
        title={APP_COPY}
      />

      <section className={pageStyles.section}>
        <SectionHeading title="はじめてなら" meta="最初の一歩を選ぶ" />
        <div className={pageStyles.onboardingGrid}>
          <Link className={`${pageStyles.detailBlock} ${pageStyles.onboardingCardPrimary}`} to="/spots">
            <div className={pageStyles.heroRegion}>まずはここから</div>
            <h2 className={pageStyles.heroTitle}>スポット一覧から入る</h2>
            <p className={pageStyles.heroDescription}>
              地域と都道府県を選びながら、気になる場所をひとつ決めて読む流れです。初回はここから始めると、アプリ全体の使い方がつかみやすくなります。
            </p>
            <div className={pageStyles.supportMeta}>
              <strong>向いている人</strong>
              まず一冊に出会いたい / 迷わず進みたい
            </div>
          </Link>
          <div className={pageStyles.detailBlock}>
            <div className={pageStyles.heroRegion}>もうひとつの入口</div>
            <h2 className={pageStyles.spotTitle}>地図から空気で選ぶ</h2>
            <p className={pageStyles.heroDescription}>
              地域から都道府県をたどり、旅先や地元の気配から入る導線です。どの県にスポットがあるかを眺めながら決めたいときに向いています。
            </p>
            <div className={pageStyles.supportMeta}>
              <strong>向いている人</strong>
              旅先から探したい / 県ごとに見比べたい
            </div>
            <div className={pageStyles.ctaRow}>
              <Link className="pillLink secondary" to="/map">
                地図から探す
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={pageStyles.section}>
        <div className={pageStyles.brandLead}>{APP_TAGLINE}</div>
        <SectionHeading title="まずはここから" meta="はじめてでも入りやすいスポット" />
        <p className={pageStyles.sectionLead}>
          迷ったら、この4件から始めるのが自然です。場所の空気と、次に読みたくなる一冊のつながりがつかみやすい入口を並べています。
        </p>
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
        <SectionHeading title="地域ショートカット" meta="気になる都道府県から選ぶ" />
        <div className={pageStyles.grid}>
          {regionShortcuts.map((region) => (
            <Link
              className={pageStyles.detailBlock}
              key={region.value}
              style={{ background: regionAccents[region.value] || undefined }}
              to={`/spots?region=${region.value}`}
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
