import React from "react";

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [collapseSidebar, setCollapseSidebar] = React.useState(false);
  const [playersInfo, setPlayersInfo] = React.useState([player00, player01]);
  const [currentPlayerNum, setCurrentPlayerNum] = React.useState(0);

  const intialPlayerInfo = React.useMemo(() => {
    return JSON.parse(JSON.stringify([player00, player01]));
  }, []);

  const resetPlayerInfo = React.useCallback(() => {
    setPlayersInfo(JSON.parse(JSON.stringify(intialPlayerInfo)));
    setCurrentPlayerNum(0);
  }, [intialPlayerInfo]);

  const appContextValue = React.useMemo(() => {
    return {
      collapseSidebar,
      setCollapseSidebar,
      playersInfo,
      setPlayersInfo,
      resetPlayerInfo,
      currentPlayerNum,
      setCurrentPlayerNum,
    };
  }, [collapseSidebar, playersInfo, resetPlayerInfo, currentPlayerNum]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

const player00 = {
  name: "Red Player",
  posX: 0,
  posY: 1,
  tilesMoved: 0,
  snakeBites: 0,
  ladderClimbs: 0,
};

const player01 = {
  name: "Yellow Player",
  posX: 0,
  posY: 1,
  tilesMoved: 0,
  snakeBites: 0,
  ladderClimbs: 0,
};

export default AppProvider;
