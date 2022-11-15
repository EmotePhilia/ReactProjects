import React from 'react';
import Answer from './Answer';

export default function Question(props){
    const [answers, setAnswers] = React.useState([])
    //console.log("question")
    //Setting answers ONCE.
    React.useEffect(()=>{
        let incorrect = props.question.incorrect_answers;
        incorrect = [...incorrect, props.question.correct_answer]
        let all_answers = []
        while(incorrect.length>0){
            all_answers.push(incorrect.splice(Math.floor(Math.random()*incorrect.length)));
        }
        all_answers = all_answers.flat() //Flattening the monstrous array from splicing.
        setAnswers(all_answers);
    }, [true]);
    
    //Decoding text values from api (they're sometimes containing some html entities)
    function decodeHTML(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    //Creating answer components (radio buttons) for question
    const content = answers.map(answer=>{
        return(
            <Answer key = {answer}
                name = {props.name} //index of question as a name. 
                value = {decodeHTML(answer)} 
                correct_answer = {decodeHTML(props.question.correct_answer)} 
                setUserAnswers = {props.setUserAnswers}
                userAnswer = {props.userAnswers[props.name]}
                submit = {props.submit}
             />
        )
    });
    
    return(
    <div className="question">
        <h3>{decodeHTML(props.question.question)}</h3>
        <div className="answersContainer">
            {content}
        </div>
        <hr/>
    </div>
    )
}