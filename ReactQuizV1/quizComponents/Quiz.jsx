import React from 'react';
import Question from './Question'
export default function Quiz(props){
    
    const [dataResults, setDataResults] = React.useState(false);
    const [submit, setSubmit] = React.useState(false); 
    const [userAnswers, setUserAnswers] = React.useState([]);
    const [collected, setCollected] = React.useState([false]) //Status of answers collection from submit. It has 5 false values because it represents colleciton status of 5 questions. Surely it can be automatised but i dunno about the performance
    //console.log(dataResults);
    //Fetching questions
    React.useEffect(()=>{
        setCollected(()=>{
            let collectedSetup = []
            for(let i = 0; i<props.questionCount; i++){
                collectedSetup.push(false);
            }
            return collectedSetup;
        })
        fetch(`https://opentdb.com/api.php?amount=${props.questionCount}&category=23&difficulty=${props.difficulty}&type=multiple&token=${props.apiKey}`)
        .then(res => res.json())
        .then(data =>{
            setDataResults(data.results);
        })
    },[true]);
    
    //Checking if every answer is collected, if yes it calculates user score.
    let checkCollection = collected.every((value)=>value);
    let correctUserAnswers = []
    if(checkCollection){
        correctUserAnswers = userAnswers.filter((val,index)=>{
            if(val!==true){
                if(val == dataResults[index].correct_answer){
                    return val;
                }
            }
        })
    }
    //Making content for site.
    let content = [];
    function fulfillContent(){
        content = dataResults.map((dataResult, index)=>{
            return(<Question className="question" key={index} 
                name={index}
                question={dataResult} 
                submit = {submit}
                collected = {collected}
                setCollected = {setCollected}
                collectAnswers = {setUserAnswers}
                />
            )
        })
    };
    dataResults && fulfillContent(); //If we've got dataResults fetched then we create content.
    
    
    
    return(
        dataResults ? <main className="mainQuestions">
        {content}
        {!checkCollection ? 
            <button className="submit" 
                onClick={()=>{
                    setSubmit(true);
                }}> 
            Check Answers </button>
            :
            <div className="submitContainer">
                <h4>You scored {correctUserAnswers.length}/{dataResults.length} correct answers</h4>
                <button className="submit" 
                    onClick={()=>{
                        props.menuStart()
                    }}> 
                Play Again</button>
            </div>
        }
        </main>
        : 
        //Loader found in web: https://loading.io/css/
        <div className="loading">
            <div className="lds-grid">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}