import "./panelItem.css";

const PanelItem = ({ 
    onToggleQuote, 
    onToggleToDo, 
    onToggleMusic, 
    onToggleClockButtons,
    tema
 }) => {

    //Array de funciones para manejar los eventos de cambio
    const FuncionesVisualización=[
        {
        name: "Quote",
        onChange: onToggleQuote
    },
    {
        name: "To do",
        onChange: onToggleToDo
    },
    {
        name: "Music",
        onChange: onToggleMusic
    },
    {
        name: "Reloj",
        onChange: onToggleClockButtons
    }
    ]

  return (
    <>
        {FuncionesVisualización.map((funcion, index) => (
        <li className="panel-item" key={index+ funcion.name}>
            <span>{funcion.name}</span>
            <label className="switch">
                <input type="checkbox" defaultChecked onChange={funcion.onChange}/>
                <span className={`slider ${tema}`}></span>
            </label>
        </li>
        ))}
    </>
  );
};
export default PanelItem;