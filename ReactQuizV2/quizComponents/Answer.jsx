import React from 'react';

export default function Answer(props){
    let highlightStyling = "answer";
    if(props.value == props.userAnswer){
        if(props.submit){
            if(props.correct_answer == props.value){
                highlightStyling = "correctAnswer answer";
            }else{
                highlightStyling = "incorrectAnswer answer"
            };
        }else{
            highlightStyling = "checkedAnswer answer";
        }
    }else if(props.submit && props.correct_answer == props.value ){
        highlightStyling = "correctAnswerUnchecked answer"
    }
    //console.log(props.userAnswer)
    return(
        <label key={props.answer} className={highlightStyling}>
        {props.value}
        {
            !props.submit && 
            <input type="radio" className="answer" key={props.answer} 
                value={props.value} 
                name={props.name} 
                checked = {props.userAnswer === props.value}
                onChange = {(event)=>props.setUserAnswers((old)=>{
                    return old.map((answer, index)=>{
                        if(index == event.target.name){
                            return event.target.value;
                        }else{
                            return answer;
                        }
                    })
                })}
            >
            </input>
        }
        </label>
    )
}