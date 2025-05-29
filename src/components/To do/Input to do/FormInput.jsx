import  EmojiButton from "../emoji/emojis.jsx"; // Importar el componente EmojiButton
import ButtonToAdd from "../Button/ButtonToAdd.jsx";
import "./form.css";

const FormInput = ({ setTarea, tarea, agregarClick}) => {
    console.log("inicio de Form input")
    return (
        <form>
            <div>
            <input 
                type="text" 
                placeholder="Escribe una tarea" 
                value={tarea} 
                onChange={(e)=>setTarea(e.target.value)}
            />
            <EmojiButton onSelect={emojiObj => setTarea(tarea + emojiObj.emoji)} />
            </div>
            <ButtonToAdd agregarClick={agregarClick} />
        </form>
    );
    }
    export default FormInput;