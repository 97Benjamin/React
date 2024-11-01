
import { useState } from 'react'
import './App.css'

import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState (TURNS.X)
  //null no hay ganador, false empate
  const [winner,setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    
  }

  const updateBoard = (index) =>{
    // si el espacio esta marcado no vuelve a cambiar
    if(board[index] || winner) return
    // actualizar tablero
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner){
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className='board'>
      <h1>Gato</h1>
      <section className='game'>
      {
        board.map((_,index)=>{
          return(
            <Square
            key = {index}
            index={index}
            updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
      </section>

      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
    
  )
}

export default App
