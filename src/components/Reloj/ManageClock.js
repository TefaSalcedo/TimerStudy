import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

/** Custom hook to manage clock and timer logic */
function useTimeManager({  breakMinutes, timerMode, isBreak }) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const updateClock = () => {
    const now = new Date();
    setHours(String(now.getHours()).padStart(2, "0"));
    setMinutes(String(now.getMinutes()).padStart(2, "0"));
    setSeconds(String(now.getSeconds()).padStart(2, "0"));
  };

  const formatTime = (totalSeconds) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  const setTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    formatTime(minutes * 60);
    setIsCounting(false);
  };

  const startCountdown = () => {
    if (timeLeft > 0) setIsCounting(true);
  };

  const pauseCountdown = () => {
    setIsCounting(false);
  };

  const resetClock = () => {
    setHours("00");
    setMinutes("00");
    setSeconds("00");
    setTimeLeft(0);
    setIsCounting(false);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      formatTime(timeLeft);
    } else if (timeLeft === 0 && isCounting) {
      setIsCounting(false);
      if (!isBreak && (timerMode === "pomodoro" || timerMode === "deepWork")) {
        const breakTime = timerMode === "pomodoro" ? breakMinutes || 10 : breakMinutes || 15;
        setTimeLeft((breakTime > 0 ? breakTime : 1) * 60);
        toast.info("¡Descanso jejeje!", { position: "top-right" });
      }
    }
  }, [timeLeft, isCounting, isBreak, timerMode, breakMinutes]);

  useEffect(() => {
    if (!isCounting) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, [isCounting]);

  return {
    hours,
    minutes,
    seconds,
    timeLeft,
    setTimer,
    startCountdown,
    pauseCountdown,
    resetClock,
    updateClock,
    isCounting,
  };
}

export default useTimeManager;