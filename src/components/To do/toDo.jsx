import React, { useState, useEffect } from "react";
import ListadeTareasInput from "./ListaTareasInput/ListaTareasInput.jsx"; 
import FormInput from "./Input to do/FormInput.jsx";
import MenuButton from "./MenuButton/MenuButton.jsx";
import "../appTime.css";
import "./toDo.css";


export default function MenuEditable({tema}) {
    const [showMenu, setShowMenu] = useState(false);
    const [tareas, setTareas] = React.useState([]);
    const [tarea, setTarea] = React.useState("");

    const agregarClick = (e) => {
        debugger;
        console.log("Click agregar")
        e.preventDefault();
        if (tarea.trim() === "") return;
        const nuevaTarea = {
            id: Date.now(),
            nombre: tarea,
            completada: false,
        };
        setTareas([...tareas, nuevaTarea]);
        setTarea("");

    };

    const eliminarClick = (index) => {
        const nuevasTareas = tareas.filter((_, i) => i !== index);
        setTareas(nuevasTareas);
    };

    const marcarCompletada = (id) => {
        const nuevasTareas = tareas.map((tarea) => {
            if (tarea.id === id) {
                return { ...tarea, completada: !tarea.completada };
            }
            return tarea;
        });
        setTareas(nuevasTareas);
    };

    useEffect(() => {
        const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));
        if (tareasGuardadas) {
            setTareas(tareasGuardadas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }, [tareas]);

    return (
        <div className={`to-do-Menu`}>
            {/* Botón Hamburguesa */}
            <MenuButton 
                showMenu={showMenu} 
                setShowMenu={setShowMenu} 
                tema={tema}
                />
            {/* Menú Desplegable */}

            {showMenu && (
                <div className={`container`}>
                    <FormInput
                        setTarea={setTarea}
                        tarea={tarea}
                        agregarClick={agregarClick}
                        tema={tema}
                    />
                    <ListadeTareasInput
                        tareas={tareas}
                        marcarCompletada={marcarCompletada}
                        eliminarClick={eliminarClick}
                        tema={tema}
                    />
                </div>
            )}
            
        </div>
    );
}
