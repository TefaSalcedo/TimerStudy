import React from 'react';

function TimeOptions({ 
  onRealTimeClick, 
  onPomodoroClick, 
  onDeepWorkClick, 
  onClearClick,
  tema
}) {

 
    //Array de funciones para manejar los eventos de cambio
    const FuncionesReloj=[
        {
        name: "Real Time",
        onClick: onRealTimeClick
    },
    {
        name: "Pomodoro",
        onClick: onPomodoroClick
    },
    {
        name: "Deep Work",
        onClick: onDeepWorkClick
    },
    {
        name: "Clear",
        onClick: onClearClick
    }
    ]

  return (
      <div className={`contenedorBotones`}>
        {FuncionesReloj.map((funcion, index) => (
        <button className={`boton-option ${tema}`} key={index+funcion.name} onClick={funcion.onClick}>
            {funcion.name}
        </button>
        ))}
    </div>
  );
}

export default TimeOptions;