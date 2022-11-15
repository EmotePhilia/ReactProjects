import React from 'react';
import Answer from './Answer';

export default function Question(props){
    const [answers, setAnswers] = React.useState([])
    const [checked, setChecked] = React.useState();
    
    React.useEffect(()=>{
        function setCollection(toBeReturned){
            props.collectAnswers((old)=>[...old, toBeReturned])
            //It purpose is to update only there where it's place is, so i can track which elements haven't been collected. If all are collected then in quiz component proper code launches.
            props.setCollected((old)=>{return old.map((elem, index)=>{
                if(index == props.name){
                    elem = !elem;
                    return elem;
                }
                else{
                    return elem;
                }
                })
            })
        } 
        if(props.submit && checked && !props.collected[props.name]){
            setCollection(checked);
        }else if(props.submit){
            setCollection(true);
        }
    },[props.submit])
    
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
                value={decodeHTML(answer)} 
                checked = {checked} //It works as a pointer, if checked == value => true
                onModify={(event)=>setChecked(event.target.value)}
                correct_answer = {decodeHTML(props.question.correct_answer)} 
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