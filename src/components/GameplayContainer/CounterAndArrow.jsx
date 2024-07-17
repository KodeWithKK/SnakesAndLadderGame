import { useMemo } from "react";
import styles from "./CounterAndArrow.module.css";

function CounterAndArrow({
  playerColor,
  playerNumber,
  playerInfo,
  isPlayerActive,
}) {
  const nextTranslation = useMemo(() => {
    if (playerInfo.tilesMoved !== 0) {
      return `${playerInfo.posX * 100}% -${playerInfo.posY * 100}%`;
    } else return ``;
  }, [playerInfo.posX, playerInfo.posY, playerInfo.tilesMoved]);

  return (
    <>
      <PlayerCounter
        playerNumber={playerNumber}
        playerColor={playerColor}
        hasPlayerMoved={playerInfo.tilesMoved > 0}
        nextTranslation={nextTranslation}
      />
      {isPlayerActive && (
        <PlayerArrow
          playerNumber={playerNumber}
          playerColor={playerColor}
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
}) {
  // console.log("Counter Re-rendered");

  return (
    <div
      className={`${styles.playerBox} ${styles[`player${playerNumber}Box`]} ${
        hasPlayerMoved ? styles.fixBoxPosition : ""
      }`}
      style={{ translate: nextTranslation }}
    >
      <img
        className={styles.playerCounterImg}
        src={`img/buttons/btn-${playerColor}.webp`}
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
      <img
        className={styles.playerArrowImg}
        src={`img/buttons/down-arrow-${playerColor}.svg`}
        alt={`${playerColor} Arrow`}
      />
    </div>
  );
}

export default CounterAndArrow;
