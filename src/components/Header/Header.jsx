import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Header.css";
const Header = () => {
  return (
    <header className="">
      <nav>
        <div className="header__left">
          <h3>My Todo</h3>
        </div>
        <div className="button__container">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
