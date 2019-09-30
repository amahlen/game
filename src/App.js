import React, { PureComponent } from 'react';//importing react and pure component
import Header from './components/header/Header';//importing hearder function from header folder
import Card from './components/card/Card';//importing Card function from card folder
import GameOver from './components/card/GameOver';//importing gameover function from card folder

import './styles/main.css';//importing main.css from styles folder

class App extends PureComponent {//Creating a class call App

  state = { 
    isFlipped: Array(16).fill(false),
    shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1
  };

  static duplicateCard = () => {
    return [0,1,2,3,4,5,6,7].reduce((preValue, current, index, array) => {//returning numbers
      return preValue.concat([current, current])
    },[]);
  };

  handleClick = event => {//making a handleClick
    event.preventDefault();
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
        prevSelectedCard: this.state.shuffledCard[cardId],
        prevCardId: cardId
    });
//creating if statement
    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({ 
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));
//creating if statement
      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {//creating an if statement
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }))
      }, 1000);
    } else {//creating an else statement
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 1000);
    }
  };

  restartGame = () => {//To restart the game
    this.setState({
      isFlipped: Array(16).fill(false),
      shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1
    });
  };
    
    constructor(props) {
    super(props);
    this.help = this.help.bind(this);
  }

  help() {
    alert('The game comprises of 8 pairs of cards (i.e 16 cards). The cards are arranged randomly and are faced down. A user flips a card by clicking on it. If the two flipped cards are a match they will disappear from our game board otherwise they will be flipped back. The game ends when all cards are successfully matched with their pairs.');
  }


  isGameOver = () => {//When the game is over
    return this.state.isFlipped.every((element, index, array) => element !== false);
  };

  render() {//rendering
    return (//returning the functions
     <div>
       <Header restartGame={this.restartGame} />
       { this.isGameOver() ? <GameOver restartGame={this.restartGame} /> :
       <div className="grid-container">
          {
            this.state.shuffledCard.map((cardNumber, index) => 
              <Card
                key={index} 
                id={index} 
                cardNumber={cardNumber} 
                isFlipped={this.state.isFlipped[index]} 
                handleClick={this.handleClick}     
              />
            )
          }
        </div>
       }
       <button onClick={this.help} className='help'>
      Get Help!
     </button>
     </div>
    );
  }
}
 
export default App;//exporting the app