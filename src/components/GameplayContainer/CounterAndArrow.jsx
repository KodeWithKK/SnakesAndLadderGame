import { useMemo } from "react";
import styles from "./CounterAndArrow.module.css";
import { ArrowIcon } from "./Icons";

function CounterAndArrow({ playerInfo, isPlayerActive, gotWinner }) {
  const nextTranslation = useMemo(() => {
    if (playerInfo.tilesMoved !== 0) {
      return `${playerInfo.posX * 100}% -${playerInfo.posY * 100}%`;
    } else return ``;
  }, [playerInfo.posX, playerInfo.posY, playerInfo.tilesMoved]);

  return (
    <>
      <PlayerCounter
        playerNumber={playerInfo.number}
        playerColor={playerInfo.colorCode}
        hasPlayerMoved={playerInfo.tilesMoved > 0}
        nextTranslation={nextTranslation}
        isPlayerActive={isPlayerActive}
      />
      {isPlayerActive && !gotWinner && (
        <PlayerArrow
          playerNumber={playerInfo.number}
          playerColor={playerInfo.colorCode}
          hasPlayerMoved={playerInfo.tilesMoved > 0}
          nextTranslation={nextTranslation}
        />
      )}
    </>
  );
}

function PlayerCounter({
  playerNumber,
  playerColor,
  hasPlayerMoved,
  nextTranslation,
  isPlayerActive,
}) {
  return (
    <div
      className={`${styles.playerBox} ${styles[`player${playerNumber}Box`]} ${
        hasPlayerMoved ? styles.fixBoxPosition : ""
      }`}
      style={{
        translate: nextTranslation,
        zIndex: `${isPlayerActive ? "10" : "5"}`,
      }}
    >
      <img
        className={styles.playerCounterImg}
        src={`img/counters/${playerColor}.webp`}
        alt={`${playerColor} Counter`}
      />
    </div>
  );
}

function PlayerArrow({
  playerNumber,
  playerColor,
  hasPlayerMoved,
  nextTranslation,
}) {
  return (
    <div
      className={`${styles.playerBox} ${styles[`player${playerNumber}Box`]} ${
        hasPlayerMoved ? styles.fixBoxPosition : ""
      }`}
      style={{ translate: nextTranslation }}
    >
      <div className={styles.playerArrowImg}>
        <ArrowIcon
          fgColor={arrowColors[playerColor].foreground}
          bgColor={arrowColors[playerColor].background}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

const arrowColors = {
  red: {
    foreground: "#F91E7E",
    background: "#B80261",
  },
  yellow: {
    foreground: "#fcbd03",
    background: "#f76c23",
  },
  blue: {
    foreground: "#25a6e1",
    background: "#0376bf",
  },
  green: {
    foreground: "#81c23f",
    background: "#029644",
  },
};

export default CounterAndArrow;
