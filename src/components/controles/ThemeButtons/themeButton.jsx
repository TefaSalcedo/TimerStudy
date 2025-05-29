import "./themeButton.css"; // Importa el archivo CSS para estilos

const ThemeButton = ({onThemeChange, tema}) => {
    const themes = [
    "Morning", "Autumn", "Cottagecore", "DarkAcademia", "LightAcademia", 
    "Y2K", "CleanGirl", "ParisianChic", "SummerBeach","VanillaAesthetic", 
    "CatVibe", "DogVibe",
    ];
    
  return (
    <div className={`theme-container`}>
    <label className="panel-title" >Select Theme:</label>
    <select
        className={`theme-select ${tema}`}
        onChange={(e) => onThemeChange(e.target.value)}
        >
        {themes.map((theme) => (
            <option key={theme} >
            {theme}
            </option>
            
        ))}
    </select>
    </div>
  );
};

export default ThemeButton;
