
export const findActivePlayerNum = (playerObjArr) => {

  for (let i=0; i<playerObjArr.length; i++) {
    if (playerObjArr[i].isActivePlayer == true) {
      return i;
    }
  }

}
