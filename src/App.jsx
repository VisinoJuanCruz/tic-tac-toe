import { useState } from 'react'
import './App.css'
import {Square} from './components/Square.jsx'
import { TURNS }  from './components/constants.js'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Turns } from './components/Turns'


import confetti from "canvas-confetti"





function App() {
  
  const [board,setBoard] = useState(() => {
    
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage?
      JSON.parse(boardFromStorage)
      :
      Array(9).fill(null)
  
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ??
    TURNS.X
  

  })
  const [winner, setWinner] = useState(null)


  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

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
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

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
      <button onClick={resetGame}>Reset del juego</button>
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
