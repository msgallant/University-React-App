import { useState, useEffect } from "react"
import { courseActionCreators, subjectActionCreators } from "../actions"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { newCourse } from "./newCourse";
import  Courses  from "./Courses"

const CourseForm = ({ onComplete }) => {
    const [courseName, setCourseName] = useState('')
    const [courseDesc, setCourseDesc] = useState('')
    const [subject, setSubject] = useState('')

    const dispatch = useDispatch()
    const { createCourse } = bindActionCreators(courseActionCreators, dispatch)
    const { fetchSubjects } = bindActionCreators(subjectActionCreators, dispatch)

    const subjects = useSelector(state => state.subjects.items)

    useEffect(() => {
        fetchSubjects()
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!courseName){
            alert('Course name is missing')
            return
        }
        if (!courseDesc){
            alert('Course description is missing')
            return
        }
        if (!subject){
            alert('Subject name is missing')
            return
        }

        newCourse.name = courseName
        newCourse.description = courseDesc
        newCourse.subject = subject

        createCourse(newCourse)
        onComplete()
    }

     const availableSubjects = subjects.map((subj) => (
        <div key={subj.id}>
            <option value={subj.name}/>
        </div>
    ))

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Course Name: </label>
                    <input
                    type='text'
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    />

                <label>Course Description: </label>
                    <input
                    type='textarea'
                    value={courseDesc}
                    onChange={(e) => setCourseDesc(e.target.value)}
                    />

                <label htmlFor="courseSubjects">Courses: </label>
                <input list="subjectNames" id="courseSubjects" name="courseSubjects"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}/>
                <datalist id="subjectNames" >
                    {availableSubjects}
                </datalist>

                <div>
                    <input type='submit' value='Create New Course' />
                </div>
            </form>
            <div>
                <Courses></Courses>
            </div>

        </div>
    )
}

export default CourseForm