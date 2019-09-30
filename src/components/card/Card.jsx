import React from 'react';//Importing React
import ReactCardFlip from "react-card-flip";//importing a ReactCardFlip

const Card = ({ id, isFlipped, handleClick, cardNumber }) => (//Constructing a card
  <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={1} flipSpeedFrontToBack={1} >
    <button id={id} className={`card card-front ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="front">
      
    </button>

    <button id={id} className={`card card-back ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="back">
      { cardNumber }
    </button>
  </ReactCardFlip>
);//Closing the construction of the button

export default Card; //Exporting a card