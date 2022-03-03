import UserCourses from "../student-components/UserCourses"
import StudentGradeEntryForm from "./StudentGradeEntryForm";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { semesterCourseActionCreators } from "../actions";
import { accountActionCreators } from "../actions";
import { useEffect, useState } from 'react'
const AssignGrades = ({onComplete, loggedInAccount}) => {
    const dispatch = useDispatch()
    const { fetchSemesterCourses } = bindActionCreators(semesterCourseActionCreators, dispatch)
    const { fetchAccounts, updateAccount  } = bindActionCreators(accountActionCreators, dispatch)

    const allCourses = useSelector(state => state.semesterCourses.items)
    const accounts = useSelector(state => state.accounts.items)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [selectedStudentAccounts, setSelectedStudentAccounts] = useState(null)
    const [storeGradeEntries, setStoreGradeEntries] = useState([]) //contain grade: grade and studentID


    useEffect(() => {
        fetchSemesterCourses()
        fetchAccounts()
    }, [])

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
                            updateAccount(student)
                        }
                    })
                }
            })
        })

        onComplete()
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
            
        </div>
    )
}

export default AssignGrades