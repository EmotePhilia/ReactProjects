import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [numberOfRolls, setNumberOfRolls] = React.useState(0)
    let [time, setTime] = React.useState(0)
    let [timeControl, setTimeControl] = React.useState(false)
    const[bests, setBests] = React.useState([{'bestRoll': null, 'bestTime': null}]);
    // console.log(bests);
    // localStorage.clear();
    React.useEffect(()=>{
        let bestRoll = localStorage.getItem('bestRoll');
        let bestTime = localStorage.getItem('bestTime');
        setBests({'bestRoll': bestRoll, 'bestTime': bestTime});
        setTimeControl(setInterval(()=>{
        setTime(oldVal=>oldVal+0.1)
        },100))
    },[tenzies])
    
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    if(tenzies){
        console.log(time)
            if(bests.bestTime == null || bests.bestRoll == null){
                console.log(time);
                localStorage.setItem('bestTime', time.toFixed(1));
                localStorage.setItem('bestRoll', numberOfRolls)
            }
            if(time < bests.bestTime){
                localStorage.setItem('bestTime', time.toFixed(1));
            }
            if(numberOfRolls < bests.bestRoll){
                localStorage.setItem('bestRoll', numberOfRolls)
            }
            clearInterval(timeControl)
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            // value: 5,
            // isHeld: true,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setNumberOfRolls(oldCount => oldCount + 1)
        } else {
            setTenzies(false)
            setTime(0)
            setDice(allNewDice())
            setNumberOfRolls(0)
            
        }
    }
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <p className="rolls">You have rolled {numberOfRolls} times in {time.toFixed(1)} seconds</p>
            <span className="bests">Rolls record: <i>{bests.bestRoll ? bests.bestRoll : "unsettled"}</i>. Time record: <i>{bests.bestTime ? bests.bestTime : "unsetttled"}</i>.</span>
            
        </main>
    )
}