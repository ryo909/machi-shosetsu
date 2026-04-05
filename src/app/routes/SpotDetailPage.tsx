import { Link, Navigate, useParams } from "react-router-dom";

import { AnchorWorkCard } from "../../components/cards/AnchorWorkCard";
import { RelatedWorkCard } from "../../components/cards/RelatedWorkCard";
import { EmptyState } from "../../components/common/EmptyState";
import { SaveButton } from "../../components/common/SaveButton";
import { SectionHeading } from "../../components/common/SectionHeading";
import { Header } from "../../components/layout/Header";
import {
  getRelatedSpotsForSpot,
  getRelationsForSpot,
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
  const whyHereItems = getRelationsForSpot(spot.spot_id).slice(0, 2);

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
        <h2 className={pageStyles.heroTitle}>{spot.list_copy}</h2>
        <div className={pageStyles.heroMetaRow}>
          <div className={pageStyles.heroMetaPill}>{spot.category}</div>
          <div className={pageStyles.heroMetaPill}>{spot.city}</div>
        </div>
        <p className={pageStyles.heroLead}>{spot.description}</p>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="この場所について" meta="空気ごと読書の入口にする" />
        <article className={pageStyles.detailBlock}>
          <div className={pageStyles.infoList}>
            <div className={pageStyles.infoItem}>
              <div className={pageStyles.infoLabel}>場所の魅力</div>
              <div className={pageStyles.infoValue}>{spot.description}</div>
            </div>
            <div className={pageStyles.infoItem}>
              <div className={pageStyles.infoLabel}>まず感じたいこと</div>
              <div className={pageStyles.infoValue}>{spot.list_copy}</div>
            </div>
          </div>
        </article>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="この場所と物語" meta="現地で読む理由を先に知る" />
        <div className={pageStyles.stack}>
          {whyHereItems.map((item) => (
            <article className={pageStyles.detailBlock} key={item.relation_id}>
              <div className={pageStyles.infoList}>
                <div className={pageStyles.infoItem}>
                  <div className={pageStyles.infoLabel}>読みどころ</div>
                  <div className={pageStyles.infoValue}>{item.why_here}</div>
                </div>
                {item.editor_note ? (
                  <div className={pageStyles.infoItem}>
                    <div className={pageStyles.infoLabel}>案内メモ</div>
                    <div className={pageStyles.infoValue}>{item.editor_note}</div>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="まずはこの一冊" meta="場所から作品へ入る" />
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
