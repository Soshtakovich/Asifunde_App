import React, { useState } from 'react';
import '../../../CSS/Main-small-components-css/Subjectassessments.css';
import AddAssessmentPopup from "../../../SubjectTeacher/Addassessment";
import { subjectassessmentsData } from "./assessmentspagedata";

function Assessmentspage({ assessments }) {
    
    const calculateDaysRemaining = (dueDate) => {
        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const differenceInTime = dueDateObj - currentDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays >= 0 ? differenceInDays : 'Overdue';
    };

    return (
        <div className="assessment-container">
            <div className="assessments-table">
                <div className="header">
                    <h3>Assessments</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>File</th>
                            
                            <th>Total Mark</th>
                            <th>Due Date</th>
                            <th>Days Remaining</th>
                      
                            <th>Submissions</th>
                            <th>Not Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map((assessment, index) => {
                            const daysRemaining = calculateDaysRemaining(assessment.dueDate);
                            const isOverdue = daysRemaining === 'Overdue';

                            return (
                                <tr key={index}>
                                    <td>{assessment.name}</td>
                                    <td>{assessment.description}</td>
                                    <td><a href={assessment.fileLink} className="download-link">Download</a></td>
                                    <td>{assessment.totalMark}</td>
                                    <td>{assessment.dueDate}</td>
                                    <td><span className={`days-remaining ${isOverdue ? 'overdue' : ''}`}>{daysRemaining}</span></td>
                                    <td>{assessment.submissions}</td>
                                    <td>{assessment.not_submit}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Displaysubjectassessmentpage() {
    const [showAssessmentPopup, setShowAssessmentPopup] = useState(false);
  
    // Function to handle adding the assessment
    const addAssessment = async (assessmentData) => {
      // You can handle saving the assessment to your database here.
      console.log("New assessment added:", assessmentData);
      // After saving.
    };
  
    return (
      <>
        <button className="add-topic-btn" onClick={() => setShowAssessmentPopup(true)}>
          + Add Assessment
        </button>
  
        {/* Show the AddAssessmentPopup when the button is clicked */}
        {showAssessmentPopup && (
          <AddAssessmentPopup
            setShowAssessmentPopup={setShowAssessmentPopup}
            addAssessment={addAssessment}
          />
        )}
  
        <Assessmentspage assessments={subjectassessmentsData} />
      </>
    );
  }
  
  export default Displaysubjectassessmentpage;