import { useState, useMemo, useCallback, createContext } from "react";
import useRollDice from "../hooks/useRollDice";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [playersInfo, setPlayersInfo] = useState([player00, player01]);
  const [activePlayerNum, setActivePlayerNum] = useState(0);

  const intialPlayerInfo = useMemo(() => {
    return JSON.parse(JSON.stringify([player00, player01]));
  }, []);

  const resetPlayerInfo = useCallback(() => {
    setPlayersInfo(JSON.parse(JSON.stringify(intialPlayerInfo)));
    setActivePlayerNum(0);
  }, [intialPlayerInfo]);

  const setNextPlayerTurn = useCallback(() => {
    setActivePlayerNum((prevNum) => {
      return (prevNum + 1) % playersInfo.length;
    });
  }, [playersInfo.length]);

  const activePlayer = useMemo(() => {
    return playersInfo[activePlayerNum];
  }, [playersInfo, activePlayerNum]);

  const setActivePlayer = useCallback(
    (nextActivePlayer) => {
      setPlayersInfo((prevInfo) => {
        const newInfo = [...prevInfo];
        newInfo[activePlayerNum] = nextActivePlayer;
        return newInfo;
      });
    },
    [activePlayerNum]
  );

  const { diceVal, isPlayerMoving, handleBtnRoll } = useRollDice({
    activePlayer,
    setActivePlayer,
    setNextPlayerTurn,
  });

  const appContextValue = useMemo(() => {
    return {
      isSidebarCollapsed,
      playersInfo,
      activePlayerNum,
      diceVal,
      isPlayerMoving,
      setIsSidebarCollapsed,
      resetPlayerInfo,
      handleBtnRoll,
    };
  }, [
    isSidebarCollapsed,
    playersInfo,
    activePlayerNum,
    diceVal,
    isPlayerMoving,
    resetPlayerInfo,
    handleBtnRoll,
  ]);

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
