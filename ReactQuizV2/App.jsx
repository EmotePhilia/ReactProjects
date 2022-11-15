import React from 'react'
import Difficulty from './startComponents/Difficulty'
import StartMenu from './startComponents/StartMenu'
import Quiz from './quizComponents/Quiz'

export default function App(props){
    const [startMenu, setStartMenu] = React.useState(true)
    const [difficulty, setDifficulty] = React.useState(false)
    const [questionCount, setQuestionCount] = React.useState(0)
    const [apiKey, setApiKey] = React.useState(null)
    //console.log("APP");
    //Getting api key for trivia so the questions doesn't repeat
    React.useEffect(()=>{
        fetch('https://opentdb.com/api_token.php?command=request')
            .then(res => res.json())
            .then(data => setApiKey(data.token))        
    },[true])
    return(
        startMenu ?
        <div>
            <StartMenu 
            onModifyDifficulty={(event)=>setDifficulty(event.target.value)} 
            difficulty = {difficulty}
            menuStart = {()=>{setStartMenu(false)}} 
            setQuestionCount = {(value)=>setQuestionCount(value)}/>
        </div>
        :
        <div className="quizContainer">
            <div className="blob"></div>
            <Quiz difficulty = {difficulty} menuStart = {()=>{setStartMenu(true)}} apiKey = {apiKey}questionCount = {questionCount}/>
            <div className="blob"></div>
        </div>
    )
}