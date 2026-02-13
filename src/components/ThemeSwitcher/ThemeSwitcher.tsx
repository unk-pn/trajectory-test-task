import { Switch } from "@gravity-ui/uikit";
import c from "./ThemeSwitcher.module.css";

interface ThemeSwitcherProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export const ThemeSwitcher = ({ theme, onToggle }: ThemeSwitcherProps) => {
  return (
    <div>
      <h3 className={c.title}>Переключатель темы</h3>
      <div className={c.container}>
        <p>Светлая</p>
        <Switch checked={theme === "dark"} onUpdate={onToggle} />
        <p>Темная</p>
      </div>
    </div>
  );
};
