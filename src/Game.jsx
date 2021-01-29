import React, { useState, useEffect } from 'react';

function Board() {
  const [squares, setSquares] = useState(
    JSON.parse(localStorage.getItem('tic-toc')) || Array(9).fill(null),
  );

  useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares));
  }, [squares]);

  const selectSquare = (s) => {
    const nextValue = calculateNextValue(squares);
    if (calculateWinner(s) || squares[s]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[s] = nextValue;
    setSquares(squaresCopy);
  };

  const renderSquare = (i) => (
    <button className='square' onClick={() => selectSquare(i)}>
      {squares[i]}
    </button>
  );

  const restart = () => {
    setSquares(Array(9).fill(null));
  };

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  let status = calculateStatus(winner, squares, nextValue);

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className='restart' onClick={restart}>
        Restart
      </button>
    </>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: can't game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  const xSquaresCount = squares.filter((r) => r === 'X').length;
  const oSquaresCount = squares.filter((r) => r === 'O').length;
  return oSquaresCount === xSquaresCount ? 'X' : 'O';
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game() {
  return (
    <>
      <h1>Play Tic-Toc-Toe</h1>
      <Board />
    </>
  );
}

export default Game;
