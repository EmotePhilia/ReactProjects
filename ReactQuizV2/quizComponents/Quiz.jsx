import React from 'react';
import Question from './Question'

export default function Quiz(props){
    //Constructing template for userAnswers, so i can easily change proper indexes (5th question = template[4])
    const userAnswersTemplate = []
    while(userAnswersTemplate.length!=props.questionCount){
        userAnswersTemplate.push(false)
    } 
    const [dataResults, setDataResults] = React.useState(false);
    const [submit, setSubmit] = React.useState(false); 
    const [userAnswers, setUserAnswers] = React.useState(userAnswersTemplate);
    const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
    //console.log(userAnswers);
    //console.log(dataResults);
    //console.log("quiz")
    //Fetching questions
    React.useEffect(()=>{
        fetch(`https://opentdb.com/api.php?amount=${props.questionCount}&category=23&difficulty=${props.difficulty}&type=multiple&token=${props.apiKey}`)
        .then(res => res.json())
        .then(data =>{
            setDataResults(data.results);
        })
    },[true]);
    
    //Making content for site.
    let content = [];
    function fulfillContent () {
        content = dataResults.map((dataResult, index) => {
            return(<Question className="question" key={index} 
                name = {index}
                question = {dataResult} 
                submit = {submit}
                setUserAnswers = {setUserAnswers}
                userAnswers = {userAnswers}
                />
            )
        })
    };
    dataResults && fulfillContent(); //If we've got dataResults fetched then we create content.
    
    //Checking answers if they are correct to display correct answers count.
    React.useEffect(()=>{
        if(submit){
            let userAnswersLength = userAnswers.length
            for(let i=0;i<userAnswersLength;i++){
                if(dataResults[i].correct_answer === userAnswers[i]){
                    setCorrectAnswersCount(old => old+1)
                }
            }
        }
    },[submit])
    
    return(
        dataResults ? <main className="mainQuestions">
        {content}
        {!submit ?
            <button className="submit" 
                onClick={()=>{
                    setSubmit(true);
                }}> 
            Check Answers </button>
            :
            <div className="submitContainer">
                <h4>You scored {correctAnswersCount}/{dataResults.length} correct answers</h4>
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