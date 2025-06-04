import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(TodoContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <button onClick={toggleTheme} className="btn">
      {theme}
    </button>
  );
};

export default ThemeToggle;
