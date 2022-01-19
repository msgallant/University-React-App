import UserCourses from "../student-components/UserCourses"
import StudentGradeEntryForm from "./StudentGradeEntryForm";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { semesterCourseActionCreators } from "../actions";
import { accountActionCreators } from "../actions";
import { useEffect, useState } from 'react'
const AssignGrades = ({onComplete}) => {
    const dispatch = useDispatch()
    const { fetchSemesterCourses } = bindActionCreators(semesterCourseActionCreators, dispatch)
    const allCourses = useSelector(state => state.semesterCourses.items)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [storeGradeEntries, setStoreGradeEntries] = useState([]) //contain grade: grade and studentID

    const { updateAccount } = bindActionCreators(accountActionCreators, dispatch)

    useEffect(() => {
        fetchSemesterCourses()
    }, [])

    const onSubmit = () => {
        console.log("form closed! submiting!")
        //going through all students registered in course
        selectedCourse.students.forEach(student => { 
            //looking for a student transcript entry that matches this course
            student.transcript.forEach(entry => {
                if (selectedCourse.id === entry.id)
                {
                    //looking for the stored final grade for this student in this course
                    storeGradeEntries.forEach(finalGrade => {
                        if (student.id === finalGrade.studentID)
                        {
                            entry.grade = finalGrade.grade
                            console.log("the updated studdent acc looks like: ")
                            console.log(student)
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
                console.log("its a match@@")
                console.log(course)
                setSelectedCourse(course)
            }
        })
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
                onSelect={findSelectedCourse}></UserCourses>
            </div>
            }

            {selectedCourse != null && selectedCourse.students.length !== 0 &&
            <div>
                {console.log("the students are:")}
                {console.log(selectedCourse.students)}
                <label >{selectedCourse.name}</label>
                {makeEntryForms(selectedCourse.students)}

                <form onSubmit={onSubmit}>
                    <input type='submit' value='Assign Final Grades' />
                </form>
            </div>
            
            }
            
        </div>
    )
}

export default AssignGrades