import React, { useState } from 'react'
import "./App.css"
import Welcome from './components/Welcome'
import Answer from "./components/Answer"
import QuizData from "./components/QuizData"
import {decode} from "html-entities"
import {nanoid} from "nanoid"

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('welcome')
  const [score, setScore] = React.useState(0)
  // const [quizVal, setQuizVal] = React.useState([])
  // const quizObj = QuizData.map(i => {
  //   const correctAnswerObj = {
  //     id: nanoid(),
  //     check: 'correct', 
  //     value: decode(i.correct_answer),
  //     selected: false,
  //     question: decode(i.question)
  //   }
  //   const incorrectAnswersObj = i.incorrect_answers.map((j) => ({
  //     id: nanoid(),
  //     check: 'incorrect',
  //     value: decode(j),
  //     selected: false,
  //     question: decode(i.question)
  //   }))

  //   // Random sort to shuffle answers so correct answer wouldn't always be the first button
  //   const allAnswers = [correctAnswerObj, ...incorrectAnswersObj].sort((a, b) => 0.5 - Math.random());
    
  //   return {question: decode(i.question), answers: allAnswers}
  // })



  const [quizVal, setQuizVal] = React.useState([])

  React.useEffect(()=> {
    console.log('effect ran')
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
      setQuizVal(data.results.map((i) => 
      {
        const correctAnswerObj =
        {
          id: nanoid(),
          check: 'correct', 
          value: decode(i.correct_answer),
          selected: false,
          question: decode(i.question)
        }

        const incorrectAnswersObj = i.incorrect_answers.map((j) =>
        ({
          id: nanoid(),
          check: 'incorrect',
          value: decode(j),
          selected: false,
          question: decode(i.question)
        }))
        // Random sort to shuffle answers so correct answer wouldn't always be the first button
        const allAnswers = [correctAnswerObj, ...incorrectAnswersObj].sort((a, b) => 0.5 - Math.random());
      
      return {question: decode(i.question), answers: allAnswers}
      }))
    }
    )}, [])

    // console.log(quizVal[0])

  

  function selectAnswer(aID, qID) {
    setQuizVal(prevVal => {
      let newVal = []
      for (let v of prevVal) {
        if (v.question === qID) {
          let newAnswers = v.answers.map((a) => a.id === aID ?
            a.selected ? a : {...a, selected: true} : a.selected ? {...a, selected: false} : a)
        newVal.push({question: v.question, answers: newAnswers})
        } else {
          newVal.push(v)
        }
      }
      return newVal
    }
    )}
    
  function quizAction() {
    if (currentPage==='welcome') {
      setCurrentPage('quiz')
    }
    else if (currentPage === 'result') {
      setQuizVal(prevVal => prevVal.map((v) => 
        ({question: v.question,
          answers: v.answers.map((a) => 
            ({
              ...a, selected: false
            })
          )
        })
      ))
      setScore(0)
      setCurrentPage('welcome')
    } else {
      setCurrentPage('result')
    }
  }
      

  const questions = quizVal.map((q) => {
    return (
      <div className="question-container">
        <h3 className="question">{q.question}</h3>
        <div className="answers">
            {q.answers.map((a) =>
              <Answer
                key={a.id}
                selected={a.selected}
                value={a.value}
                check={a.check}
                result={currentPage==='result'}
                handleClick={() => selectAnswer(a.id, q.question)}
              />
            )}
        </div>
      </div>
    )
  })

  React.useEffect(() => {
    let scoreCount = 0
    for (let v of quizVal) {
      for (let a of v.answers) {
        if (a.selected && a.check==='correct') {
          scoreCount += 1
        }
      }
    }
    setScore(scoreCount)
  }, [quizVal])

  return (
    <div className="App">
        {currentPage==='welcome' && <Welcome startQuiz={quizAction}/>}
        {currentPage!=='welcome' && <div className="quiz-container">
            {questions}
            <div className="footer-container">
              {currentPage==='result' && <h4 className="score">You scored {score}/5 correct answers</h4>}
              <button className="action" onClick={quizAction}>{currentPage==='result' ? "Play again" : "Check answers"}</button>
            </div>
        </div>}
    </div>
  )
}