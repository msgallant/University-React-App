import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { semesterCourseActionCreators } from "../actions";
import { accountActionCreators } from "../actions";
import { useEffect, useState } from 'react'
import {getUserLoggedIn} from "../userStorage"
import { updateTranscriptOnCourseChanges } from "../student-components/StudentTranscriptLogic";
import { getCopyOfSemesterCourseForStudent } from "./semesterCourse";
//if canRegister is false and selectedCourses is undefined, that means display all courses since the admin
//is trying to view them all, if canRegister is true and selectedCourses is not undefined, that means 
//a student is trying to register for a course and the selectedCourses are the ones which
//match the criteria they inputted
//if canRegister is false but selectedCourses is NOT undefined, then the student is just
//trying to view the courses they are registered for
const SemesterCourses = ({canRegister, onComplete, selectedCourses})=> {
    const dispatch = useDispatch()
    const { fetchSemesterCourses, deleteSemesterCourse, updateSemesterCourse } = bindActionCreators(semesterCourseActionCreators, dispatch)
    const { fetchAccounts, addRegisteredSemesterCourse } = bindActionCreators(accountActionCreators, dispatch)
    const accs = useSelector(state => state.accounts.items)
    let allCourses = useSelector(state => state.semesterCourses.items)
    //need this not to be null and empty since a const variable references these with the forEach method
    const [courses, setCourses] = useState([{null: null, id: "Courses not set up yet"}])

    //isCheckedCourseStatus contains: 
    //check: false/true,
    //courseID: course.id
    const [isCheckedCourseStatus, setIsCheckedCourses] = useState(null)
    const [loaded, setLoaded] = useState(false) //isCheckedCourseStatus loaded to initial value
    const [loadedCourses, setLoadedCourses] = useState(false) //is selectedCourses not undefined meaning
    //only certain courses should be displayed, so, change the value of courses to the selected courses
    //otherwise just set them to allCourses
    const [updateTranscript, setUpdateTranscript] = useState(null)

    useEffect(() => {
        fetchSemesterCourses()
        fetchAccounts()
    }, [])
    const onSubmit = (e) => {
        e.preventDefault()
        let userCourses = []
        let studentAcc = getUserLoggedIn(accs)

        courses.forEach((course => {
            //courses user wants to register for
            const wantedCourses = isCheckedCourseStatus.forEach((status) => {
                if (status.courseID === course.id && status.check === true)
                {
                    userCourses.push(course) //list of courses student registered in
                    course.students.push(studentAcc) //list of students in course including user now
                    updateSemesterCourse(course)
                }
            })
        }))
console.log("this is where we need to find the loged in user")

        userCourses.forEach(userCourse => {
            studentAcc.coursesRegisteredIn.push(getCopyOfSemesterCourseForStudent(userCourse))
            })

        const updatedStudAcc = updateTranscriptOnCourseChanges(studentAcc) //add new registered courses to transcript with no grade
        addRegisteredSemesterCourse(updatedStudAcc) //also adds a transcript entry with a grade value of null
        setUpdateTranscript(studentAcc)
        
        onComplete()
    }



    const setSelectedCourses = () => {
        if (selectedCourses !== undefined ) //student searching for courses
        {
            if (selectedCourses.length !== 0)
            {
                setCourses(selectedCourses)
            }
            else{
                setCourses([{id: "No Courses Found.."}])
            }
            
        }
        else{ //admin looking at all semester courses
                setCourses(allCourses)
        }
        checkIfSelectedCoursesSet()
    }

    const checkIfSelectedCoursesSet = () => {
        if (courses.length !== 0 && !courses[0].null)
        {
            setLoadedCourses(true)
        }
        else //no courses that matched criteria bc length = 0
        {
            setLoadedCourses(true)
        }
    }

    const setIsCheckedCourseStatusInitialState = () => {
        const checkedCourseInitialState = courses.map(course => {
            return {
                check: false,
                courseID: course.id
            }
        })
        setIsCheckedCourses(checkedCourseInitialState)

        setLoaded(true)
    }

    const checkCourse= (id)=> {
        const updatedCheckState = isCheckedCourseStatus.map(courseCheckStatus => {
            if (id === courseCheckStatus.courseID)
            {
                return {courseID: id, 
                    check: !courseCheckStatus.check}
            }
            return courseCheckStatus
        })
        setIsCheckedCourses(updatedCheckState)
    }

    const courseItemDetails = (course) => {
        return (
            <div className="same-line">
                
                    
                    <label>{course.name} ({course.subject}) </label>
                    {/** trash can only pops up if admin viewing courses since only admin can delete courses
                     * if you put selectedCourses == null
                     */}
                    { selectedCourses == null &&
                    <label onClick={() => deleteSemesterCourse(course.id)}>
                            <i className="fas fa-trash-alt delete-icon-color"></i>
                        </label> }
                
                <div>
                    <label> {course.professor}</label>
                </div>
                <div>
                    <label> {course.schedule}</label>
                </div>
                
                <div>
                    <label> {course.location}</label>
                </div>
                <div>
                    <label>Students Registered: {course.filled}/{course.capacity}</label>
                </div>
                <div>
                    <label>Description: {course.courseDesc} </label>
                </div>
                
            </div>
        )
    }

    const courseItems = courses.map(course => (
        <div key={course.id} className="select-div-color">
            {/*/set courses */}
            {loadedCourses === false && allCourses != null && allCourses.length !== 0 && setSelectedCourses()}
            {/*/create an object for each course that holds whether or not the user has checked/selected that course */}
            { isCheckedCourseStatus == null && loadedCourses === true && setIsCheckedCourseStatusInitialState()}
            {canRegister === true && loaded === true && loadedCourses === true && courses[0].id !== "No Courses Found.." &&
                <div>   
                    <input type="checkbox" id="semesterCourse" name="semesterCourse"
                     onChange={() => checkCourse(course.id)}   /> 
                    <label  htmlFor="semesterCourse"> {courseItemDetails(course)} </label>  
                </div>  
            }     
            {canRegister === false && courseItemDetails(course)}
            
        </div>
        ))
    
        return (
        
            <div>
                
                <form onSubmit={onSubmit}>
                    <div>
                        <label> Current Courses: </label>
                    </div>
                    <div>
                        <label>{courseItems}</label>
                        {courses[0].id === "No Courses Found.." &&
                        <label>{courses[0].id} </label>}
        
                    </div>
                    {canRegister === true && 
                    <input type='submit' value='Register Selected Courses' />}
                </form>
            </div>
            
        )
    
}

export default SemesterCourses