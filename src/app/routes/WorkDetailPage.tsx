import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";

import { RelationBadge } from "../../components/badges/RelationBadge";
import { SaveButton } from "../../components/common/SaveButton";
import { SectionHeading } from "../../components/common/SectionHeading";
import { Header } from "../../components/layout/Header";
import { getSpotBySlug, getWorkBySlug, getWorkSpotPairs } from "../../lib/selectors";
import { useSavedWorks } from "../../lib/useSavedItems";
import pageStyles from "../../styles/pages.module.css";

const audienceCopyMap: Record<string, string[]> = {
  kinkakuji: ["京都を名所ではなく、美しさの圧で読みたい人"],
  koto: ["旅先の余韻を、季節や町の時間ごと持ち帰りたい人"],
  "yama-no-oto": ["静かな会話や沈黙の温度に惹かれる人"],
  "kyogen-no-kami": ["少し肩の力を抜いて文学に触れたい人"],
  "ningen-shikkaku": ["海辺の開放感と内面の落差を味わいたい人"],
  "anya-koro": ["歩きながら考える読書時間が好きな人"],
  horoki: ["生活の熱や移動の勢いに背中を押されたい人"],
  botchan: ["まずは読みやすい近代文学から入りたい人"],
  "yuki-no-machi": ["街の陰影や少し冷たい空気に惹かれる人"],
  "onihei-hankacho": ["下町の人情と粋を楽しみたい人"],
  "kenkaku-shobai": ["会話や食まで含めて江戸を味わいたい人"],
};

export function WorkDetailPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const work = getWorkBySlug(slug);
  const contextSpotSlug = searchParams.get("spot");
  const contextSpot = getSpotBySlug(contextSpotSlug ?? undefined);
  const { isSaved, toggle } = useSavedWorks();

  if (!work) {
    return <Navigate replace to="/spots" />;
  }

  const spotPairs = getWorkSpotPairs(work.work_id);
  const activePair =
    (contextSpot
      ? spotPairs.find((pair) => pair.spot.spot_id === contextSpot.spot_id)
      : undefined) ??
    spotPairs.find((pair) => pair.relation.is_anchor) ??
    spotPairs[0];

  const audienceCopy = audienceCopyMap[work.slug] ?? ["場所から物語に入りたい人"];

  return (
    <div className={pageStyles.page}>
      <Header
        actions={<SaveButton active={isSaved(work.work_id)} onClick={() => toggle(work.work_id)} />}
        backLabel={activePair ? `${activePair.spot.short_name}へ戻る` : "スポット一覧へ"}
        backTo={activePair ? `/spots/${activePair.spot.slug}` : "/spots"}
        eyebrow="作品詳細"
        title={work.title}
      />

      <section className={pageStyles.heroPanel}>
        <div className={pageStyles.heroRegion}>{work.author}</div>
        <h2 className={pageStyles.heroTitle}>{work.summary_short}</h2>
        <p className={pageStyles.heroDescription}>
          {work.era_label} / {work.year_label}
        </p>
      </section>

      {activePair ? (
        <section className={pageStyles.section}>
          <SectionHeading title="この場所との関係" />
          <article className={pageStyles.detailBlock}>
            <div className={pageStyles.infoList}>
              <div className={pageStyles.infoItem}>
                <div className={pageStyles.infoLabel}>場所</div>
                <div className={pageStyles.infoValue}>{activePair.spot.display_name}</div>
              </div>
              <div className={pageStyles.infoItem}>
                <div className={pageStyles.infoLabel}>関係</div>
                <div className={pageStyles.infoValue}>
                  <RelationBadge type={activePair.relation.relation_type} />
                </div>
              </div>
              <div className={pageStyles.infoItem}>
                <div className={pageStyles.infoLabel}>案内文</div>
                <div className={pageStyles.infoValue}>{activePair.relation.card_copy}</div>
              </div>
              <div className={pageStyles.infoItem}>
                <div className={pageStyles.infoLabel}>読みはじめの温度</div>
                <div className={pageStyles.infoValue}>{activePair.relation.detail_intro}</div>
              </div>
            </div>
          </article>
        </section>
      ) : null}

      <section className={pageStyles.section}>
        <SectionHeading title="こんな人に" />
        <div className={pageStyles.stack}>
          {audienceCopy.map((text) => (
            <article className={pageStyles.detailBlock} key={text}>
              <div className={pageStyles.infoValue}>{text}</div>
            </article>
          ))}
        </div>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="関連する場所" meta={`${spotPairs.length}スポット`} />
        <div className={pageStyles.subGrid}>
          {spotPairs.map((pair) => (
            <Link className={pageStyles.detailBlock} key={pair.relation.relation_id} to={`/spots/${pair.spot.slug}`}>
              <div className={pageStyles.heroRegion}>{pair.spot.parent_area}</div>
              <h3 className={pageStyles.spotTitle}>{pair.spot.display_name}</h3>
              <p className={pageStyles.heroDescription}>{pair.spot.list_copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={pageStyles.section}>
        <SectionHeading title="次の動き" />
        <div className={pageStyles.ctaRow}>
          {activePair ? (
            <Link className="pillLink" to={`/spots/${activePair.spot.slug}`}>
              この場所へ戻る
            </Link>
          ) : null}
          <Link className="pillLink secondary" to="/saved">
            保存一覧を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
