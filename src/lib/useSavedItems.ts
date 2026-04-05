import { useEffect, useState } from "react";

import {
  getSavedSpotIds,
  getSavedWorkIds,
  SAVED_ITEMS_EVENT,
  toggleSavedSpotId,
  toggleSavedWorkId,
} from "./storage";

export function useSavedSpots() {
  const [savedSpotIds, setSavedSpotIds] = useState<string[]>(() => getSavedSpotIds());

  useEffect(() => {
    const sync = () => setSavedSpotIds(getSavedSpotIds());

    window.addEventListener("storage", sync);
    window.addEventListener(SAVED_ITEMS_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(SAVED_ITEMS_EVENT, sync);
    };
  }, []);

  return {
    savedSpotIds,
    isSaved: (spotId: string) => savedSpotIds.includes(spotId),
    toggle: (spotId: string) => setSavedSpotIds(toggleSavedSpotId(spotId)),
  };
}

export function useSavedWorks() {
  const [savedWorkIds, setSavedWorkIds] = useState<string[]>(() => getSavedWorkIds());

  useEffect(() => {
    const sync = () => setSavedWorkIds(getSavedWorkIds());

    window.addEventListener("storage", sync);
    window.addEventListener(SAVED_ITEMS_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(SAVED_ITEMS_EVENT, sync);
    };
  }, []);

  return {
    savedWorkIds,
    isSaved: (workId: string) => savedWorkIds.includes(workId),
    toggle: (workId: string) => setSavedWorkIds(toggleSavedWorkId(workId)),
  };
}
