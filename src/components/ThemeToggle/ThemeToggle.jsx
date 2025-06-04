import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import "./ThemeToggle.css";
import { Sun, Moon } from "react-feather";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(TodoContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="theme-toggle"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};

export default ThemeToggle;
