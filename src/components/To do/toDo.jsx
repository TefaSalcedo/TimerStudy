import React, { useState, useEffect } from "react";
// Importar el ícono de lista|
import ListadeTareasInput from "./ListaTareasInput/ListaTareasInput.jsx"; // Importar el componente de lista de tareas
import FormInput from "./Input to do/FormInput.jsx";
import "../appTime.css";
import "./toDo.css";
import MenuButton from "./MenuButton/MenuButton.jsx";

export default function MenuEditable() {
    const [showMenu, setShowMenu] = useState(false);
    const [tareas, setTareas] = React.useState([]);
    const [tarea, setTarea] = React.useState("");

    const agregarClick = (e) => {
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
        <div className="to-do-Menu">
            {/* Botón Hamburguesa */}
            <MenuButton showMenu={showMenu} setShowMenu={setShowMenu} />
            {/* Menú Desplegable */}
            {showMenu && (
                <div className="container">
                    <FormInput
                        setTarea={setTarea}
                        tarea={tarea}
                        agregarClick={agregarClick}
                    />
                    <ListadeTareasInput
                        tareas={tareas}
                        marcarCompletada={marcarCompletada}
                        eliminarClick={eliminarClick}
                    />
                </div>
            )}
        </div>
    );
}
