import { useState } from 'react'
import './App.css'
import {Square} from './components/Square.jsx'
import { TURNS }  from './components/constants.js'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Turns } from './components/Turns'


import confetti from "canvas-confetti"




const board = Array(9).fill(null);

function App() {
  
  const [board,setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)


  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    
    if(board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
      }else if(checkEndGame(newBoard)){
        setWinner(false)
      }  }


  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      <section className="game">
        {
          board.map((square,index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )}
          )
        }
      </section>
      <Turns turn={turn} />

      <WinnerModal  winner={winner} resetGame={resetGame}/>


    </main>
    
    
  )
}

export default App
