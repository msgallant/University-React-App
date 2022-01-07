import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { semesterCourseActionCreators } from "../actions";
import { accountActionCreators } from "../actions";
import { useEffect, useState } from 'react'

const SemesterCourses = ({canRegister, onComplete})=> {
    const dispatch = useDispatch()
    const { fetchSemesterCourses, deleteSemesterCourse } = bindActionCreators(semesterCourseActionCreators, dispatch)
    const { fetchAccounts, addRegisteredSemesterCourse } = bindActionCreators(accountActionCreators, dispatch)
    const accs = useSelector(state => state.accounts.items)
    const courses = useSelector(state => state.semesterCourses.items)

    //isCheckedCourseStatus contains: 
    //check: false/true,
    //courseID: course.id
    const [isCheckedCourseStatus, setIsCheckedCourses] = useState(null)
    const [loaded, setLoaded] = useState(false)


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
                
                    
                    <label>{course.courseName} ({course.subject}) </label>
                
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
            { isCheckedCourseStatus == null && courses != null && setIsCheckedCourseStatusInitialState()}
            {canRegister === true && loaded === true &&
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
        
            <form onSubmit={onSubmit}>
                <div>
                    <label> Current Courses: </label>
                </div>
                <div>
                    <label>{courseItems}</label>
    
                </div>
                {canRegister === true && 
                <input type='submit' value='Register Selected Courses' />}
            </form>
        )
    
}

export default SemesterCourses