import React from "react"
import "./Question.css"


export default function Question(props) {
    const questionVal = props.content.question
    const answersVal = props.content.answers

    return (
        <div className="question-container">
            <h3 className="question">{questionVal}</h3>
            <div className="answers">
            </div>
        </div>
    )

}