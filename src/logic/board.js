import { winnerCombos } from '../constants'

export const checkWinnerFromLogic = (boardToCheck) => {
    for (const combo of winnerCombos) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

export const checEndGameFromLogic = (newBoard) => {
    return newBoard.every((square) => square !== null)
}