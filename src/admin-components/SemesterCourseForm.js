import { useState } from "react";
import { courseActionCreators, timeSlotActionCreators, buildingActionCreators, accountActionCreators } from "../actions"

const SemesterCourseForm = ({}) => {
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

    const dispatch = useDispatch()

    const { fetchCourses } = bindActionCreators(courseActionCreators, dispatch)
    const { fetchTimeSlots } = bindActionCreators(timeSlotActionCreators, dispatch)
    const { fetchBuildings } = bindActionCreators(buildingActionCreators, dispatch)
    const { fetchAccounts } = bindActionCreators(accountActionCreators, dispatch)

    useEffect(() => {
        fetchCourses()
        fetchTimeSlots()
        fetchBuildings()
    }, [])



    return (
        <form>
            <label htmlFor="myCourse">Courses: </label>
            <input list="courseNames" id="myCourse" name="myCourse"/>
            <datalist id="courseNames">
                
            </datalist>

            <label htmlFor="myLocation">Room: </label>
            <input list="rooms" id="myLocation" name="myLocation"/>
            <datalist id="rooms">
                
            </datalist>
        </form>
    )
}

export default SemesterCourseForm