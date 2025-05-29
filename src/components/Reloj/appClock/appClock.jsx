import React from "react";
import "./appClock.css"

const AppClock = ({hours, minutes, seconds, tema}) => {
// {`quote ${tema}`}
  const Reloj=[
    {name:hours},
    {name:minutes},
    {name:seconds}
  ]
  return (
    <div className={`flip-clock ${tema}`} >
          {Reloj.map((funcion, index) => (
            <div className={`flip-unit`} id={funcion.name} key={index+funcion.name}>
                {funcion.name}
            </div>
        ))}
    </div> 
  );
}
export default AppClock;

