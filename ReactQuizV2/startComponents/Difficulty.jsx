import React from 'react'

export default function Difficulty(props){
    // console.log("difficulty");
    let highlightStyling = false;
    if(props.value == props.highlight){
        highlightStyling = "highlight";
    }
    return(
        <label className={highlightStyling ? "highlightDifficulty" : "difficulty"}>
                <input 
                    type="radio" 
                    name="difficulty" 
                    value={props.value} 
                    onChange={props.onModifyDifficulty}>
                </input> {props.value}</label>
    )
}