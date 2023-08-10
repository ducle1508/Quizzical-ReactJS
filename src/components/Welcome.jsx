import React from "react"
import "./Welcome.css"

export default function Welcome(props) {
    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Quizzical</h1>
            <h3 className="welcome-description">Some description if needed</h3>
            <button className="welcome-button" onClick={props.startQuiz}>Start quiz</button>
        </div>        
    )
}