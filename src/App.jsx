import { useState } from "react"

const turnosArray = {
  X: '⛌',
  O: '○'
}

//componente del cuadro, se podria crear en un archivo separado, 
//se asigno este espacio porque es mas comodo, y se crea como otro componente para utilizarlo en dos instancias
const Square = ({children, isSelected, updateBoard, index}) => {
  //recibe como pros, el children sea o u x, una funcion que le permite actualizarse y el indice que ocupa en el array
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index);
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
  //tarea averiguar como hacer el minimo numero de combinaciones
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(turnosArray.X)
  const [winner, setWinner] = useState(null) //null es no hay ganador y false es un empate

  const checkWinner = (boardToCheck) => {
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

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turnosArray.X)
    setWinner(null)
  }

  const checEndGame = (newBoard) => {
    //usamos every para ver qeu cada casilla de newBoard sea distinta de null, de ser asi esta funcion devolvera true
    return newBoard.every((square) => square !== null)
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
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      setWinner(newWinner)
    } else if (checEndGame(newBoard)) {
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
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : 'Ganó:'
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
