import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { courseActionCreators, timeSlotActionCreators, buildingActionCreators, 
    accountActionCreators, semesterCourseActionCreators, uniqueSemesterCourseIDActionCreators } from "../actions"
import { dataListValidOptionObjectNameChecker } from "./dataListValidOptionChecker";
import { semesterCourse } from "./semesterCourse";
import SemesterCourses from "./SemesterCourses"
import { getCopyOfSemesterCourseForAUserAccount } from "./semesterCourse";
import { assignCourseToProfessor } from "../professor-components/assignCourseToProfessor";
import { InputDropDownListTemplate } from "../page-templates/InputTemplate";
import CreationForm from "../page-templates/CreationForm";

const SemesterCourseForm = ({profAccType, onComplete}) => {
    const [courseName, setCourseName] = useState('')
    const [courseDesc, setCourseDesc] = useState('')
    const [schedule, setSchedule] = useState('')
    const [subject, setSubject] = useState('')
    const [capacity, setCapacity] = useState('')
    const [filled, setFilled] = useState(0)
    const [professor, setProfessor] = useState('')
    const [location, setLocation] = useState('')
    const newCourse = 'New Course'
    

    const dispatch = useDispatch()

    const { createSemesterCourse } = bindActionCreators(semesterCourseActionCreators, dispatch)
    const { fetchCourses } = bindActionCreators(courseActionCreators, dispatch)
    const { fetchTimeSlots } = bindActionCreators(timeSlotActionCreators, dispatch)
    const { fetchBuildings } = bindActionCreators(buildingActionCreators, dispatch)
    const { fetchAccounts, updateAccount  } = bindActionCreators(accountActionCreators, dispatch)
    const { fetchUniqueSemesterCourseID, updateUniqueSemesterCourseID } = bindActionCreators(uniqueSemesterCourseIDActionCreators, dispatch)

    const courses = useSelector(state => state.courses.items)
    const timeSlots = useSelector(state => state.timeSlots.items)
    const accounts = useSelector(state => state.accounts.items)
    const nextUniqueSemesterID = useSelector(state => state.uniqueSemesterCourseID.items)
    const profAccounts = accounts.filter(account => 
        (account.accountType === profAccType))

    const profNames = profAccounts.map(acc => {
        const profName = "Dr. " + acc.firstName + " " + acc.middleName + " " + acc.lastName + " (" + acc.email + ")"
        const prof = {
            name: profName
        }
        return prof
        
    })
    const buildings = useSelector(state => state.buildings.items)
    
    const getBldgRoomNames =  () => {
        let theRoomNames = []
        buildings.forEach((opt) => {
            const bldgName = opt.name
            const rooms = opt.rooms

            rooms.forEach((room) => 
                { 
                    const name = bldgName + " room " + room.roomNum
                    const newBldgRoomName = { name: name}
                    theRoomNames.push(newBldgRoomName)              

                })

        })
        return theRoomNames
    }



    useEffect(() => {
        fetchCourses()
        fetchAccounts()
        fetchTimeSlots()
        fetchBuildings()
        fetchUniqueSemesterCourseID()
    }, [])
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (!dataListValidOptionObjectNameChecker(timeSlots, schedule)){
            alert('Time slot does not exist')
            return
        }

        if (!dataListValidOptionObjectNameChecker(courses, courseName)){
            alert('Course does not exist')
            return
        }

        if (!dataListValidOptionObjectNameChecker(profNames, professor)){
            alert('Professor does not exist')
            return
        }

        if (!dataListValidOptionObjectNameChecker(getBldgRoomNames(), location)){
            alert('Location does not exist')
            return
        }
        const scID = nextUniqueSemesterID[0].nextUniqueSemesterCourseID

        semesterCourse.name = courseName
        semesterCourse.courseDesc = courseDesc
        semesterCourse.subject = subject
        semesterCourse.schedule = schedule
        semesterCourse.professor = professor
        semesterCourse.location = location
        semesterCourse.filled = filled
        semesterCourse.capacity = capacity
        semesterCourse.id = scID

        updateNextSemesterCourseID(scID + 1) 

        createSemesterCourse(semesterCourse)
        assignCourseToProfessor(getCopyOfSemesterCourseForAUserAccount(semesterCourse), professor, profAccounts, updateAccount )

        onComplete()
    }

