import React from "react";

export default function Travel(props){
    //console.log(props)
    return(
        <div className="travel">
            <img src={props.imageUrl} alt={props.title}></img>
            <div className="info">
                <div className="location-info">
                    <img src="./images/location-dot.svg" alt="Localisation"></img>
                    <span className="location">{props.location}</span>
                    <a href={props.googleMapsUrl}>View on Google Maps</a>
                </div>
                <h2>{props.title}</h2>
                <h6 className="time-span">{props.startDate} - {props.endDate}</h6>
                <div className="description">{props.description}</div>
            </div>
        </div>
    )
}