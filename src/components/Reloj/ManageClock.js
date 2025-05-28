import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

/** Custom hook to manage clock and timer logic */
function useTimeManager({  breakMinutes, timerMode }) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

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

// Pomodoro 
  useEffect(() => {
    if (timeLeft > 0) {
      formatTime(timeLeft);
      console.log(`1. Tiempo restante: ${timeLeft} segundos`);
      console.log(`2. Horas: ${hours}, Minutos: ${minutes}, Segundos: ${seconds}`);
      console.log(isCounting ? "3. El temporizador está corriendo" : "El temporizador está pausado");
    } else if (timeLeft === 0 && isCounting) {
      console.log("4. ¡Tiempo terminado!");
      console.log(isCounting ? "5. El temporizador está corriendo" : "El temporizador está pausado");
      if (!isBreak && (timerMode === "pomodoro" || timerMode === "deepWork")) {
        console.log("6.¡Tiempo terminado!");
        const breakTime = timerMode === "pomodoro" ? breakMinutes || 10 : breakMinutes || 15;
        console.log(`7. Iniciando descanso de ${breakTime} minutos...`);
        console.log(timerMode, breakMinutes);
        setTimeLeft((breakTime > 0 ? breakTime : 1) * 60);
        console.log(`8. Tiempo que queda ${timeLeft} minutos`);
        console.log(`9. Tiempo de descanso: ${breakTime} minutos`);
        toast.info("¡Descanso jejeje!", { position: "top-right" });
        setIsBreak(true);

      }
      if (isBreak) {
        console.log("10. ¡Descanso terminado!");
        toast.info("¡Descanso terminado!", { position: "top-right" });
        setIsBreak(false);
        setTimeLeft(0);
        setIsCounting(false);
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