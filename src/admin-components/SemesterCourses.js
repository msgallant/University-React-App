import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { semesterCourseActionCreators } from "../actions";
import { accountActionCreators } from "../actions";
import { useEffect, useState } from 'react'

const SemesterCourses = ({canRegister, onComplete, selectedCourses})=> {
    const dispatch = useDispatch()
    const { fetchSemesterCourses, deleteSemesterCourse } = bindActionCreators(semesterCourseActionCreators, dispatch)
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


    useEffect(() => {
        fetchSemesterCourses()
        fetchAccounts()
    }, [])
    const onSubmit = (e) => {
        e.preventDefault()
        let userCourses = []
        courses.forEach((course => {
            const wantedCourses = isCheckedCourseStatus.forEach((status) => {
                if (status.courseID === course.id && status.check === true)
                {
                    userCourses.push(course)
                }
            })
        }))

        let studentAcc = null
        accs.forEach(acc => {
            if (acc.accountType === "Student Account")
            {
                userCourses.forEach(userCourse => {
                    acc.coursesRegisteredIn.push(userCourse)
                })
                
                studentAcc = acc
            }
        })

        addRegisteredSemesterCourse(studentAcc)
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
                
                    <label onClick={() => deleteSemesterCourse(course.id)}>
                            <i className="fas fa-trash-alt delete-icon-color"></i>
                        </label> 
                
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