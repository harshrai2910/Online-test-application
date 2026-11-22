import { useState, useEffect, useRef } from "react";

const getRemainingSeconds = (startTime, duration) => {
  const start = Number(startTime);
  if (!start) return duration; // no valid start time, don't expire

  const elapsed = Math.floor((Date.now() - start) / 1000);
  return Math.max(duration - elapsed, 0);
};

export const Timer = ({ startTime, duration, onTimeUp }) => {
  const [remainingTime, setRemainingTime] = useState(() =>
    getRemainingSeconds(startTime, duration),
  );

  const onTimeUpRef = useRef(onTimeUp);
  const firedRef = useRef(false);

  // always call the latest handler
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    firedRef.current = false;

    const tick = () => {
      const remaining = getRemainingSeconds(startTime, duration);
      setRemainingTime(remaining);

      if (remaining <= 0 && !firedRef.current) {
        firedRef.current = true;
        clearInterval(interval);
        onTimeUpRef.current();
      }
    };

    const interval = setInterval(tick, 1000);
    tick(); // check immediately (handles refresh after expiry)

    return () => clearInterval(interval);
  }, [startTime, duration]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <h2 className="font-semibold text-lg">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </h2>
  );
};
