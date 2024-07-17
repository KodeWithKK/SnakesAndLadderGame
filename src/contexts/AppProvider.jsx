import { useState, useMemo, useCallback, createContext } from "react";
import useRollDice from "../hooks/useRollDice";
import { produce } from "immer";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState([
    "Red Player",
    "Yellow Player",
  ]);
  const [playersInfo, setPlayersInfo] = useState(() => {
    return intializePlayersInfo(totalPlayers, playerNames);
  });
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
      setPlayersInfo(
        produce((draftInfo) => {
          draftInfo[activePlayerNum] = nextActivePlayer;
        })
      );
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
    const nextPlayersInfo = intializePlayersInfo(totalPlayers, playerNames);
    setPlayersInfo(nextPlayersInfo);
    setActivePlayerNum(0);
    setDiceVal(1);
    setWinnerPlayer(null);
  }, [totalPlayers, playerNames, setDiceVal]);

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

const colorCodeSequence = ["red", "yellow", "blue", "green"];

function intializePlayersInfo(totalPlayers, playerNames) {
  const playersInfo = [];

  for (let i = 0; i < totalPlayers; i++) {
    playersInfo.push({
      name: playerNames[i],
      colorCode: colorCodeSequence[i],
      number: i,
      posX: 0,
      posY: 1,
      tilesMoved: 0,
      snakeBites: 0,
      ladderClimbs: 0,
    });
  }

  return playersInfo;
}

export default AppProvider;
