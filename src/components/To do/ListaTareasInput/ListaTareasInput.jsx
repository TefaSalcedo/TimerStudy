import './ListaTareasInput.css'; // Asegúrate de tener un archivo CSS para estilos
import BotonRemove  from '../Button/ButtonRemove.jsx';
import Tarea from './Tareas/tarea.jsx';

const ListadeTareasInput = ({tareas, marcarCompletada, eliminarClick, tema}) => {
    console.log("entro a lista de tareas ")
    
    return (
    <ol>
        {tareas.map((tarea, tareaId)=>(
            <div className={`tareaContainer`} key={tarea.id}>  

                <Tarea
                    marcarCompletada={marcarCompletada}
                    tarea={tarea}
                />
                <BotonRemove eliminarClick={eliminarClick} tareaId={tareaId} tarea={tarea} />
            </div>
        ))}
    </ol>
    );
}
export default ListadeTareasInput;