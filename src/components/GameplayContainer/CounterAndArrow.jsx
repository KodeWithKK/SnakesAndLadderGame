import React from "react";
import styles from "./CounterAndArrow.module.css";

function CounterAndArrow({ color, playerNumber, playerInfo, isActive }) {
  const updateCounterPos = {
    translate: `${playerInfo.posX * 100}% -${playerInfo.posY * 100}%`,
  };

  if (playerInfo.tilesMoved == 0) {
    updateCounterPos.translate = "";
  }
  return (
    <>
      <div
        className={`${styles.playerBox} ${styles[`player${playerNumber}Box`]} ${
          playerInfo.tilesMoved > 0 ? styles.fixBoxPosition : ""
        }`}
        style={updateCounterPos}
      >
        <img
          className={styles.playerCounterImg}
          src={`img/buttons/btn-${color}.webp`}
        />
      </div>
      {isActive && (
        <div
          className={`${styles.playerBox} ${
            styles[`player${playerNumber}Box`]
          } ${playerInfo.tilesMoved > 0 ? styles.fixBoxPosition : ""}`}
          style={updateCounterPos}
        >
          <img
            className={styles.playerArrowImg}
            src={`img/buttons/down-arrow-${color}.svg`}
            alt=""
          />
        </div>
      )}
    </>
  );
}

const PureCounterAndArrow = React.memo(CounterAndArrow);
export default PureCounterAndArrow;
