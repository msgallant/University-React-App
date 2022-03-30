import UserCourses from "../student-components/UserCourses"
import AssignGradesTemplate, {EmptyAssignGradesTemplate} from "../page-templates/AssignGradesTemplate";
import { useSelector } from "react-redux";
import { useState } from 'react'
import { FetchAccounts } from "../actions/accountActions";
import SubmitAction from "../action-submitter/SubmitAction";
import { FetchSemesterCourses } from "../actions/semesterCourseActions";
import { ButtonTemplate, GoBackButtonTemplate } from "../page-templates/ButtonTemplate";

const AssignGrades = ({onComplete, loggedInAccount, canUnregister}) => {

    const allCourses = useSelector(state => state.semesterCourses.items)
    const accounts = useSelector(state => state.accounts.items)
    const [selectedCourse, setSelectedCourse] = useState(null) //course that prof wants to entry grades for
    const [selectedStudentAccounts, setSelectedStudentAccounts] = useState(null) //students enrolled in course that prof is assigning grades for
    const [storeGradeEntries, setStoreGradeEntries] = useState([]) //contain grade: grade and studentID
    const [update, setUpdate] = useState(null)

    FetchAccounts()
    FetchSemesterCourses()


    const onSubmit = (e) => {
        e.preventDefault()
        let updatedAccounts = []
        //going through all students registered in course
        selectedStudentAccounts.forEach(student => { 
            //looking for a student transcript entry that matches this course
            student.transcript.forEach(entry => {
                if (selectedCourse.id === entry.id)
                {
                    //looking for the stored final grade for this student in this course
                    storeGradeEntries.forEach(finalGrade => {
                        if (student.id === finalGrade.studentID)
                        {
                            entry.grade = finalGrade.grade
                            updatedAccounts.push(student)
                            
                        }
                    })
                }
            })
        })
        setUpdate({updAccs: updatedAccounts})
    }
//finds course that professor wants to input grades for
    const findSelectedCourse = (id) => {
        allCourses.forEach(course => {
            if (course.id === id)
            {
                setSelectedCourse(course)
                findCourseStudentAccounts(course)
            }
        })
    }
//finds the accounts of the course that was selected. courses only hold
//fake noncomplete copies of student accounts and student accounts only
//hold fake / noncomplete copies of courses
    const findCourseStudentAccounts = (selectCourse) => {
        const copyAccs = selectCourse.students
        let realAccs = []

        accounts.forEach(acc => {
            copyAccs.forEach(copyAcc => {
                if (acc.id === copyAcc.id)
                {
                    realAccs.push(acc)
                }
            })
            
        })
        setSelectedStudentAccounts(realAccs)
    }
//storing all the grades the professor inputted
    const storeGradeEntryReceived = (grade, studentAccountID) => {
        let allGradeEntries = storeGradeEntries
        const newGradeEntry = {
            grade: grade,
            studentID: studentAccountID
        }
        allGradeEntries.push(newGradeEntry)
        setStoreGradeEntries(allGradeEntries)

    }

    return (
        <div>
            {selectedCourse == null &&
            <div>
                <div className="plain-border hidden">
                    <label className="unhidden form-font-size">Select the course you want to assign final grades for: 
                        </label>
                </div>
                <UserCourses 
                canAssignGrades={true}
                onSelect={findSelectedCourse}
                loggedInAccount={loggedInAccount}
                canUnregister={canUnregister} ></UserCourses>
            </div>
            }

            {selectedCourse != null && selectedStudentAccounts !== null 
                &&
                <div>
                    {selectedStudentAccounts.length !== 0 &&
                        <div>
                            <form onSubmit={onSubmit}>
                                <AssignGradesTemplate title={selectedCourse.name} 
                                leftFieldTitle="Name" rightFieldTitle="Grade"
                                studentGradeEntries={selectedStudentAccounts}
                                selectedCourseID={selectedCourse.id} 
                                storeGradeEntryReceived={storeGradeEntryReceived}></AssignGradesTemplate>

                                <br></br><br></br><br></br>

                                <ButtonTemplate theText={'Assign Final Grades'}></ButtonTemplate>

                            </form>
                        </div>}
                    {selectedStudentAccounts.length === 0 &&
                        <div>
                            <EmptyAssignGradesTemplate title={selectedCourse.name} ></EmptyAssignGradesTemplate>
                            <br></br> <br></br> <br></br>
                            </div>}
                    <br></br>

                    <GoBackButtonTemplate onClickEventFunc={() => {
                            setSelectedCourse(null)
                            setSelectedStudentAccounts(null)
                        }} 
                            theText={"Go Back"}
                            ></GoBackButtonTemplate>
                    
                </div>
            }
            {update !== null &&  
                <div>
                    <SubmitAction onComplete={() => {setUpdate(null); onComplete()}} 
                        multipleData={true} data={update}></SubmitAction>
                </div>}
        </div>
    )
}

export default AssignGrades