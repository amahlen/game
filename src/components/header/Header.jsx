import React from 'react';//Importing React

const Header = ({ restartGame, help }) => (//constracting Header function
  <div className="grid-header-container">
    <div className="justify-left timer"></div>
    <div className="justify-center game-status-text"></div>
    <div className="justify-end">
      <button onClick={restartGame} className="restart-button">Restart Game</button>
    </div>
  </div>
);

export default Header;//Exporting the Header function