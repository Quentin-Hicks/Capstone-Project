import "./ProblemDetails.css"
import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";
import axios from "axios"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
const ProblemDetails = (props) => {

    const {id} = useParams()

    const [activeProblem, setActiveProblem] = useState({})
    const [showHint, setShowHint] = useState(false)
    const [showAnswer, setShowAnsewr] = useState(false)
    const [userInput, setUserInput] = useState('')

    const [numberOfHintsUsed, setNumberOfHintsUsed] = useState('')
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState('')
    const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState('')

    useEffect(()=>{
        getProblemById(id)
        
    }, [])

    async function getProblemById(problemID){
        let response = await axios.get(`http://127.0.0.1:8000/api/problems/${problemID}/`)
        console.log(response.data)
        setActiveProblem(response.data)
      }

    function handleSubmit(event){
        event.preventDefault()
        isCorrect()
    }

    function isCorrect(){
        console.log(activeProblem.answer)
        if(userInput == activeProblem.answer){

            setNumberOfCorrectAnswers(activeProblem.correctAnswers++)
            setNumberOfIncorrectAnswers(activeProblem.incorrectAnswers)
            setNumberOfHintsUsed(activeProblem.hintsUsed)

            console.log(numberOfCorrectAnswers)
            console.log(numberOfIncorrectAnswers)
            console.log(numberOfHintsUsed)

            correctAnswerNotifcation()
    
        } else if(userInput != activeProblem.answer){
            
            setNumberOfCorrectAnswers(activeProblem.correctAnswers)
            setNumberOfIncorrectAnswers(activeProblem.incorrectAnswers++)
            setNumberOfHintsUsed(activeProblem.hintsUsed)

            updateData(numberOfCorrectAnswers, numberOfIncorrectAnswers, numberOfHintsUsed)
            wrongAnswerNotification()
        }
    }

    function updateData(numOfCorrect, numOfIncorrect, numOfHints){
        let problem = {
            title: activeProblem.title,
            content: activeProblem.content,
            hints: activeProblem.hints,
            answer: activeProblem.answer,
            resources: activeProblem.resources,
            live_status: activeProblem.liveStatus,
            correctAnswers: numOfCorrect,
            incorrectAnswers: numOfIncorrect,
            hintsUsed: numOfHints
        }
        updateProblem(problem, activeProblem.id)
    }

    async function updateProblem(problem, problemId){
        let response = await axios.put(`http://127.0.0.1:8000/api/problems/${problemId}/`, problem)
        // console.log(response.data)
    }

    function correctAnswerNotifcation() {
        toast.success('Correct!', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoclose: 5000
        })
    }

    function wrongAnswerNotification() {
        toast.error('Wrong, please try again...', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoclose: 5000
        })
    }

    function currentProblemView(){


        return (
            <div>
                {/* <h1>Here's a problem</h1> */}
                <p>{activeProblem.title}</p>
                <p>{activeProblem.content}</p>
                <p>Resources: {activeProblem.resources}</p>
                <button onClick={() => setShowHint(!showHint)}>Hint</button>
                <div>
                    {
                        showHint?<p>{activeProblem.hints}</p>:null
                    }
                </div>
                <div onSubmit={handleSubmit}>
                    {/* <h3></h3> */}
                    <input type="text" className="ans-input" onChange={(e) => setUserInput(e.target.value)} placeholder='Enter answer here...'/>
                    <button type="check-ans-btn">Submit Answer</button>
                </div>
                <button onClick={() => setShowAnsewr(!showAnswer)}>Show Answer</button>
                <div>
                    {
                        showAnswer?<p>{activeProblem.answer}</p>:null
                    }
                </div>
            </div>
        )
    }

    const data = [
        ["Label", "Numbers"],
        ["# of Correct Answers", activeProblem.correctAnswers],
        ["# of Incorrect Answers", activeProblem.incorrectAnswers],
        ["# of Times Hints Used", activeProblem.hintsUsed],
         // CSS-style declaration
    ]

    const options = {
        pieHole: 0.4,
        // is3D: false,
    }

    return (
        <div>
            <div >
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
            </div>
            {currentProblemView()}
        </div>
    )
}

export default ProblemDetails