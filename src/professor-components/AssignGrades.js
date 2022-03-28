import UserCourses from "../student-components/UserCourses"
import StudentGradeEntryForm from "./StudentGradeEntryForm";
import { useSelector } from "react-redux";
import { useState } from 'react'
import { FetchAccounts, UpdateAccount } from "../actions/accountActions";
import SubmitAction from "../action-submitter/SubmitAction";
import { FetchSemesterCourses } from "../actions/semesterCourseActions";
const AssignGrades = ({onComplete, loggedInAccount}) => {

    const allCourses = useSelector(state => state.semesterCourses.items)
    const accounts = useSelector(state => state.accounts.items)
    const [selectedCourse, setSelectedCourse] = useState(null) //course that prof wants to entry grades for
    const [selectedStudentAccounts, setSelectedStudentAccounts] = useState(null) //students enrolled in course that prof is assigning grades for
    const [storeGradeEntries, setStoreGradeEntries] = useState([]) //contain grade: grade and studentID
    const [update, setUpdate] = useState(null)

    FetchAccounts()
    FetchSemesterCourses()


    const onSubmit = () => {
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
                            setUpdate({updatedAccount: student})
                        }
                    })
                }
            })
        })
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
        console.log("storing grade inputted, list is: ")
        console.log(allGradeEntries)
        setStoreGradeEntries(allGradeEntries)

    }

    const makeEntryForms = (selectedCourseStudentAccounts) => {
        return selectedCourseStudentAccounts.map((student, index)=> (
            <div key={index} className="select-div-color">
                <StudentGradeEntryForm studentAccount={student}
                courseID={selectedCourse.id}
                onGradeEntryReceived={storeGradeEntryReceived}></StudentGradeEntryForm>              
            </div>
        ))
    }


    return (
        <div>
            {selectedCourse == null &&
            <div>
                <label >Select the course you want to assign final grades for: </label>
                <UserCourses 
                canAssignGrades={true}
                onSelect={findSelectedCourse}
                loggedInAccount={loggedInAccount} ></UserCourses>
            </div>
            }

            {selectedCourse != null && selectedCourse.students.length !== 0 && selectedStudentAccounts !== null 
                &&selectedStudentAccounts.length !== 0 &&
                <div>

                    <label >{selectedCourse.name}</label>
                    {makeEntryForms(selectedStudentAccounts)}

                    <form onSubmit={onSubmit}>
                        <input type='submit' value='Assign Final Grades' />
                    </form>
                </div>
            }
            {update !== null &&  
                <div>
                    <SubmitAction onComplete={onComplete} 
                        ActionMethod={UpdateAccount} data={update.updatedAccount}></SubmitAction>
                </div>}
        </div>
    )
}

export default AssignGrades