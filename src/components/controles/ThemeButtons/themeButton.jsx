import "./themeButton.css"; // Importa el archivo CSS para estilos

const ThemeButton = ({onThemeChange, tema}) => {
    const themes = [
    "Morning", "Autumn", "Cottagecore", "DarkAcademia", "LightAcademia", 
    "Y2K", "CleanGirl", "ParisianChic", "SummerBeach","VanillaAesthetic", 
    "CatVibe", "DogVibe",
    ];
    
  return (
    <>
    <label className="panel-title" >Select Theme:</label>
    <select
        className={`theme-select ${tema}`}
        onChange={(e) => onThemeChange(e.target.value)}
        >
        {themes.map((theme) => (
            <option key={theme} className="Boton-estilo">
            {theme}
            </option>
            
        ))}
    </select>
    </>
  );
};

export default ThemeButton;
