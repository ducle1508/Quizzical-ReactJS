import React from "react"
import "./Answer.css"

export default function Answer(props) {
    let status = props.result ? 
                (props.selected ? (props.check === 'correct' ? 'correct' : 'incorrect') : (props.check === 'correct' ? 'correct' : 'default')) 
                : (props.selected ? 'selected' : 'default')

    let styles = {
        border: status === 'default' ? '1px solid #8c96c1' : 0,
        backgroundColor: status === 'default' ? 'transparent' : (status === 'selected' ? '#D6DBF5' : (status === 'correct' ? '#94d7a2': '#f6d9db'))
    }
    return (
        <button 
            className="answer-button"
            style={styles}
            onClick={props.handleClick}
        >
            {props.value}
        </button>
    )
}