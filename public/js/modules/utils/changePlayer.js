import {findActivePlayerNum} from './findActivePlayerNum.js';

export const changePlayer = function(playerObjArr, diceVal) {
  const activePlayerNum = findActivePlayerNum(playerObjArr);
  let nextPlayerNum = activePlayerNum + 1;

  if (nextPlayerNum == playerObjArr.length) {
    nextPlayerNum = 0;
  }

  if (diceVal != 6) {
    playerObjArr[activePlayerNum].isActivePlayer = false;
    playerObjArr[activePlayerNum].arrowBox.style.display = 'none';

    playerObjArr[nextPlayerNum].isActivePlayer = true;
    playerObjArr[nextPlayerNum].arrowBox.style.display = 'flex';
  }
  else {
    playerObjArr[activePlayerNum].arrowBox.style.display = 'flex';
  }
}
