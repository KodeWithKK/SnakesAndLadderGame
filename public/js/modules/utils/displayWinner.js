export const displayWinnerTrophyIcon = (playerObjArr, winningPlayerObj, isAllPlayerAtSamePos) => {

  // Hide all players trophy
  for(let i=0; i<playerObjArr.length; i++) {
    playerObjArr[i].trophyIcon.style.visibility = 'hidden';
  }

  if (isAllPlayerAtSamePos == false) {
    winningPlayerObj.trophyIcon.style.visibility = 'visible';
  }
}

export const refreshWinningPlayerTrophy = (playerObjArr) => {

  // checking if all players are at same pos
  let isAllPlayerAtSamePos = true;

  for(let i=1; i<playerObjArr.length; i++) {
    if (playerObjArr[i-1].tilesMoved != playerObjArr[i].tilesMoved) {
      isAllPlayerAtSamePos = false;
      break;
    }
  }

  // ----- FINDING THE WINNER ----- //
  // supposing the winner is first one
  let winningPlayerNo = 0;
  let winningPlayerPos = playerObjArr[0].tilesMoved;

  // checking who is the actual winner is
  for(let i=1; i<playerObjArr.length; i++) {
    if (playerObjArr[i].tilesMoved > winningPlayerPos) {
      winningPlayerPos = playerObjArr[i].tilesMoved ;
      winningPlayerNo = i;
    }
  }

   // display his/her  trophy
   displayWinnerTrophyIcon(playerObjArr, playerObjArr[winningPlayerNo], isAllPlayerAtSamePos);
}
