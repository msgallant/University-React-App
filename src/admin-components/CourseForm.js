import { useState } from "react";
import { allCourses, allLocations } from "./universityData";

const CourseForm = ({}) => {
    const [courseName, setCourseName] = useState('')
    const [courseDesc, setCourseDesc] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [days, setDays] = useState('')
    const [subject, setSubject] = useState('')
    const [capacity, setCapacity] = useState('')
    const [filled, setFilled] = useState('')
    const [professor, setProfessor] = useState('')
    const [location, setLocation] = useState('')

    const availableCourses = allCourses.map((course, index) => (
        <div key={index}>
            <option value={course.name}/>
        </div>
    ))

    const availableLocations = allLocations.map((location, index) => (
        <div key={index}>
            <option value={location.name + " " + location.roomNum + " (Capacity: " + location.capacity + ")"}/>
        </div>
    ))

    return (
        <form>
            <label htmlFor="myCourse">Courses: </label>
            <input list="courseNames" id="myCourse" name="myCourse"/>
            <datalist id="courseNames">
                {availableCourses}
            </datalist>

            <label htmlFor="myLocation">Room: </label>
            <input list="rooms" id="myLocation" name="myLocation"/>
            <datalist id="rooms">
                {availableLocations}
            </datalist>
        </form>
    )
}

export default CourseForm