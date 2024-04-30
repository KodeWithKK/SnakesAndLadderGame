import React from "react";
import Button from "../comman/Button/Button";
import CounterAndArrow from "./CounterAndArrow";
import { AppContext } from "../../contexts/AppProvider";
import styles from "./GameplayContainer.module.css";

const GameplayContainer = () => {
  const [btnRollText, setBtnRollText] = React.useState("Roll Dice");
  const [diceVal, setDiceVal] = React.useState(1);
  const { playersInfo, setPlayersInfo, currentPlayerNum, setCurrentPlayerNum } =
    React.useContext(AppContext);

  const handleBtnRoll = React.useCallback(() => {
    if (btnRollText !== "Wait...") {
      setBtnRollText("Wait...");
      const nextDiceVal = Math.trunc(Math.random() * 6) + 1;
      setDiceVal(nextDiceVal);

      const currentPlayer = playersInfo[currentPlayerNum];

      if (currentPlayer.tilesMoved + nextDiceVal <= 100) {
        currentPlayer.tilesMoved += nextDiceVal;

        let { nextPosX, nextPosY } = getNextCounterPosition(
          currentPlayer.posX,
          currentPlayer.posY,
          nextDiceVal
        );

        currentPlayer.posX = nextPosX;
        currentPlayer.posY = nextPosY;

        // primary movement
        let nextCurrentPlayerInfo = { ...currentPlayer };
        playersInfo[currentPlayerNum] = nextCurrentPlayerInfo;

        // secondary movement
        let hasSecondaryMovement = false;
        let secondaryMovementTilesShift = 0;
        let movementType = "";

        for (const [currPos, nextPos, tilesMoved] of snakesMapping) {
          if (nextPosX === currPos[0] && nextPosY === currPos[1]) {
            hasSecondaryMovement = true;
            nextPosX = nextPos[0];
            nextPosY = nextPos[1];
            secondaryMovementTilesShift = -1 * tilesMoved;
            movementType = "snake-byte";
            break;
          }
        }

        for (const [currPos, nextPos, tilesMoved] of laddersMapping) {
          if (nextPosX === currPos[0] && nextPosY === currPos[1]) {
            hasSecondaryMovement = true;
            nextPosX = nextPos[0];
            nextPosY = nextPos[1];
            secondaryMovementTilesShift = tilesMoved;
            movementType = "ladder-climbs";
            break;
          }
        }

        let translationEndingTime = 350;

        if (hasSecondaryMovement) {
          translationEndingTime = 350;

          window.setTimeout(() => {
            nextCurrentPlayerInfo.posX = nextPosX;
            nextCurrentPlayerInfo.posY = nextPosY;
            nextCurrentPlayerInfo.tilesMoved += secondaryMovementTilesShift;

            if (movementType === "snake-byte") {
              nextCurrentPlayerInfo.snakeBites += 1;
            } else nextCurrentPlayerInfo.ladderClimbs += 1;

            nextCurrentPlayerInfo = { ...nextCurrentPlayerInfo };
            playersInfo[currentPlayerNum] = nextCurrentPlayerInfo;
          }, 350);
        }

        window.setTimeout(() => {
          setBtnRollText("Roll Dice");
          if (nextDiceVal !== 6) {
            setCurrentPlayerNum((currentPlayerNum + 1) % playersInfo.length);
          }
        }, translationEndingTime);
      } else {
        setBtnRollText("Roll Dice");
        if (nextDiceVal !== 6) {
          setCurrentPlayerNum((currentPlayerNum + 1) % playersInfo.length);
        }
      }
    }
  }, [btnRollText, currentPlayerNum, playersInfo, setCurrentPlayerNum]);

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
          color="yellow"
          playerNumber={1}
          playerInfo={playersInfo[1]}
          isActive={currentPlayerNum === 1}
        />
        <CounterAndArrow
          color="red"
          playerNumber={0}
          playerInfo={playersInfo[0]}
          isActive={currentPlayerNum === 0}
        />
      </div>
      <div className={styles.containerDiceAndRollBtn}>
        <img
          className={styles.diceImg}
          src={`img/Dice Images/Dice-${diceVal}.svg`}
          alt=""
        />
        <Button className={styles.btnRoll} onClick={handleBtnRoll}>
          {btnRollText}
        </Button>
      </div>
    </div>
  );
};

function getNextCounterPosition(posX, posY, diceVal) {
  let nextPosX = posX,
    nextPosY = posY;

  if (posY % 2 == 1) {
    nextPosX = posX + diceVal;

    if (nextPosX > 10) {
      nextPosY = posY + 1;
      nextPosX = 10 - (nextPosX - 10) + 1;
    }
  } else {
    nextPosX = posX - diceVal;

    if (nextPosX < 1) {
      nextPosY = posY + 1;
      nextPosX = -nextPosX + 1;
    }
  }

  return { nextPosX, nextPosY };
}

const snakesMapping = [
  [[5, 2], [6, 1], 10],
  [[7, 5], [6, 3], 21],
  [[9, 5], [10, 3], 19],
  [[5, 6], [8, 6], 3],
  [[2, 7], [2, 2], 43],
  [[3, 7], [1, 6], 3],
  [[7, 9], [4, 3], 63],
  [[8, 10], [8, 8], 20],
  [[6, 10], [6, 8], 20],
  [[3, 10], [3, 8], 20],
];

const laddersMapping = [
  [[1, 1], [3, 4], 37],
  [[4, 1], [7, 2], 10],
  [[9, 1], [10, 4], 22],
  [[1, 3], [2, 5], 21],
  [[8, 3], [4, 9], 56],
  [[5, 4], [4, 5], 8],
  [[10, 6], [7, 7], 16],
  [[10, 8], [10, 10], 20],
  [[1, 8], [1, 10], 20],
];

export default GameplayContainer;
