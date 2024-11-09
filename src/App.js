import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const winner = calculateWinner(squares);
    // If there's already a winner or the square is already filled, ignore the click
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // Switch turns
  }

  function handleReset() {
    setSquares(Array(9).fill(null));  // Reset all squares to null
    setXIsNext(true);                 // Reset X to be the next player
  }

  const result = calculateWinner(squares); // Check the game result (winner or draw)
  let status;
  if (result === 'Draw') {
    status = "It's a draw!"; // Display draw message
  } else if (result) {
    status = 'Winner: ' + result; // Display winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // Display next player
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button className="reset-button" onClick={handleReset}>
        New Game
      </button>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Horizontal top
    [3, 4, 5], // Horizontal middle
    [6, 7, 8], // Horizontal bottom
    [0, 3, 6], // Vertical left
    [1, 4, 7], // Vertical center
    [2, 5, 8], // Vertical right
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];  // Return the winner if there is one
    }
  }

  // If all squares are filled and there's no winner, it's a draw
  if (squares.every(square => square !== null)) {
    return 'Draw';
  }

  return null;  // No winner yet
}
