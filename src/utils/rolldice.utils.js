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

function getSecondaryMovementMeta(posX, posY) {
  let hasSecondaryMovement = false;
  let nextSecondaryPosX, nextSecondaryPosY;
  let secondaryMovementTilesShift = 0;
  let movementType = "";

  for (const [currPos, nextPos, tilesMoved] of snakesMapping) {
    if (posX === currPos[0] && posY === currPos[1]) {
      hasSecondaryMovement = true;
      nextSecondaryPosX = nextPos[0];
      nextSecondaryPosY = nextPos[1];
      secondaryMovementTilesShift = -1 * tilesMoved;
      movementType = "snake-bite";
      break;
    }
  }

  for (const [currPos, nextPos, tilesMoved] of laddersMapping) {
    if (posX === currPos[0] && posY === currPos[1]) {
      hasSecondaryMovement = true;
      nextSecondaryPosX = nextPos[0];
      nextSecondaryPosY = nextPos[1];
      secondaryMovementTilesShift = tilesMoved;
      movementType = "ladder-climbs";
      break;
    }
  }

  return {
    hasSecondaryMovement,
    nextSecondaryPosX,
    nextSecondaryPosY,
    movementType,
    secondaryMovementTilesShift,
  };
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

export { getNextCounterPosition, getSecondaryMovementMeta };
