import React from "react";
import NavBar from "./components/NavBar";
import GameplayContainer from "./components/GameplayContainer/GameplayContainer";
import StatsContainer from "./components/StatsContainer";
import styles from "./App.module.css";
import { AppContext } from "./contexts/AppProvider";

function App() {
  const { isSidebarCollapsed } = React.useContext(AppContext);

  return (
    <>
      <NavBar />

      <div
        className={`${styles.mainContainer} ${
          isSidebarCollapsed ? styles.adjustPadding : ""
        }`}
      >
        <GameplayContainer />
        <StatsContainer />
      </div>
    </>
  );
}

export default App;
