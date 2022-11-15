import React from 'react';

export default function Answer(props){
    let highlightStyling = "answer";
    if(props.value == props.checked){
        if(props.submit){
            if(props.correct_answer == props.value){
                highlightStyling = "correctAnswer answer";
            }else{
                highlightStyling = "incorrectAnswer answer"
            };
        }else{
            highlightStyling = "checkedAnswer answer";
        }
    }else if(props.submit && props.correct_answer == props.value && props.checked == undefined){
        highlightStyling = "correctAnswerUnchecked answer"
    }else if(props.submit && props.correct_answer == props.value){
        highlightStyling = "correctAnswer answer"
    }
    
    return(
        <label key={props.answer} className={highlightStyling}>
        {props.value}
        {
            !props.submit && 
            <input type="radio" className="answer" key={props.answer} 
                value={props.value} 
                name={props.name} 
                onChange = {props.onModify}
                >
            </input>
        }
        </label>
    )
}