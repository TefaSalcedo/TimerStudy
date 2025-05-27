import React, { useState, useEffect } from "react";
import TimeOptions from "./Opciones/timeOption.jsx";
import PomodoroOptions from "./Opciones/pomodoro/pomodoro.jsx";
import DeepWorkOptions from "./Opciones/deepWork/deepWorkOption.jsx";
import AppClock from "./appClock/appClock.jsx";
import useTimeManager from "./ManageClock.js";
import "./timeDisplay.css";

function TimeDisplay({showClockButtons}) {
  const [isRealTime, setIsRealTime] = useState(true);
  const [timerMode, setTimerMode] = useState("none");
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroMinutes, setPomodoroMinutes] = useState(5);
  const [deepWorkMinutes, setDeepWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(10);
  const [showDeepWorkOptions, setShowDeepWorkOptions] = useState(false);
  const [showPomodoroOptions, setShowPomodoroOptions] = useState(false);

  const {
    hours,
    minutes,
    seconds,
    timeLeft,
    setTimer,
    startCountdown,
    pauseCountdown,
    resetClock,
    updateClock,
  } = useTimeManager({ breakMinutes, timerMode, isBreak });

  useEffect(() => {
    if (!isRealTime) return;
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, [isRealTime]);

// Sincroniza el timer con el input de Pomodoro
useEffect(() => {
  if (timerMode === "pomodoro" && showPomodoroOptions) {
    setTimer(pomodoroMinutes);
  }
}, [pomodoroMinutes, timerMode, showPomodoroOptions, setTimer]);

// Sincroniza el timer con el input de Deep Work
useEffect(() => {
  if (timerMode === "deepWork" && showDeepWorkOptions) {
    setTimer(deepWorkMinutes);
  }
}, [deepWorkMinutes, timerMode, showDeepWorkOptions, setTimer]);


  const handleInput = (e, min, max, setter, relatedSetter, relatedValue) => {
    const value = e.target.value.replace(/\D/, "");
    let num = Number(value);
    if (num < min) num = min;
    if (num > max) num = max;
    if (isNaN(num)) return;
    setter(num);
    if (relatedSetter && relatedValue >= num) relatedSetter(num - 1);
  };

  const handleRealTimeClick = () => {
    resetClock();
    setIsRealTime(true);
    setTimerMode("none");
    setShowPomodoroOptions(false);
    setShowDeepWorkOptions(false);
  };

  const handlePomodoroClick = () => {
    resetClock();
    setTimerMode("pomodoro");
    setIsRealTime(false);
    setShowPomodoroOptions((prev) => !prev);
    setShowDeepWorkOptions(false);
    setTimer(pomodoroMinutes);
  };

  const handleDeepWorkClick = () => {
    resetClock();
    setTimerMode("deepWork");
    setIsRealTime(false);
    setShowDeepWorkOptions((prev) => !prev);
    setShowPomodoroOptions(false);
    setTimer(deepWorkMinutes);
  };

  const handleClearClick = () => {
    resetClock();
    setIsRealTime(false);
    setTimerMode("none");
    setShowPomodoroOptions(false);
    setShowDeepWorkOptions(false);
  };

  return (
    <div className="time-container">
      <DeepWorkOptions
        oneHour={() => setTimer(60)}
        oneHourAndHalf={() => setTimer(90)}
        startDeepWork={startCountdown}
        pauseDeepWork={pauseCountdown}
        show={showDeepWorkOptions}
        inputValue={deepWorkMinutes}
        onInputChange={(e) => handleInput(e, 45, 200, setDeepWorkMinutes, setBreakMinutes, breakMinutes)}
        breakValue={breakMinutes}
        onBreakChange={(e) => handleInput(e, 1, deepWorkMinutes - 1, setBreakMinutes)}
      />

      <div className="app-clock">
        <AppClock hours={hours} minutes={minutes} seconds={seconds} />
        {showClockButtons && <TimeOptions
          onRealTimeClick={handleRealTimeClick}
          onPomodoroClick={handlePomodoroClick}
          onDeepWorkClick={handleDeepWorkClick}
          onClearClick={handleClearClick}
        />}
      </div>

      <PomodoroOptions
        startPomodoro={startCountdown}
        pausePomodoro={pauseCountdown}
        show={showPomodoroOptions}
        inputValue={pomodoroMinutes}
        onInputChange={(e) => handleInput(e, 5, 45, setPomodoroMinutes, setBreakMinutes, breakMinutes)}
        breakValue={breakMinutes}
        onBreakChange={(e) => handleInput(e, 1, pomodoroMinutes - 1, setBreakMinutes)}
      />
    </div>
  );
}

export default TimeDisplay;
