import React from "react";
import NavBar from "./components/NavBar";
import GameplayContainer from "./components/GameplayContainer";
import StatsContainer from "./components/StatsContainer";
import styles from "./App.module.css";
import { AppContext } from "./contexts/AppProvider";

function App() {
  const { collapseSidebar } = React.useContext(AppContext);

  return (
    <>
      <NavBar />

      <div
        className={`${styles.mainContainer} ${
          collapseSidebar ? styles.adjustPadding : ""
        }`}
      >
        <GameplayContainer />
        <StatsContainer />
      </div>
    </>
  );
}

export default App;
