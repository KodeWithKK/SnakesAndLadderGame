import React from "react";
import styles from "./NavBar.module.css";
import { AppContext } from "../../contexts/AppProvider";

const NavBar = () => {
  const value = React.useContext(AppContext);
  const { isSidebarCollapsed, setIsSidebarCollapsed, resetPlayerInfo } = value;

  return (
    <nav className={`${isSidebarCollapsed ? styles.collapseSidebar : ""}`}>
      <div className={styles.containerHeader}>
        <div className={styles.logo}>
          <img src="img/Logo.svg" alt="logo" />
          <p>Snakes &amp; Ladders</p>
        </div>
        <button
          className={styles.menuBtn}
          onClick={() => {
            setIsSidebarCollapsed(!isSidebarCollapsed);
          }}
        >
          <div className="menu-btn__bar-1" />
          <div className="menu-btn__bar-2" />
          <div className="menu-btn__bar-3" />
        </button>
      </div>
      <div className={styles.containerNavBtns}>
        <NavBtn
          title={"New Game"}
          src={"img/Dice Icon.svg"}
          onClick={() => window.alert("Feature to ab added soon...")}
        >
          New Game
        </NavBtn>
        <NavBtn
          title={"Restart Game"}
          src={"img/Restart Icon.svg"}
          className={styles.navBtn__restartGame}
          onClick={resetPlayerInfo}
        >
          Restart Game
        </NavBtn>
        <NavBtn
          title={"Reveal Side bar"}
          src={`img/${isSidebarCollapsed ? "Reveal" : "Collapse"}-Side-Bar.svg`}
          className={styles.navBtn__sideBar}
          onClick={() => {
            setIsSidebarCollapsed(!isSidebarCollapsed);
          }}
        >
          Hide Sidebar
        </NavBtn>
        <NavBtn
          title={"Customize"}
          src={"img/customize-icon.svg"}
          className={styles.navBtn__customize}
          onClick={() => window.alert("Feature to ab added soon...")}
        >
          Customize
        </NavBtn>
      </div>
    </nav>
  );
};

function NavBtn({ title, src, className, children, ...props }) {
  return (
    <button
      className={`${styles.navBtn} ${className}`}
      title={title}
      {...props}
    >
      <img src={src} alt="nav-icon" />
      <p>{children}</p>
    </button>
  );
}

export default NavBar;
