import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";

import type { Spot } from "../../data/types";
import { buildSpotMapLayout, formatDisplayPatch, type MapPoint } from "../../lib/mapHelpers";
import { MapPin } from "./MapPin";
import styles from "./Map.module.css";

const mapImageSrc = `${import.meta.env.BASE_URL}images/map-background.jpg`;
const keyboardNudge = 0.002;
const keyboardNudgeLarge = 0.006;

type JapanMapCardProps = {
  spots: Spot[];
  selectedSpotId?: string | null;
  onSelect: (spotId: string) => void;
  debug?: boolean;
  calibrate?: boolean;
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundRatio(value: number) {
  return Math.round(value * 10000) / 10000;
}

export function JapanMapCard({
  spots,
  selectedSpotId,
  onSelect,
  debug = false,
  calibrate = false,
}: JapanMapCardProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageBounds, setImageBounds] = useState<ImageBounds>(emptyBounds);
  const [calibrationPoint, setCalibrationPoint] = useState<MapPoint | null>(null);

  const selectedSpot = selectedSpotId
    ? spots.find((spot) => spot.spot_id === selectedSpotId) ?? null
    : null;

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

  useEffect(() => {
    if (!calibrate || !selectedSpot) {
      setCalibrationPoint(null);
      return;
    }

    const initialX =
      selectedSpot.display_x ?? (selectedSpot.map_x !== null ? selectedSpot.map_x / 100 : null);
    const initialY =
      selectedSpot.display_y ?? (selectedSpot.map_y !== null ? selectedSpot.map_y / 100 : null);

    if (initialX !== null && initialY !== null) {
      setCalibrationPoint({ x: initialX, y: initialY });
      return;
    }

    setCalibrationPoint(null);
  }, [calibrate, selectedSpot]);

  useEffect(() => {
    if (!calibrate || !selectedSpot) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) {
        return;
      }

      const step = event.shiftKey ? keyboardNudgeLarge : keyboardNudge;

      setCalibrationPoint((current) => {
        const base = current ?? {
          x: selectedSpot.display_x ?? 0.5,
          y: selectedSpot.display_y ?? 0.5,
        };

        switch (event.key) {
          case "ArrowUp":
            event.preventDefault();
            return { x: base.x, y: roundRatio(clamp(base.y - step, 0, 1)) };
          case "ArrowDown":
            event.preventDefault();
            return { x: base.x, y: roundRatio(clamp(base.y + step, 0, 1)) };
          case "ArrowLeft":
            event.preventDefault();
            return { x: roundRatio(clamp(base.x - step, 0, 1)), y: base.y };
          case "ArrowRight":
            event.preventDefault();
            return { x: roundRatio(clamp(base.x + step, 0, 1)), y: base.y };
          default:
            return current;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calibrate, selectedSpot]);

  const mapLayout = useMemo(
    () =>
      imageBounds.width > 0 && imageBounds.height > 0
        ? buildSpotMapLayout(
            spots,
            imageBounds,
            selectedSpotId,
            calibrate && selectedSpotId && calibrationPoint
              ? { spotId: selectedSpotId, point: calibrationPoint }
              : null,
          )
        : [],
    [calibrate, calibrationPoint, imageBounds, selectedSpotId, spots],
  );

  const selectedLayout = selectedSpotId
    ? mapLayout.find((item) => item.spot.spot_id === selectedSpotId) ?? null
    : null;

  const overlayStyle: CSSProperties = {
    left: `${imageBounds.left}px`,
    top: `${imageBounds.top}px`,
    width: `${imageBounds.width}px`,
    height: `${imageBounds.height}px`,
    opacity: imageBounds.width > 0 ? 1 : 0,
  };

  const calibrationPatch =
    selectedSpot && calibrationPoint ? formatDisplayPatch(selectedSpot, calibrationPoint) : "";

  const currentDisplayRatio =
    selectedLayout?.displayPx && imageBounds.width > 0 && imageBounds.height > 0
      ? {
          x: roundRatio(selectedLayout.displayPx.x / imageBounds.width),
          y: roundRatio(selectedLayout.displayPx.y / imageBounds.height),
        }
      : null;

  const handleCalibrationClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!calibrate || !selectedSpot || !imageBounds.width || !imageBounds.height) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("button")) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);

    setCalibrationPoint({
      x: roundRatio(x),
      y: roundRatio(y),
    });
  };

  const nudgeCalibration = (dx: number, dy: number) => {
    if (!selectedSpot) {
      return;
    }

    setCalibrationPoint((current) => {
      const base = current ?? {
        x: selectedSpot.display_x ?? 0.5,
        y: selectedSpot.display_y ?? 0.5,
      };

      return {
        x: roundRatio(clamp(base.x + dx, 0, 1)),
        y: roundRatio(clamp(base.y + dy, 0, 1)),
      };
    });
  };

  const resetToCurrent = () => {
    if (!selectedSpot) {
      return;
    }

    if (selectedSpot.display_x !== null && selectedSpot.display_x !== undefined && selectedSpot.display_y !== null && selectedSpot.display_y !== undefined) {
      setCalibrationPoint({
        x: roundRatio(selectedSpot.display_x),
        y: roundRatio(selectedSpot.display_y),
      });
      return;
    }

    if (selectedLayout?.projectedRatio) {
      setCalibrationPoint({
        x: roundRatio(selectedLayout.projectedRatio.x),
        y: roundRatio(selectedLayout.projectedRatio.y),
      });
    }
  };

  return (
    <section className={styles.mapCard}>
      <div className={styles.mapHeader}>
        <span className={styles.mapCompass} aria-hidden="true">N</span>
        <span className={styles.mapTitle}>文学スポットマップ</span>
      </div>
      <div className={styles.mapFrame} ref={frameRef}>
        <div
          className={`${styles.mapImageBox} ${calibrate ? styles.mapImageBoxCalibrate : ""}`.trim()}
          onClick={handleCalibrationClick}
          ref={imageBoxRef}
        >
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
                    {item.projectedPx ? (
                      <circle className={styles.debugProjectedDot} cx={item.projectedPx.x} cy={item.projectedPx.y} r="3.2" />
                    ) : null}
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
                        projected {item.projectedRatio ? `${roundRatio(item.projectedRatio.x)}, ${roundRatio(item.projectedRatio.y)}` : "-"}
                      </span>
                      <span>
                        base {item.baseRatio ? `${roundRatio(item.baseRatio.x)}, ${roundRatio(item.baseRatio.y)}` : "-"}
                      </span>
                      <span>
                        final {roundRatio(item.displayPx.x / imageBounds.width)}, {roundRatio(item.displayPx.y / imageBounds.height)}
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
            {calibrate && selectedLayout?.displayPx ? (
              <div
                className={styles.calibrationCrosshair}
                style={{
                  left: `${selectedLayout.displayPx.x}px`,
                  top: `${selectedLayout.displayPx.y}px`,
                  zIndex: 60,
                }}
              >
                <span className={styles.crosshairHorizontal} />
                <span className={styles.crosshairVertical} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {calibrate ? (
        <div className={styles.calibrationPanel}>
          <div className={styles.calibrationTitle}>Calibration Mode</div>
          {selectedSpot && selectedLayout ? (
            <>
              <div className={styles.calibrationMeta}>
                <strong>{selectedSpot.display_name}</strong>
                <span>地図をクリックすると `display_x / display_y` を更新できます。</span>
                <span>矢印キーで微調整、`Shift + 矢印キー` で大きめに動かせます。</span>
              </div>
              <div className={styles.calibrationGrid}>
                <div className={styles.calibrationItem}>
                  <span className={styles.calibrationLabel}>現在値</span>
                  <span>{selectedSpot.display_x ?? "-"}, {selectedSpot.display_y ?? "-"}</span>
                </div>
                <div className={styles.calibrationItem}>
                  <span className={styles.calibrationLabel}>仮投影</span>
                  <span>
                    {selectedLayout.projectedRatio
                      ? `${roundRatio(selectedLayout.projectedRatio.x)}, ${roundRatio(selectedLayout.projectedRatio.y)}`
                      : "-"}
                  </span>
                </div>
                <div className={styles.calibrationItem}>
                  <span className={styles.calibrationLabel}>調整中</span>
                  <span>
                    {calibrationPoint
                      ? `${roundRatio(calibrationPoint.x)}, ${roundRatio(calibrationPoint.y)}`
                      : "-"}
                  </span>
                </div>
                <div className={styles.calibrationItem}>
                  <span className={styles.calibrationLabel}>最終表示</span>
                  <span>
                    {currentDisplayRatio
                      ? `${currentDisplayRatio.x}, ${currentDisplayRatio.y}`
                      : "-"}
                  </span>
                </div>
              </div>
              <div className={styles.calibrationControls}>
                <button className={styles.calibrationButton} onClick={() => nudgeCalibration(0, -keyboardNudge)} type="button">
                  ↑
                </button>
                <button className={styles.calibrationButton} onClick={() => nudgeCalibration(-keyboardNudge, 0)} type="button">
                  ←
                </button>
                <button className={styles.calibrationButton} onClick={() => nudgeCalibration(keyboardNudge, 0)} type="button">
                  →
                </button>
                <button className={styles.calibrationButton} onClick={() => nudgeCalibration(0, keyboardNudge)} type="button">
                  ↓
                </button>
                <button className={styles.calibrationButtonSecondary} onClick={resetToCurrent} type="button">
                  現在値へ戻す
                </button>
                <button
                  className={styles.calibrationButtonSecondary}
                  onClick={() => {
                    if (selectedLayout.projectedRatio) {
                      setCalibrationPoint({
                        x: roundRatio(selectedLayout.projectedRatio.x),
                        y: roundRatio(selectedLayout.projectedRatio.y),
                      });
                    }
                  }}
                  type="button"
                >
                  仮投影から開始
                </button>
              </div>
              <textarea
                className={styles.calibrationOutput}
                readOnly
                value={calibrationPatch}
              />
            </>
          ) : (
            <div className={styles.calibrationMeta}>校正したいスポットを先に選択してください。</div>
          )}
        </div>
      ) : null}
      {debug && !calibrate ? (
        <div className={styles.debugPanel}>
          <div className={styles.debugPanelTitle}>Map Debug</div>
          <div className={styles.debugPanelMeta}>
            赤点が現在の基準位置、青点が仮投影位置です。
          </div>
        </div>
      ) : null}
    </section>
  );
}
