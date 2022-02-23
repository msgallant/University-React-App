import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { semesterCourseActionCreators } from "../actions";
import { accountActionCreators } from "../actions";
import { useEffect, useState } from 'react'
import {getUserLoggedIn} from "../userStorage"
import { updateTranscriptOnCourseChanges } from "../student-components/StudentTranscriptLogic";
import { getCopyOfSemesterCourseForStudent } from "./semesterCourse";
import { onRegisterCourse, onUnRegisterCourse, findIsCheckedCourseStatusInitialState,
    updateCheckedCourse} from "../student-components/registeringSemesterCourseLogic"

//if canRegister is false and selectedCourses is undefined, that means display all courses since the admin
//is trying to view them all, if canRegister is true and selectedCourses is not undefined and
//canUnregister is undefined, that means 
//a student is trying to register for a course and the selectedCourses are the ones which
//match the criteria they inputted
//if canRegister is false and canUnregister is true and selectedCourses is not undefined than that means a student is looking at 
//all their courses they are registered in and can unregister for one
//if canRegister is false but selectedCourses is NOT undefined, then the student is just
//trying to view the courses they are registered for
//if canRegister === false && canUnregister !== true and selectedCourses != null than
//professor can click on a course to assign final grades to the students in that course
const SemesterCourses = ({canRegister, canAssignGrades, onComplete, onSelect, selectedCourses, loggedInAccount, reloadSearchBar,
    canUnregister})=> {
    const dispatch = useDispatch()
    const { fetchSemesterCourses, deleteSemesterCourse, updateSemesterCourse } = bindActionCreators(semesterCourseActionCreators, dispatch)
    const { fetchAccounts, updateAccount } = bindActionCreators(accountActionCreators, dispatch)
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
    //this method is only called when student is registering for classes
    const onSubmit = (e) => {
        if (canUnregister === true)
        {//need to also send allCourses, since courses is missing the students attribute and
            //need to delete student from reg
            onUnRegisterCourse(e, loggedInAccount, allCourses, isCheckedCourseStatus,
                updateAccount, setUpdateTranscript, updateSemesterCourse, onComplete)
        }
        else{ 
            onRegisterCourse(e, loggedInAccount, courses, isCheckedCourseStatus,
            updateAccount, setUpdateTranscript, updateSemesterCourse, onComplete)
        }
        
    }
//selecting a course is only done by professor who are selecting a course to input final grades
//for their students
    const selectCourse = (selectedCourseID) => {
        if (canAssignGrades === true)
        {console.log("on Select:" + selectedCourseID)
            onSelect(selectedCourseID)
        }
        
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
        setLoadedCourses(true)
    }

    const setIsCheckedCourseStatusInitialState = () => {
        findIsCheckedCourseStatusInitialState(courses, setIsCheckedCourses, setLoaded)
    }

    const checkCourse= (id)=> {
        updateCheckedCourse(id, isCheckedCourseStatus, setIsCheckedCourses)
    }

    const courseItemDetails = (course) => {
        return (
            <div className="same-line" 
                onClick={() => { selectCourse(course.id)}  }>
                
                    
                    <label >{course.name} ({course.subject}) </label>
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
                    {canUnregister !== true &&
                    <label>Students Registered: {course.filled}/{course.capacity}</label>}
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
            {/* students can register for courses*/ }
            {(canRegister === true || canUnregister === true) && loaded === true && loadedCourses === true 
            && courses[0].id !== "No Courses Found.." &&
                <div>   
                    <input type="checkbox" id="semesterCourse" name="semesterCourse"
                     onChange={() => checkCourse(course.id)}   /> 
                    <label  htmlFor="semesterCourse"> {courseItemDetails(course)} </label>  
                </div>  
            }  
            {/* admin looking at all courses or student/professor looking at their courses*/ } 
            {/* professor able to click on course, so they can assign grades for the students in that course*/ }  
            {canRegister === false && canUnregister !== true && courseItemDetails(course)}
            
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
                        <div>
                            <label>{courses[0].id} </label>
                        </div>
                        }
        
                    </div>
                    {(canRegister === true || canUnregister === true) &&
                    <div>
                        {courses[0].id !== "No Courses Found.." &&
                        <input type='submit' value={canRegister==true ? 'Register Selected Courses' : 'Unregister Selected Courses' }/>
                        }

                        {canRegister==true &&
                        <button onClick={reloadSearchBar}>Go Back</button>}
                    </div>
                    }
                </form>
            </div>
            
        )
    
}

export default SemesterCourses