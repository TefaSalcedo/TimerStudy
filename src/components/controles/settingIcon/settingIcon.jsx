import "./SettingIcon.css";
import { Settings } from "lucide-react";

const SettingIcon = ({ togglePanel }) => {
    return (
        <div className="settings-icon" onClick={togglePanel}>
            <Settings size={24} />
        </div>
    );
}
export default SettingIcon;