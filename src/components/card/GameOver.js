import React from 'react';//Importing a react

const GameOver = ({ restartGame }) => (//constructing a GameOver function
  <div className="justify-center">
    <h1>Game Over!</h1>
    <button className="restart-button" onClick={restartGame}>Restart Game</button>
  </div>
);

export default GameOver;
//Exporting GameOver