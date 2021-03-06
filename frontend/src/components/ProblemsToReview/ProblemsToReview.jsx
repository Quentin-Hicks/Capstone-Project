import "./ProblemsToReview.css"
import React, { useEffect, useState } from 'react'
import Modal from "../../components/Modal/Modal";
import axios from "axios"

const ProblemsToReview = ({submittedProblems}) => {

    const [isOpen, setIsOpen] = useState(false)

    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [hints, setHints] = useState('')
    const [resources, setResources] = useState('')
    const [answer, setAnswer] = useState('')
    const [liveStatus, setLiveStatus] = useState('')

    const [changedProblem, setChangedProblem] = useState('')
    
    function update(){
        let updatedProblem = {
            title: title,
            content: content,
            hints: hints,
            answer: answer,
            resources: resources,
            live_status: liveStatus
        }
        setChangedProblem(updatedProblem)
        console.log('Problem Updated To: ', updatedProblem)
        setIsOpen(true)
        updateProblem(updatedProblem, id)
    }

    async function updateProblem(problem, problemId){
        let response = await axios.put(`http://127.0.0.1:8000/api/problems/${problemId}/`, problem)
        // console.log(response.data)
      }

    function problemInReview(id, title, content, hints, resources, answer, liveStatus){
        setId(id)
        setTitle(title)
        setContent(content)
        setHints(hints)
        setResources(resources)
        setAnswer(answer)
        setLiveStatus(liveStatus)
    }

    function problemCardData(){
        return (
            <div className="wrapper">
                {/* <h1 className='submitted-head'>Submitted Problems</h1> */}
                {submittedProblems.map((problem) => {
                    return (
                        <div className="card" key={problem.id} 
                        onClick={() => problemInReview(
                            problem.id,
                            problem.title,
                            problem.content,
                            problem.hints,
                            problem.resources,
                            problem.answer,
                            problem.live_status
                        )}>
                            <div className="card_body">
                                {/* Reminder: remove img src element */}
                                {/* <img src="images/math-equation.jpg" className='card_image'/> */}
                                <h2 className="card_title">{problem.title}</h2>
                                {/* <b className="card_details">{problem.content}</b> */}
                            </div>
                            <button onClick={() => setIsOpen(true)} className="review-btn">Review</button>
                        </div>
                    )
                })}
            </div>
        )
    }

    function updateAndClose(){
        update()
        setIsOpen(false)
    }

    return (
        <div>
            {problemCardData()}
            
            <Modal open={isOpen} onClose={updateAndClose}>
                <div className="review-container">
                    <form className="review-form">
                        <label className="review-label">Title</label>
                        <p>
                            <textarea
                                className="review-field"
                                required='required'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </p>
                        <label className="review-label">Content</label>
                        <p>
                            <textarea
                                className="review-field"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </p>
                        <label className="review-label">Hints</label>
                        <p>
                            <textarea
                                className="review-field"
                                required
                                value={hints}
                                onChange={(e) => setHints(e.target.value)}
                            />
                        </p>
                        <label className="review-label">Resources</label>
                        <p>
                            <textarea
                                className="review-field"
                                required
                                value={resources}
                                onChange={(e) => setResources(e.target.value)}
                            />
                        </p>
                        <label className="review-label">Answer</label>
                        <p>
                            <input 
                                type="text"
                                className="review-field"
                                required
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </p>
                        <label className="go-live">Go Live</label>
                        <p className="modal-live">
                            <input 
                                type="checkbox"
                                name="golive"
                                required
                                onChange={(e) => setLiveStatus(e.target.checked)}
                            />
                        </p>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default ProblemsToReview