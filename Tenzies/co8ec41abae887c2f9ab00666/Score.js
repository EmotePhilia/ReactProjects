import React from "react"

export default function Score(props){
    // const [numberOfRolls, setNumberOfRolls] = React.useState(0)
    let [time, setTime] = React.useState(0)
    let [timeControl, setTimeControl] = React.useState(false)
    const[bests, setBests] = React.useState([{'bestRoll': null, 'bestTime': null}]);
    // localStorage.clear();
    
    //It needs to be run only when win condition occurs (tenzies == true) and to clear time when the button roll is clicked afterwards (props.tenzies == false) so it runs 3 times.
    React.useEffect(()=>{
        let run = true;
        if(props.tenzies){
            if(bests.bestTime == null || bests.bestRoll == null){
                localStorage.setItem('bestTime', time.toFixed(1));
                localStorage.setItem('bestRoll', props.numberOfRolls)
            }
            if(time < bests.bestTime){
                localStorage.setItem('bestTime', time.toFixed(1));
            }
            if(props.numberOfRolls < bests.bestRoll){
                localStorage.setItem('bestRoll', props.numberOfRolls)
            }
            clearInterval(timeControl);
            run = false;
        }else if(!props.tenzies){
            setTime(0);
        }
        let bestRoll = localStorage.getItem('bestRoll');
        let bestTime = localStorage.getItem('bestTime');
        setBests({'bestRoll': bestRoll, 'bestTime': bestTime});
        if(run){
            setTimeControl(setInterval(()=>{
                setTime(oldVal=>oldVal+0.1)
            },100))
        }
    },[props.tenzies])
    
    return(
        <div className="rolls">
            <p>You have rolled {props.numberOfRolls} times in {time.toFixed(1)} seconds</p>
            <p>Best rolls: 
            <span className="bests-score">{bests.bestRoll ? bests.bestRoll : "unsettled"}</span>. Best time: 
            <span className="bests-score">{bests.bestTime ? bests.bestTime : "unsetttled"}s</span>.</p>
        </div>
    )
}