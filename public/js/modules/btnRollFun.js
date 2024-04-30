// import { playersPos, snakesMapping } from "module";
import {refreshWinningPlayerTrophy} from './utils/displayWinner.js';
import {findActivePlayerNum} from './utils/findActivePlayerNum.js';
import {fixPosition} from './utils/fixPosition.js';
import {changePlayer} from './utils/changePlayer.js';

/* ************** Btn Roll Functiopn ************** */

export const btnRollFun = function(playerObjArr, snakesMapping, laddersMapping, containerWinner, winnerText, btnRoll, btnRollText, dice) {

  if (btnRollText.textContent != 'Wait...') {

    btnRollText.textContent = 'Wait...';
    const diceVal = Math.trunc((Math.random() * 6)) + 1;
    dice.src = `img/Dice Images/Dice-${diceVal}.svg`;

    // finding active player and next player
    const activePlayerNum = findActivePlayerNum(playerObjArr);
    const activePlayerObj = playerObjArr[activePlayerNum];

    fixPosition(activePlayerObj);

    // MAIN CODE STARTS
    const promiseMoveCounter = new Promise((resolve, reject) => {

      if ((activePlayerObj.tilesMoved + diceVal) <= 100) {
        // finding new position
        const xCurrPos = activePlayerObj.posX;
        const yCurrPos = activePlayerObj.posY;

        activePlayerObj.tilesMoved += diceVal;

        let xNewPos = xCurrPos, yNewPos = yCurrPos;

        if (yCurrPos%2 == 1) {
          xNewPos = xCurrPos + diceVal;
          if (xNewPos > 10) {
            yNewPos = yCurrPos + 1;
            xNewPos = 10 - (xNewPos - 10) + 1;
          }
        }
        else {
          xNewPos = xCurrPos - diceVal;
          if (xNewPos < 1) {
            yNewPos = yCurrPos + 1;
            xNewPos = -xNewPos + 1;
          }
        }

        activePlayerObj.posX = xNewPos;
        activePlayerObj.posY = yNewPos;

        // primary movement
        activePlayerObj.counterBox.style.translate = `${activePlayerObj.posX*100}% -${activePlayerObj.posY*100}%`;
        activePlayerObj.arrowBox.style.translate = `${activePlayerObj.posX*100}% -${activePlayerObj.posY*100}%`;

        refreshWinningPlayerTrophy(playerObjArr);

        let hasSecondaryMovement = false;

        // finding if the player get SNAKES BITES
        for(let i=0; i<snakesMapping.length; i++) {
          if (snakesMapping[i][0][0] == xNewPos && snakesMapping[i][0][1] == yNewPos) {

            hasSecondaryMovement = true;

            xNewPos = snakesMapping[i][1][0];
            yNewPos = snakesMapping[i][1][1];
            activePlayerObj.posX = xNewPos;
            activePlayerObj.posY = yNewPos;

            activePlayerObj.snakeBites++;
            activePlayerObj.tilesMoved -= snakesMapping[i][2];
            activePlayerObj.snakeBitesText.textContent = `${activePlayerObj.snakeBites}`;
            break;
          }
        }

        // finding if the player get LADDERS CLIMBS
        for(let i=0; i<laddersMapping.length; i++) {
          if (laddersMapping[i][0][0] == xNewPos && laddersMapping[i][0][1] == yNewPos) {

            hasSecondaryMovement = true;

            xNewPos = laddersMapping[i][1][0];
            yNewPos = laddersMapping[i][1][1];
            activePlayerObj.posX = xNewPos;
            activePlayerObj.posY = yNewPos;
            activePlayerObj.tilesMoved += laddersMapping[i][2];

            activePlayerObj.ladderClimbs++;
            activePlayerObj.ladderClimbsText.textContent = `${activePlayerObj.ladderClimbs}`;
            break;
          }
        }

        if (hasSecondaryMovement) {
          setTimeout(() => {
            activePlayerObj.counterBox.style.translate = `${activePlayerObj.posX*100}% -${activePlayerObj.posY*100}%`;
            activePlayerObj.arrowBox.style.translate = `${activePlayerObj.posX*100}% -${activePlayerObj.posY*100}%`;
            refreshWinningPlayerTrophy(playerObjArr);
            return resolve();
          }, 350);
        }
        else {
          return resolve();
        }

      }
      else {
        return resolve();
      }

    })



    promiseMoveCounter.then(() => {

      setTimeout(() => {
        btnRollText.textContent = 'Roll Dice';

        if (activePlayerObj.tilesMoved == 100) {
          // Hide arrow icon
          for (const playerObj of playerObjArr) {
            if (playerObj.arrowBox.style.display == 'flex') {
              playerObj.arrowBox.style.display = 'none';
            }
          }

          containerWinner.style.display = "inline-block";
          btnRoll.style.display = "none";
          const activePlayerNo = findActivePlayerNum(playerObjArr);
          winnerText.innerHTML = `Hurrrrrrray!<br>${playerObjArr[activePlayerNo].name} is the Winner`;
        }
        else {
          changePlayer(playerObjArr, diceVal);
        }

      }, 350);

    })
  }

}
