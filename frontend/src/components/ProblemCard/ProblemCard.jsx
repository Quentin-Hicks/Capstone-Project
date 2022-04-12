import "./ProblemCard.css"
import { Routes, Route } from "react-router-dom";
import ProblemPage from "../../pages/ProblemPage/ProblemPage";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const ProblemCard = ({problems}) => {

    const [problemData, setProblemData] = useState()

    useEffect(() => {
        // console.log(problemData)
    }, [problemData])

    // Use useParams to grab the id of the problem data relative
    // to the card being clicked. Then pass that data to the
    // problem page somehow.
    // Get that page to match that data to the backend and bring the
    // data back. Essentially, you may not need to pass the problem
    // data, just match it to grab it.

    // function handleView(event){
    //     event.preventDefault()
    //     setProblemData()
    // }

    function problemCardData(){
        // debugger
        return (
            <div className="wrapper">
                {/* <h1>Collection Page</h1> */}
                {problems.map((problem) => {
                    return (
                        <Link to={`/problem/${problem.id}`} key={problem.id} 
                            style={{ textDecoration: "none", color: "black" }}
                            >
                            <div className="card">
                                <div className="card_body">
                                    {/* Reminder: remove img src element */}
                                    <img src="images/math-equation.jpg" className='card_image'/>
                                    <h2 className="card_title">{problem.title}</h2>
                                    <p className="card_details">{problem.content}</p>
                                </div>
                                <button className="card_btn" onClick={() => setProblemData(problem)}>View</button>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            {problemCardData()}
            {/* <Routes>
                <Route path="/problem" element={<ProblemPage problemData={problemData}/>}/>
            </Routes> */}
            {/* <ProblemDislpay /> */}
        </>
        // <div className="wrapper">
        //     {problems.map((problem) => {
        //         return (
        //             <Link to={`/problem/${problems.id}`} key={problem.id} style={{ textDecoration: "none", color: "black" }}>
        //                 <div className="card">
        //                     <div className="card_body">
        //                         {/* Reminder: remove img src element */}
        //                         <img src="images/math-equation.jpg" className='card_image'/>
        //                         <h2 className="card_title">{problem.title}</h2>
        //                         <p className="card_details">{problem.content}</p>
        //                     </div>
        //                     <button className="card_btn" onClick={handleView}>View</button>
        //                 </div>
        //             </Link>
        //         )
        //     })}
        // </div>
    )
}

export default ProblemCard