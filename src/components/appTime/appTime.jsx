import React, { useState, useEffect } from 'react';
import Draggable from "react-draggable";

import DeepWorkOptions from './Deep Work/deepWorkOption.jsx';
import TimeOptions from './Display/timeOption.jsx';
import TimeDisplay from './Display/timeDisplay.jsx';
import PomodoroOptions from './Pomodoro/pomodoro.jsx'

import "./appTime.css";
import "./Display/timeDisplay.css";
import "./Display/timeOption.css";


function TimeComponent() {
  // Estado para las horas (inicializado a '00')
  const [hours, setHours] = useState('00');
  // Estado para los minutos (inicializado a '00')
  const [minutes, setMinutes] = useState('00');
  // Estado para controlar si el reloj está en tiempo real (inicializado a falso)
  const [isRealTime, setIsRealTime] = useState(false);
  // Estado para controlar el modo del temporizador ('none', 'pomodoro', 'deepWork')
  const [timerMode, setTimerMode] = useState('none');

  // Función para actualizar la hora actual
  const updateClock = () => {
    const now = new Date();
    setHours(String(now.getHours()).padStart(2, '0'));
    setMinutes(String(now.getMinutes()).padStart(2, '0'));
  };

  // Efecto para actualizar el reloj en tiempo real cada segundo
  useEffect(() => {
    let intervalId;
    // Si isRealTime es verdadero, actualiza el reloj cada segundo
    if (isRealTime) {
      updateClock(); // Actualiza inmediatamente la primera vez
      intervalId = setInterval(updateClock, 1000); // Actualiza cada segundo
    }
    // Limpia el intervalo cuando el componente se desmonta o isRealTime cambia a falso
    return () => clearInterval(intervalId);
  }, [isRealTime]);

  // Efecto para establecer la hora a '00:00' cuando se cambia el modo a 'pomodoro' o 'deepWork'
  useEffect(() => {
    if (timerMode === 'pomodoro' || timerMode === 'deepWork') {
      setHours('00');
      setMinutes('00');
      setIsRealTime(false); // Detiene el reloj en tiempo real
    }
  }, [timerMode]);

  // Manejador para el botón "Real Time"
  const handleRealTimeClick = () => {
    setIsRealTime(true); // Activa el modo de tiempo real
    setTimerMode('none'); // Establece el modo a 'none'
  };

  // Manejador para el botón "Pomodoro"
  const handlePomodoroClick = () => {
    setTimerMode('pomodoro'); // Establece el modo a 'pomodoro'
    setIsRealTime(false); // Detiene el reloj en tiempo real
  };

  // Manejador para el botón "Deep Work"
  const handleDeepWorkClick = () => {
    setTimerMode('deepWork'); // Establece el modo a 'deepWork'
    setIsRealTime(false); // Detiene el reloj en tiempo real
  };

  // Manejador para el botón "Clear"
  const handleClearClick = () => {
    setIsRealTime(false); // Detiene el reloj en tiempo real
    setTimerMode('none'); // Establece el modo a 'none'
    setHours('00'); // Restablece las horas a '00'
    setMinutes('00'); // Restablece los minutos a '00'
  };

  return (
    // Contenedor principal
     <Draggable axis="y">  
     {/* npm i react-draggable react drag Permite arrastrar el componente verticalmente eje y */}
      <div className="time-container">
        <DeepWorkOptions/>
        <div className="app-cointainer"> 
        
          {/* Muestra la hora usando el componente TimeDisplay */}
          <TimeDisplay hours={hours} minutes={minutes} />
          {/* Muestra los botones de opciones usando el componente TimeOptions */}
          <TimeOptions
            onRealTimeClick={handleRealTimeClick}
            onPomodoroClick={handlePomodoroClick}
            onDeepWorkClick={handleDeepWorkClick}
            onClearClick={handleClearClick}
          />
        </div>
        <PomodoroOptions/>
      </div>
      </Draggable>
  );
}

export default TimeComponent;