
export const fixPosition = function(activePlayerObj) {

  const playerObjBoxHeight = 10 - 0.2; // (in %)
  const playerObjBoxLeftShift = 1.05; // (in %)
  const playerObjBoxBottomShift = 1.05; // (in %)

  activePlayerObj.counterBox.style.left = `${-1*playerObjBoxHeight + playerObjBoxLeftShift}%`;
  activePlayerObj.counterBox.style.bottom = `${-1*playerObjBoxHeight + playerObjBoxBottomShift}%`;

  activePlayerObj.arrowBox.style.left = `${-1*playerObjBoxHeight + playerObjBoxLeftShift}%`;
  activePlayerObj.arrowBox.style.bottom = `${-1*playerObjBoxHeight + playerObjBoxBottomShift}%`;

  activePlayerObj.counterBox.style.margin = '0';
  activePlayerObj.arrowBox.style.margin = '0';
}
