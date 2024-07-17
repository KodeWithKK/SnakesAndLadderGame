import { useCallback, useState } from "react";
import {
  getNextCounterPosition,
  getSecondaryMovementMeta,
} from "../utils/rolldice.utils.js";

function useRollDice({
  activePlayer,
  setActivePlayer,
  setNextPlayerTurn,
  setWinnerPlayer,
}) {
  const [diceVal, setDiceVal] = useState(1);
  const [isPlayerMoving, setIsPlayerMoving] = useState(false);

  const handleBtnRoll = useCallback(() => {
    if (!isPlayerMoving) {
      setIsPlayerMoving(true);
      const nextDiceVal = Math.trunc(Math.random() * 6) + 1;
      setDiceVal(nextDiceVal);

      if (activePlayer.tilesMoved + nextDiceVal <= 100) {
        const { nextPosX, nextPosY } = getNextCounterPosition(
          activePlayer.posX,
          activePlayer.posY,
          nextDiceVal
        );

        // primary movemement
        let nextActivePlayer = { ...activePlayer };
        nextActivePlayer.tilesMoved += nextDiceVal;
        nextActivePlayer.posX = nextPosX;
        nextActivePlayer.posY = nextPosY;
        setActivePlayer(nextActivePlayer);

        // secondary movement
        nextActivePlayer = { ...nextActivePlayer };

        const {
          hasSecondaryMovement,
          nextSecondaryPosX,
          nextSecondaryPosY,
          movementType,
          secondaryMovementTilesShift,
        } = getSecondaryMovementMeta(
          nextActivePlayer.posX,
          nextActivePlayer.posY
        );

        if (hasSecondaryMovement) {
          window.setTimeout(() => {
            nextActivePlayer.posX = nextSecondaryPosX;
            nextActivePlayer.posY = nextSecondaryPosY;
            nextActivePlayer.tilesMoved += secondaryMovementTilesShift;

            if (movementType === "snake-bite") {
              nextActivePlayer.snakeBites += 1;
            } else nextActivePlayer.ladderClimbs += 1;

            setActivePlayer(nextActivePlayer);
          }, 300);
        }

        window.setTimeout(
          () => {
            setIsPlayerMoving(false);

            if (nextActivePlayer.tilesMoved === 100) {
              setWinnerPlayer(nextActivePlayer);
            }
            if (nextDiceVal !== 6) {
              setNextPlayerTurn();
            }
          },
          hasSecondaryMovement ? 600 : 300
        );
      } else {
        setIsPlayerMoving(false);

        if (nextDiceVal !== 6) {
          setNextPlayerTurn();
        }
      }
    }
  }, [
    isPlayerMoving,
    activePlayer,
    setActivePlayer,
    setNextPlayerTurn,
    setWinnerPlayer,
  ]);

  return { diceVal, isPlayerMoving, setDiceVal, handleBtnRoll };
}

export default useRollDice;
