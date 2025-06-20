import React, { useState, useEffect } from "react";
import TimeOptions from "./Opciones/timeOption.jsx";
import PomodoroOptions from "./Opciones/pomodoro/pomodoro.jsx";
import DeepWorkOptions from "./Opciones/pomodoro/deepWorkOption.jsx";
import AppClock from "./appClock/appClock.jsx";
import useTimeManager from "./ManageClock.js";
import "./TimeDisplay.css";

function TimeDisplay({showClockButtons, tema}) {
  const [isRealTime, setIsRealTime] = useState(true);
  const [timerMode, setTimerMode] = useState("none");
  const [showDeepWorkOptions, setShowDeepWorkOptions] = useState(false);
  const [showPomodoroOptions, setShowPomodoroOptions] = useState(false);

  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [deepWorkMinutes, setDeepWorkMinutes] = useState(100);
  const [breakMinutes, setBreakMinutes] = useState(10);


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
    isCounting,
  } = useTimeManager({ breakMinutes, timerMode });

  useEffect(() => {
    if (!isRealTime) return;
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, [isRealTime]);

// Sincroniza el timer con el input de Pomodoro
useEffect(() => {
  if (
    timerMode === "pomodoro" &&
    showPomodoroOptions &&
    !isCounting // Solo si NO está corriendo
  ) {
    setTimer(pomodoroMinutes);
    console.log("Timer sincronizado con Pomodoro:", pomodoroMinutes);
  }
}, [pomodoroMinutes, timerMode, showPomodoroOptions, setTimer, isCounting]);

// Sincroniza el timer con el input de Deep Work
useEffect(() => {
  if (
    timerMode === "deepWork" &&
    showDeepWorkOptions &&
    !isCounting // Solo si NO está corriendo
  ) {
    setTimer(deepWorkMinutes);
    console.log("Timer sincronizado con Deep Work:", deepWorkMinutes);
  }
}, [deepWorkMinutes, timerMode, showDeepWorkOptions, setTimer, isCounting]);


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
    <>
      <div className="app-clock">
        <AppClock 
          hours={hours} 
          minutes={minutes} 
          seconds={seconds} 
          tema={tema}
          />

        {showClockButtons && 
          <TimeOptions
            onRealTimeClick={handleRealTimeClick}
            onPomodoroClick={handlePomodoroClick}
            onDeepWorkClick={handleDeepWorkClick}
            onClearClick={handleClearClick}
            tema={tema}
          />}
      </div>

        <PomodoroOptions
          startPomodoro={startCountdown}
          pausePomodoro={pauseCountdown}
          min={2}
          max={44}
          show={showPomodoroOptions}
          inputValue={pomodoroMinutes}
          onInputChange={(e) => handleInput(e, 2, 45, setPomodoroMinutes, setBreakMinutes, breakMinutes)}
          breakValue={breakMinutes}
          onBreakChange={(e) => handleInput(e, 1, pomodoroMinutes - 2, setBreakMinutes)}
          tema={tema}
        />
        
        <DeepWorkOptions
          startDeepWork={startCountdown}
          pauseDeepWork={pauseCountdown}
          min={45}
          max={200}
          show={showDeepWorkOptions}
          inputValue={deepWorkMinutes}
          onInputChange={(e) => handleInput(e, 45, 200, setDeepWorkMinutes, setBreakMinutes, breakMinutes)}
          breakValue={breakMinutes}
          onBreakChange={(e) => handleInput(e, 1, deepWorkMinutes - 2, setBreakMinutes)}
          tema={tema}
        />
    </>
  );
}

export default TimeDisplay;
