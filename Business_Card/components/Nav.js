import React from "react";

export default function Nav(){
    return(
     <header>
     <img className="header--face" src="./images/face.jpg" alt="My Face" />
     <nav>
        <h3>Szymon KD</h3>
        <h6>Web Developer</h6>
        <p>szymonkd.website</p>
        <div className="nav--buttons">
            <button className="nav--email">Email</button>
            <button className="nav--github">GitHub</button>
        </div>
     </nav>
     </header>   
    )
}