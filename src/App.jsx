import { useState } from "react"
import confetti from 'canvas-confetti'

import {Square} from './components/Square'
import { turnosArray } from './constants'
import { checkWinnerFromLogic, checEndGameFromLogic } from './logic/board'
import { WinnerModal } from "./components/WinnerModal"

function App() {
  //states
  const [board, setBoard] = useState(() => {
      const boardFromStorage = window.localStorage.getItem('board')
      return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    }
  )
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turnosArray.X
  })
  const [winner, setWinner] = useState(null) //null es no hay ganador y false es un empate

  //localFunctions
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turnosArray.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  const updateBoard = (index) => {
    //si la posicion esta ocupada se 
    //hace un return para evitar rellenar
    if (board[index] || winner) return
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === turnosArray.X ? turnosArray.O : turnosArray.X
    setTurn(newTurn)
    //set localstorage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //revisar si hay ganador
    const newWinner = checkWinnerFromLogic(newBoard)
    if(newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checEndGameFromLogic(newBoard)) {
      setWinner(false)
    }
  }
  

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del jnuego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === turnosArray.X}>
          {turnosArray.X}
        </Square>
        <Square isSelected={turn === turnosArray.O}>
          {turnosArray.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
