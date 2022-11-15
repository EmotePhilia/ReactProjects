import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Score from "./Score"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [numberOfRolls, setNumberOfRolls] = React.useState(0)
    // console.log("hudźba");
    // localStorage.clear();
    
    //Checking for win
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

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
            setDice(allNewDice())
            setTenzies(false)
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
            {/*
            <p className="rolls">You have rolled {numberOfRolls} times in {time.toFixed(1)} seconds</p>
            <span className="bests">Rolls record: <i>{bests.bestRoll ? bests.bestRoll : "unsettled"}</i>. Time record: <i>{bests.bestTime ? bests.bestTime : "unsetttled"}</i>.</span>
            */}
            <Score tenzies = {tenzies} numberOfRolls = {numberOfRolls} />
           
            
            
        </main>
    )
}