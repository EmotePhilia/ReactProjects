import React from 'react'
import Difficulty from './Difficulty'
export default function StartMenu(props){
    function settingApi(){
        questionCount = document.getElementById("questionCount").value;
        if(props.difficulty && questionCount<21 && questionCount>0){
            props.setQuestionCount(questionCount);
            props.menuStart()
        }     
    }
    return(
    <main className="startMain">
         <div className="blob"></div>
         <div id="startMenu">
            <h1>History Trivia</h1>
            <p>Please select difficulty:</p>
            <div className="difficultyContainer">
                <Difficulty value="easy" onModifyDifficulty={props.onModifyDifficulty} highlight = {props.difficulty}/><br/>
                <Difficulty value="medium" onModifyDifficulty={props.onModifyDifficulty} highlight = {props.difficulty}/><br/>
                <Difficulty value="hard" onModifyDifficulty={props.onModifyDifficulty} highlight = {props.difficulty}/><br/>
            </div>
            <div id="questionCountContainer">
                <p>How many questions? (1-20)</p>
                <input type="number" min="1" max="20" id="questionCount"></input>
            </div>
            <button className="submit" onClick = {settingApi}
                >Start Trivia</button>
        </div>
        <div className="blob"></div>
    </main>
    )
}