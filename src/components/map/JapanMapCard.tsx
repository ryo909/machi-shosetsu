import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import type { Spot } from "../../data/types";
import { buildSpotMapLayout } from "../../lib/mapHelpers";
import { MapPin } from "./MapPin";
import styles from "./Map.module.css";

const mapImageSrc = `${import.meta.env.BASE_URL}images/map-background.jpg`;

type PrefectureMarker = {
  value: string;
  label: string;
  region: string;
  count: number;
  point: { x: number; y: number } | null;
};

type JapanMapCardProps = {
  prefectures: PrefectureMarker[];
  representativeSpots: Spot[];
  selectedRegion: string;
  selectedPrefectureKey: string;
  selectedSpotId?: string | null;
  onSelectPrefecture: (prefectureKey: string) => void;
  onSelectSpot: (spotId: string) => void;
};

type ImageBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const emptyBounds: ImageBounds = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

export function JapanMapCard({
  prefectures,
  representativeSpots,
  selectedRegion,
  selectedPrefectureKey,
  selectedSpotId,
  onSelectPrefecture,
  onSelectSpot,
}: JapanMapCardProps) {
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageBounds, setImageBounds] = useState<ImageBounds>(emptyBounds);

  useEffect(() => {
    const frame = imageBoxRef.current;
    const image = imageRef.current;

    if (!frame || !image) {
      return;
    }

    const updateBounds = () => {
      const frameRect = frame.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();

      setImageBounds({
        left: imageRect.left - frameRect.left,
        top: imageRect.top - frameRect.top,
        width: imageRect.width,
        height: imageRect.height,
      });
    };

    updateBounds();

    const observer = new ResizeObserver(() => updateBounds());
    observer.observe(frame);
    observer.observe(image);
    window.addEventListener("resize", updateBounds);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  const overlayStyle: CSSProperties = {
    left: `${imageBounds.left}px`,
    top: `${imageBounds.top}px`,
    width: `${imageBounds.width}px`,
    height: `${imageBounds.height}px`,
    opacity: imageBounds.width > 0 ? 1 : 0,
  };

  const representativeLayout = useMemo(
    () =>
      imageBounds.width > 0 && imageBounds.height > 0
        ? buildSpotMapLayout(representativeSpots, imageBounds, selectedSpotId)
        : [],
    [imageBounds, representativeSpots, selectedSpotId],
  );

  const visiblePrefectures =
    selectedPrefectureKey !== "all"
      ? prefectures.filter((prefecture) => prefecture.value === selectedPrefectureKey)
      : prefectures;

  return (
    <section className={styles.mapCard}>
      <div className={styles.mapHeader}>
        <span aria-hidden="true" className={styles.mapCompass}>
          N
        </span>
        <span className={styles.mapTitle}>地域から入る文学案内図</span>
      </div>
      <div className={styles.mapFrame}>
        <div className={styles.mapImageBox} ref={imageBoxRef}>
          <img
            alt="日本地図"
            className={styles.mapImage}
            draggable="false"
            onLoad={() => {
              const frame = imageBoxRef.current;
              const image = imageRef.current;

              if (!frame || !image) {
                return;
              }

              const frameRect = frame.getBoundingClientRect();
              const imageRect = image.getBoundingClientRect();

              setImageBounds({
                left: imageRect.left - frameRect.left,
                top: imageRect.top - frameRect.top,
                width: imageRect.width,
                height: imageRect.height,
              });
            }}
            ref={imageRef}
            src={mapImageSrc}
          />
          <div aria-hidden="true" className={styles.mapImageVeil} style={overlayStyle} />

          <div className={styles.prefectureLayer} style={overlayStyle}>
            {visiblePrefectures.map((prefecture) =>
              prefecture.point ? (
                <button
                  aria-label={`${prefecture.label}の文学スポット ${prefecture.count}件`}
                  className={`${styles.prefectureMarker} ${
                    prefecture.value === selectedPrefectureKey
                      ? styles.prefectureMarkerActive
                      : ""
                  } ${
                    selectedRegion !== "all" &&
                    selectedPrefectureKey === "all" &&
                    prefecture.region !== selectedRegion
                      ? styles.prefectureMarkerMuted
                      : ""
                  }`.trim()}
                  key={prefecture.value}
                  onClick={() => onSelectPrefecture(prefecture.value)}
                  style={{
                    left: `${prefecture.point.x * imageBounds.width}px`,
                    top: `${prefecture.point.y * imageBounds.height}px`,
                  }}
                  title={`${prefecture.label} (${prefecture.count}件)`}
                  type="button"
                >
                  <span className={styles.prefectureMarkerCount}>{prefecture.count}</span>
                  <span className={styles.prefectureMarkerLabel}>{prefecture.label}</span>
                </button>
              ) : null,
            )}
          </div>

          {representativeLayout.length > 0 ? (
            <div className={styles.pinsLayer} style={overlayStyle}>
              {representativeLayout.map((item) =>
                item.displayPx ? (
                  <MapPin
                    active={item.spot.spot_id === selectedSpotId}
                    key={item.spot.spot_id}
                    label={item.spot.short_name}
                    onClick={() => onSelectSpot(item.spot.spot_id)}
                    x={item.displayPx.x}
                    y={item.displayPx.y}
                    zIndex={item.zIndex}
                  />
                ) : null,
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.mapStatus}>
        {selectedPrefectureKey === "all"
          ? "地域を絞ってから都道府県を選ぶと、その県の代表スポットだけを地図に重ねて見られます。"
          : `選択中の都道府県では、代表スポット ${representativeLayout.length} 件だけを地図に表示しています。`}
      </div>
    </section>
  );
}
