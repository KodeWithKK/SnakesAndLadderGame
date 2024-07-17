import { useContext } from "react";
import Button from "../_shared/Button/Button";
import CounterAndArrow from "./CounterAndArrow";
import styles from "./GameplayContainer.module.css";
import { AppContext } from "../../contexts/AppProvider";

const GameplayContainer = () => {
  const {
    diceVal,
    isPlayerMoving,
    playersInfo,
    activePlayerNum,
    handleBtnRoll,
  } = useContext(AppContext);

  return (
    <div className={styles.containerGameplay}>
      <div className={styles.board}>
        <img
          className={styles.boardImg}
          src="img/snakeAndLadderCompressed.webp"
          alt="Snakes-and-Ladders-Board"
        />
        <div className={styles.containerWinner}>
          <div className={styles.containerWinner__bg} />
          <div className={styles.containerWinner__content}>
            <img
              className={styles.trophyImg}
              src="img/trophy.svg"
              alt="trophy-img"
            />
            <p className={styles.winnerText} />
            <Button className={styles.btnRestart}>Restart</Button>
          </div>
        </div>
        {/* Players Counters and Arrow */}
        <CounterAndArrow
          playerColor="yellow"
          playerNumber={1}
          playerInfo={playersInfo[1]}
          isPlayerActive={activePlayerNum === 1}
        />
        <CounterAndArrow
          playerColor="red"
          playerNumber={0}
          playerInfo={playersInfo[0]}
          isPlayerActive={activePlayerNum === 0}
        />
      </div>
      <div className={styles.containerDiceAndRollBtn}>
        <img
          className={styles.diceImg}
          src={`img/Dice Images/Dice-${diceVal}.svg`}
          alt=""
        />
        <Button className={styles.btnRoll} onClick={handleBtnRoll}>
          {isPlayerMoving ? "Wait..." : "Roll Dice"}
        </Button>
      </div>
    </div>
  );
};

export default GameplayContainer;
