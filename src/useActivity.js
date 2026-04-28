import { useState, useEffect } from "react";
import store from "./store";

const empty = { pageVisits: {}, toursRegistered: [], monumentsVisited: [] };

export function useActivity(userId) {
  const [activity, setActivity] = useState(() => store.getUser(userId) || empty);

  useEffect(() => {
    // Sync immediately in case store already has data
    setActivity(store.getUser(userId) || empty);
    // Subscribe to future updates (e.g. after backend load completes)
    const unsub = store.subscribe(userId, (data) => setActivity({ ...data }));
    return unsub;
  }, [userId]);

  return activity;
}
