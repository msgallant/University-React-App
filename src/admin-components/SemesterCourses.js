import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { semesterCourseActionCreators } from "../actions";
import { useEffect } from 'react'

const SemesterCourses = ()=> {
    const dispatch = useDispatch()
    const { fetchSemesterCourses, deleteSemesterCourse } = bindActionCreators(semesterCourseActionCreators, dispatch)

    useEffect(() => {
        fetchSemesterCourses()
    }, [])

    const courses = useSelector(state => state.semesterCourses.items)

    const courseItems = courses.map(course => (
        <div key={course.id} className="select-div-color">
            <div>
            <div>
                <label>{course.courseName} ({course.subject}) </label>
            
                <label onClick={() => deleteSemesterCourse(course.id)}>
                        <i className="fas fa-trash-alt delete-icon-color"></i>
                    </label>
            </div>
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
            
        </div>
        ))

        return (
        
            <div>
                <div>
                    <label> Current Courses: </label>
                </div>
                <div>
                    <label>{courseItems}</label>
    
                </div>
            </div>
        )
    
}

export default SemesterCourses