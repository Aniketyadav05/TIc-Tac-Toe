
import { useState } from "react";
import './index.css'
import './App.css'
// This function creates the square  blocks and this takes the value of that particular square in the game and
//  it also takes the function which calls the handleClick function with passing the no. of that particular sq.
function Square({value,onSquareClick}) {
 
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}
function Board({ xIsNext, squares, onPlay }) {
  // finding the winner by calling the calculateWinner function and passing the current squares to it
  const winner = CalculateWinner(squares)
  // variable to find Currect status of the game
  let status;
  // If else condition to find if the game has ended or not
  if(winner){
    status = "Winner: "+ winner;
  }
  else{
    status = "Next Turn: "+(xIsNext?"X":"O");
  }
  // Function that handles the click of the user and accepts the id of the block that is clicked
  function handleClick(i){
    // if the block is already clicked or the winner is found stop the game
    if(squares[i] || CalculateWinner(squares)){
      
      console.log("BAAR BAAR MT KR")
      return;
    }
    // copying the entire original array 
    const nextSquares = squares.slice()
    if(xIsNext){
      nextSquares[i] ='X'
    }
    else{
      nextSquares[i] ="0"
    }
    // Updating the actual array without mutating the state directly
    onPlay(nextSquares);
  }

  return (
    <>
    <h1 className="status">{status}</h1>
      <div className="main">
        
        <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]}  onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      </div>
    </>
  );
}
export default function Game(){
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0;
  const [topMessage, setTopMessage] = useState("Let's play!");


  function handlePlay(nextSquares){

      const nextHistory = [...history.slice(0,currentMove+1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length-1)
      const xMessages = ["CHii CHII", "🤮🤢🤢🤮", "Khelna sikhle"];
const oMessages = ["Ghatiya", "🫠🫠", "Bekar"];

const nextMessage = xIsNext
  ? xMessages[Math.floor(Math.random() * xMessages.length)]
  : oMessages[Math.floor(Math.random() * oMessages.length)];

setTopMessage(nextMessage);

      
  }
  function JumpTo(nextMove){
    setCurrentMove(nextMove)
    
  }

  const moves = history.map((squares, move)=> {
    let description;
    if(move>0){
      description = "Go to the move #"+ move
    }
    else{
      description = "GO TO THE START OF THE GAME BITCH";
    }
    return (
      <li key={move}>
        <button className="moves" onClick={()=> JumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <>
    <div className="top-left-message">{topMessage}</div>

    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol >{moves}</ol>
      </div>
    </div>
    </>
  )
}
function CalculateWinner(squares){
  // array of the conditions in which  a player can win
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // iterating through this array to find out the winner
  for(let i=0;i<lines.length;i++){
    // putting the values of the ith array of the lines 
    const [a,b,c] = lines[i];
    // Finding if the value or we can say checking if the value(either X or O) is the all same at the positon a,b,c in squares array
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      // if yes return the winner
      return squares[a];
    }
  }
  // either return null
  return null;
}