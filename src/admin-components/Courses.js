import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { courseActionCreators } from "../actions";
import { useEffect } from 'react'

const Courses = ()=> {
    const dispatch = useDispatch()
    const { fetchCourses, deleteCourse } = bindActionCreators(courseActionCreators, dispatch)

    useEffect(() => {
        fetchCourses()
    }, [])

    const courses = useSelector(state => state.courses.items)

    const courseItems = courses.map(course => (
        <div key={course.id} className="select-div-color">
            <div>
                <label>
                    name: {course.name}  &nbsp;
                </label>
                
                <label onClick={() => deleteCourse(course.id)}>
                    <i className="fas fa-trash-alt delete-icon-color"></i>
                </label>
            </div>
            <div>
                <label>Subject: {course.subject} </label>
            </div>
            <div>
                <label>Description: {course.description} </label>
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

export default Courses