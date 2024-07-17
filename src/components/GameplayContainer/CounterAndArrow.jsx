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
      />
      <PlayerArrow
        playerNumber={playerInfo.number}
        playerColor={playerInfo.colorCode}
        hasPlayerMoved={playerInfo.tilesMoved > 0}
        nextTranslation={nextTranslation}
        showIcon={isPlayerActive && !gotWinner}
      />
    </>
  );
}

function PlayerCounter({
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
  showIcon,
}) {
  return (
    <div
      className={`${styles.playerBox} ${styles[`player${playerNumber}Box`]} ${
        hasPlayerMoved ? styles.fixBoxPosition : ""
      }`}
      style={{ translate: nextTranslation }}
    >
      <div className={styles.playerArrowImgContainer}>
        {showIcon && (
          <ArrowIcon
            className={styles.playerArrowImg}
            fgColor={arrowColors[playerColor].foreground}
            bgColor={arrowColors[playerColor].background}
          />
        )}
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
