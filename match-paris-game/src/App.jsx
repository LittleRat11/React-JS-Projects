

import {useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header'
import {cardImages} from './components/ImageDatas';
import Cards from './components/Card';

function App() {
    const[time,setTime] = useState(0);
    const[isRunning,setIsRunning] = useState(false);
    const[fastestTime,setFastestTime] = useState(null);
    const[cards,setCards] = useState([]);
    const[choiceOne, setChoiceOne] = useState(null);
    const[choiceTwo, setChoiceTwo] = useState(null);
    const[disabled, setDisabled] = useState(false);
    // *card choiced
    const handleChoice = (card) => {
            if(isRunning) {
            choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
            }
     }
    const reset = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
}
    // *Cards shuffled
    const shuffleCards = () => {
    const shuffledCards = [...cardImages,...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card,id: Math.random()}));

    setCards(shuffledCards);
};
    useEffect(() => {
        shuffleCards();
    },[]
    );
    useEffect(() => {
    let interval;
    if(isRunning) {
        interval = setInterval(() =>{
            setTime((prevTime) => prevTime + 1);
        },1000);
    };
    return () => clearInterval(interval);
},[isRunning]);

// *cards matched

useEffect(() =>{
    if(choiceOne && choiceTwo) {
        setDisabled(true);
        if(choiceOne.src === choiceTwo.src) {
            setCards((prevCard) => {
                const updatedCards = prevCard.map((card) => {
                    if(card.src === choiceOne.src || card.src === choiceTwo.src) {
                        return {...card,matched: true};
                        }else {
                            return card;    
                        }
                });
                if(updatedCards.every((card) => card.matched )) {
                    handleRestart();
                };
                return updatedCards;
            });
            reset();
    }else {
        setTimeout(() => {
            reset();
},500)
}
}
},[choiceOne,choiceTwo]);
//* for running button
const handleStart = () => {
    setIsRunning(true);
};
// *FOR RESTART BUTTON
    const handleRestart = () => {
        if(isRunning) {
            setIsRunning(false);
            setTime(0);
            shuffleCards();
            if(fastestTime === null || fastestTime > time) {
                setFastestTime(time);
              }
        }
    
}

  return (

        <div className="App">
            <Header handleStart={handleStart} handleRestart={handleRestart} time={time} fastestTime={fastestTime}/>
            <div className='card-grid'>
                {
                    cards.map((card) => {

                        return(
                                    <div key={card.id}>
                                        <Cards
                                        card={card}
                                        handleChoice={handleChoice}
                                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                                        disabled={disabled}/>
                                    </div>
                        )
                        })
                }        
            </div>
        </div>
        
    
  )
}

export default App
