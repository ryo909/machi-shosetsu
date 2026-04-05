import { Link, Navigate, useParams } from "react-router-dom";

import { AnchorWorkCard } from "../../components/cards/AnchorWorkCard";
import { RelatedWorkCard } from "../../components/cards/RelatedWorkCard";
import { EmptyState } from "../../components/common/EmptyState";
import { SaveButton } from "../../components/common/SaveButton";
import { SectionHeading } from "../../components/common/SectionHeading";
import { Header } from "../../components/layout/Header";
import {
  getRelatedSpotsForSpot,
  getSpotBySlug,
  getSpotWorkPairs,
} from "../../lib/selectors";
import { useSavedSpots } from "../../lib/useSavedItems";
import pageStyles from "../../styles/pages.module.css";

export function SpotDetailPage() {
  const { slug } = useParams();
  const spot = getSpotBySlug(slug);
  const { isSaved, toggle } = useSavedSpots();

  if (!spot) {
    return <Navigate replace to="/spots" />;
  }

  const workPairs = getSpotWorkPairs(spot.spot_id);
  const anchorPair = workPairs.find((pair) => pair.relation.is_anchor) ?? workPairs[0];
  const relatedPairs = workPairs.filter((pair) => pair.relation.relation_id !== anchorPair?.relation.relation_id);
  const relatedSpots = getRelatedSpotsForSpot(spot);
  const heroCopy = spot.heroCopy ?? spot.list_copy;
  const placeIntro = spot.placeIntro ?? spot.description;
  const readingEntry = spot.readingEntry ?? anchorPair?.relation.detail_intro ?? spot.list_copy;
  const firstBookReason =
    spot.firstBookReason ??
    anchorPair?.relation.why_here ??
    anchorPair?.relation.card_copy ??
    "この場所の空気から、そのまま作品へ入りやすい一冊です。";

  return (
    <div className={pageStyles.page}>
      <Header
        actions={<SaveButton active={isSaved(spot.spot_id)} onClick={() => toggle(spot.spot_id)} />}
        backLabel="スポット一覧へ"
        backTo="/spots"
        breadcrumbs={[
          { label: "ホーム", to: "/" },
          { label: "スポット一覧", to: "/spots" },
          { label: spot.display_name },
        ]}
        eyebrow="文学スポット"
        title={spot.display_name}
      />

      <section className={`${pageStyles.heroPanel} ${pageStyles.heroPanelSpot}`}>
        <div className={`${pageStyles.pageKind} ${pageStyles.pageKindSpot}`}>文学スポット</div>
        <div className={pageStyles.heroRegion}>{spot.parent_area}</div>
        <h2 className={pageStyles.heroTitle}>{spot.display_name}</h2>
        <div className={pageStyles.heroMetaRow}>
          <div className={pageStyles.heroMetaPill}>{spot.category}</div>
          <div className={pageStyles.heroMetaPill}>{spot.city}</div>
        </div>
        <p className={pageStyles.heroLead}>{heroCopy}</p>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="この場所について" meta="空気ごと読書の入口にする" />
        <article className={pageStyles.detailBlock}>
          <div className={pageStyles.infoList}>
            <div className={pageStyles.infoItem}>
              <div className={pageStyles.infoLabel}>場所の魅力</div>
              <div className={pageStyles.infoValue}>{placeIntro}</div>
            </div>
          </div>
        </article>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="この場所からどう読む" meta="場所から作品へ入る助走" />
        <article className={pageStyles.detailBlock}>
          <div className={pageStyles.infoList}>
            <div className={pageStyles.infoItem}>
              <div className={pageStyles.infoLabel}>読書の入口</div>
              <div className={pageStyles.infoValue}>{readingEntry}</div>
            </div>
          </div>
        </article>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="まずはこの一冊" meta="場所から作品へ入る" />
        <article className={pageStyles.detailBlock}>
          <div className={pageStyles.infoList}>
            <div className={pageStyles.infoItem}>
              <div className={pageStyles.infoLabel}>最初にすすめたい理由</div>
              <div className={pageStyles.infoValue}>{firstBookReason}</div>
            </div>
          </div>
        </article>
        {anchorPair ? (
          <AnchorWorkCard
            ctaLabel="この作品を見る"
            relation={anchorPair.relation}
            spotSlug={spot.slug}
            work={anchorPair.work}
          />
        ) : null}
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="この場所でもう少し読む" meta={`${workPairs.length}作品`} />
        {relatedPairs.length > 0 ? (
          <div className={pageStyles.stack}>
            {relatedPairs.map((pair) => (
              <RelatedWorkCard
                ctaLabel="作品案内を見る"
                key={pair.relation.relation_id}
                relation={pair.relation}
                spotSlug={spot.slug}
                work={pair.work}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="このスポットでは、まずはこの一冊から読むのがおすすめです。" />
        )}
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="同じ地域でもう少し歩く" />
        <div className={pageStyles.subGrid}>
          {relatedSpots.map((relatedSpot) => (
            <Link className={pageStyles.detailBlock} key={relatedSpot.spot_id} to={`/spots/${relatedSpot.slug}`}>
              <div className={pageStyles.heroRegion}>{relatedSpot.parent_area}</div>
              <h3 className={pageStyles.spotTitle}>{relatedSpot.display_name}</h3>
              <p className={pageStyles.heroDescription}>{relatedSpot.list_copy}</p>
            </Link>
          ))}
        </div>
        <div className={pageStyles.ctaRow}>
          <Link className="pillLink secondary" to="/">
            トップへ戻る
          </Link>
          <Link className="textLink" to="/spots">
            スポット一覧へ戻る
          </Link>
        </div>
      </section>
    </div>
  );
}
