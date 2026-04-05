import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import type { Spot } from "../../data/types";
import { buildSpotMapLayout } from "../../lib/mapHelpers";
import { MapPin } from "./MapPin";
import styles from "./Map.module.css";

const mapImageSrc = `${import.meta.env.BASE_URL}images/map-background.jpg`;

type JapanMapCardProps = {
  spots: Spot[];
  selectedSpotId?: string | null;
  onSelect: (spotId: string) => void;
  debug?: boolean;
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
  spots,
  selectedSpotId,
  onSelect,
  debug = false,
}: JapanMapCardProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageBounds, setImageBounds] = useState<ImageBounds>(emptyBounds);

  useEffect(() => {
    const frame = frameRef.current;
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

  const mapLayout = useMemo(
    () =>
      imageBounds.width > 0 && imageBounds.height > 0
        ? buildSpotMapLayout(spots, imageBounds, selectedSpotId)
        : [],
    [imageBounds, selectedSpotId, spots],
  );

  const overlayStyle: CSSProperties = {
    left: `${imageBounds.left}px`,
    top: `${imageBounds.top}px`,
    width: `${imageBounds.width}px`,
    height: `${imageBounds.height}px`,
    opacity: imageBounds.width > 0 ? 1 : 0,
  };

  return (
    <section className={styles.mapCard}>
      <div className={styles.mapHeader}>
        <span className={styles.mapCompass} aria-hidden="true">N</span>
        <span className={styles.mapTitle}>文学スポットマップ</span>
      </div>
      <div className={styles.mapFrame} ref={frameRef}>
        <img
          alt="日本地図"
          className={styles.mapImage}
          draggable="false"
          onLoad={() => {
            const frame = frameRef.current;
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
        <div className={styles.mapImageVeil} style={overlayStyle} aria-hidden="true" />
        {debug && imageBounds.width > 0 ? (
          <svg className={styles.debugLayer} style={overlayStyle} viewBox={`0 0 ${imageBounds.width} ${imageBounds.height}`}>
            {mapLayout.map((item) =>
              item.basePx && item.displayPx ? (
                <g key={`debug-line-${item.spot.spot_id}`}>
                  <line
                    className={styles.debugLine}
                    x1={item.basePx.x}
                    x2={item.displayPx.x}
                    y1={item.basePx.y}
                    y2={item.displayPx.y}
                  />
                  <circle className={styles.debugDot} cx={item.basePx.x} cy={item.basePx.y} r="3.5" />
                </g>
              ) : null,
            )}
          </svg>
        ) : null}
        <div className={styles.pinsLayer} style={overlayStyle}>
          {mapLayout.map((item) =>
            item.displayPx ? (
              <div className={styles.pinCluster} key={item.spot.spot_id}>
                <MapPin
                  active={item.spot.spot_id === selectedSpotId}
                  label={item.spot.display_name}
                  onClick={() => onSelect(item.spot.spot_id)}
                  x={item.displayPx.x}
                  y={item.displayPx.y}
                  zIndex={item.zIndex}
                />
                {debug && item.basePx ? (
                  <div
                    className={styles.debugLabel}
                    style={{
                      left: `${Math.min(item.displayPx.x + 10, imageBounds.width - 148)}px`,
                      top: `${Math.max(item.displayPx.y - 64, 6)}px`,
                      zIndex: item.zIndex + 1,
                    }}
                  >
                    <strong>{item.spot.short_name}</strong>
                    <span>{item.source}</span>
                    <span>
                      base {item.basePx.x.toFixed(1)}, {item.basePx.y.toFixed(1)}
                    </span>
                    <span>
                      display {item.displayPx.x.toFixed(1)}, {item.displayPx.y.toFixed(1)}
                    </span>
                    <span>
                      lat/lng {item.spot.lat ?? "-"}, {item.spot.lng ?? "-"}
                    </span>
                    <span>
                      fine {item.spot.fine_dx ?? 0}, {item.spot.fine_dy ?? 0}
                    </span>
                    <span>{item.collisionAdjusted ? "collision adjusted" : "base only"}</span>
                  </div>
                ) : null}
              </div>
            ) : null,
          )}
        </div>
      </div>
      {debug ? (
        <div className={styles.debugPanel}>
          <div className={styles.debugPanelTitle}>Map Debug</div>
          <div className={styles.debugPanelMeta}>
            赤点が本来位置、ピンが表示位置です。必要なら `fine_dx / fine_dy` を微調整に使えます。
          </div>
        </div>
      ) : null}
    </section>
  );
}
