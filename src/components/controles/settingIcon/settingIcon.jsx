import "./SettingIcon.css";
import { Settings } from "lucide-react";

const SettingIcon = ({ togglePanel , tema}) => {
    return (
        <div className={`settings ${tema}`}  onClick={togglePanel}>
            <Settings size={24} />
        </div>
    );
}
export default SettingIcon;