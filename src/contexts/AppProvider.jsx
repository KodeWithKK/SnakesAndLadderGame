import { useState, useMemo, useCallback, createContext } from "react";
import useRollDice from "../hooks/useRollDice";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [playersInfo, setPlayersInfo] = useState([player00, player01]);
  const [activePlayerNum, setActivePlayerNum] = useState(0);
  const [winnerPlayer, setWinnerPlayer] = useState(null);

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

  const { diceVal, isPlayerMoving, setDiceVal, handleBtnRoll } = useRollDice({
    activePlayer,
    setActivePlayer,
    setNextPlayerTurn,
    setWinnerPlayer,
  });

  const handleRestart = useCallback(() => {
    const nextPlayersInfo = JSON.parse(JSON.stringify([player00, player01]));
    setPlayersInfo(nextPlayersInfo);
    setActivePlayerNum(0);
    setDiceVal(1);
    setWinnerPlayer(null);
  }, [setDiceVal]);

  const appContextValue = useMemo(() => {
    return {
      isSidebarCollapsed,
      playersInfo,
      activePlayerNum,
      diceVal,
      isPlayerMoving,
      winnerPlayer,
      setIsSidebarCollapsed,
      handleRestart,
      handleBtnRoll,
    };
  }, [
    isSidebarCollapsed,
    playersInfo,
    activePlayerNum,
    diceVal,
    isPlayerMoving,
    winnerPlayer,
    handleRestart,
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
