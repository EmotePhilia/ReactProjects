import React from "react";
import ReactDOM from "react-dom";
import Nav from "./components/Nav.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";
function App(){
    return(
        <div id="page-wrapper">
        <Nav />
        <Main />
        <Footer />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));