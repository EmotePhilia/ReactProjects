import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
        
    }
    const die = `die-face${props.value}`
    const dots = []
    for(let i=0; i<props.value; i++){
        dots.push(<div key={i} className="die-dot"></div>)
    }
    return (
        <div 
            className={die} 
            style={styles}
            onClick={props.holdDice}
        >
        {dots}
            {//<h2 className="die-num">{props.value}</h2>
            }
        </div>
    )
}