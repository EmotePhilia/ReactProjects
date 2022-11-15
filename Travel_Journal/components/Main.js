import React from "react";
import Travel from "./Travel"
import Shadow from "./Shadow"
import Data from "../data.js";
export default function Main(){
    //console.log(Data)
    let travel_list = Data.map(item=>{
        return (<Travel {...item}/>)
    })
    for(let i=1; i<travel_list.length;i++){
            //console.log(travel_list[i])
            travel_list[i] = <div><Shadow />{travel_list[i]}</div>
    }
    return(
        <main>
           {travel_list}
        </main>
    )
}