//all semester course id's must be unique, so, when current one used, add 1 and update it to hold next unqiue id
//this must be done because need to store a copy of the semester to the professor and the id must be determined
//before can store in professor's account
    const updateNextSemesterCourseID = (nextID) => {
        nextUniqueSemesterID[0].nextUniqueSemesterCourseID = nextID
        updateUniqueSemesterCourseID(nextUniqueSemesterID[0])
    }

//instead of setting course desc directly use this method instead, so, we can find & keep track of what subject
//the course is
    const setCourseDetails = (name) => {
            setCourseName(name) 
           
            courses.forEach(element => {
                if (element.name === name)
                {
                    setCourseDesc(element.description)
                    setSubject(element.subject)
                }
            })
    }

    //name = "the building name" (.name) + " room " + "the room number" (.room[index].roomNum)
    const setLocationDetails = (name) => {
        setLocation(name) 
       
        buildings.forEach(bldg => {
            const rooms = bldg.rooms
            if (rooms != null)
            {
                rooms.forEach(room => {
                    if (name === getBldgRoomName(bldg, room))
                    {
                        setCapacity(room.capacity)
                    }
                })
            }
        })
}


    const getBldgRoomName = (bldg, room) => {
        return bldg.name + " room " + room.roomNum
    }


    const makeOptions= (opts) => {
        return opts.map((opt, index)=> (
            <div key={index} className="select-div-color">
                <option value={opt.name} />                 
            </div>
        ))
    }

    const semesterCourseFormFields = (
        <div>
            <div>
                <InputDropDownListTemplate thePlaceholder={'Course: '} theValue={courseName} 
                    allOptions={makeOptions(courses)} setTheValue={setCourseDetails}>
                    </InputDropDownListTemplate>

            </div> <br></br>
            
            <div>
                <InputDropDownListTemplate thePlaceholder={'Schedule: '} theValue={schedule} 
                    allOptions={makeOptions(timeSlots)} setTheValue={setSchedule}>
                    </InputDropDownListTemplate>
            </div> <br></br>
            <div >
                <InputDropDownListTemplate thePlaceholder={'Location: '} theValue={location} 
                    allOptions={makeOptions(getBldgRoomNames())} setTheValue={setLocationDetails}>
                    </InputDropDownListTemplate>
            </div> <br></br>

            <div >
                <InputDropDownListTemplate thePlaceholder={'Professor: '} theValue={professor} 
                    allOptions={makeOptions(profNames)} setTheValue={setProfessor}>
                    </InputDropDownListTemplate>
            </div> <br></br>
            
        </div>
    )

    const courseInfo = (
        <div>
                <div>
                    {dataListValidOptionObjectNameChecker(courses, courseName) &&
                    <div className="form-font-size">
                        <label>{courseName !== '' ? courseName : ''} 
                        {subject !== '' ? " (" + subject + ")" : ''} 
                        </label>
                    </div>}
                    
                </div>
                <div>
                    {dataListValidOptionObjectNameChecker(profNames, professor) &&
                    <label> {professor}</label>}
                </div>
                <div>
                    {dataListValidOptionObjectNameChecker(timeSlots, schedule) &&
                    <label> {schedule}</label>}
                </div>
                {dataListValidOptionObjectNameChecker(getBldgRoomNames(), location) &&
                <div>
                    <div>
                        <label> {location}</label>
                    </div>
                    <div>
                        <label>Students Registered: {filled}/{capacity}</label>
                    </div>
                </div>}
                
                <div>
                    {dataListValidOptionObjectNameChecker(courses, courseName) &&
                    <label>Description: {courseDesc} </label>}
                </div>
        </div>
    )

    const courseFormFields = (
        <div>
            <div className="semester-course-input-spacing">
                {semesterCourseFormFields}
            </div>
            {(courseName !== '' || professor !== '' || schedule !== '' || location !== '')&&
            <div>
                <label className="form-font-size">New Course </label> <br></br>
                <div className="plain-border plain-border-inside-correction">
                    {courseInfo}
                </div>
            </div>}
            
            
        </div>
    )

    return (

        <div>
            <CreationForm title={'Create a Course for the Current Semester'} 
                fields={courseFormFields} submitButtonText={'Create Semester Course'} 
                onSubmit={onSubmit}></CreationForm>

        </div>
       
    )
}

export default SemesterCourseForm