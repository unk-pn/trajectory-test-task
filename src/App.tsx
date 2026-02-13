import "./App.css";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";
import { CarsPage } from "./features/cars/components/CarsPage/CarsPage";
import { ThemeProvider } from "@gravity-ui/uikit";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
      <CarsPage />
    </ThemeProvider>
  );
}

export default App;
