import { useSelector } from "react-redux";
import {  useState } from 'react'
import BorderedList from "../page-templates/BorderedList";
import { onRegisterCourse, onUnRegisterCourse, findIsCheckedCourseStatusInitialState,
    updateCheckedCourse} from "../student-components/registeringSemesterCourseLogic"
import { FetchAccounts } from "../actions/accountActions";
import SubmitAction from "../action-submitter/SubmitAction";
import { ButtonTemplate } from "../page-templates/ButtonTemplate";
import { FetchSemesterCourses, DeleteSemesterCourse } from "../actions/semesterCourseActions";
import { GoBackButtonTemplate } from "../page-templates/ButtonTemplate";


//if canRegister is false and selectedCourses is undefined, that means display all courses since the admin
//is trying to view them all, if canRegister is true and selectedCourses is not undefined and
//canUnregister is undefined, that means 
//a student is trying to register for a course and the selectedCourses are the ones which
//match the criteria they inputted
//if canRegister is false and canUnregister is true and selectedCourses is not undefined than that means a student is looking at 
//all their courses they are registered in and can unregister for one
//canUnregister={"not true"}
//if (canUnregister !== true && canUnregister !== "not true") than amount of students and capacity of courses shown
//if not then it doesn't show, since the numbers will be wrong when someone joins or leaves a class
//if we store them in prof or student accound, so,  when looking at course copies in student or prof acc
//must make sure conditions for amount of students and capacity are NOT MET.
//if canRegister === false && canUnregister={"not true"} and selectedCourses != null than
//professor can view their courses
//if canRegister === false && canUnregister !== true and selectedCourses != null than
//professor can click on a course to assign final grades to the students in that course
const SemesterCourses = ({canRegister, canAssignGrades, onComplete, onSelect, selectedCourses, loggedInAccount, reloadSearchBar,
    canUnregister})=> {
    const [deleteObjID, setDeleteObjID] = useState(null)

    //const accs = useSelector(state => state.accounts.items)
    let allCourses = useSelector(state => state.semesterCourses.items)
    //need this not to be null and empty since a const variable references these with the forEach method
    const [courses, setCourses] = useState([{null: null, id: "Courses not set up yet"}])
    const [updates, setUpdates] = useState({updAcc: null, 
        updSemCourses: null})
    const updatesReady = "Updates Ready"
    const [lookForUpdates, setLookForUpdates] = useState("false")  

    //isCheckedCourseStatus contains: 
    //check: false/true,
    //courseID: course.id
    const [isCheckedCourseStatus, setIsCheckedCourses] = useState(null)
    const [loaded, setLoaded] = useState(false) //isCheckedCourseStatus loaded to initial value
    const [loadedCourses, setLoadedCourses] = useState(false) //is selectedCourses not undefined meaning
    //only certain courses should be displayed, so, change the value of courses to the selected courses
    //otherwise just set them to allCourses

    FetchAccounts()
    FetchSemesterCourses()

    //this method is only called when student is registering for classes
    const onSubmit = (e) => {
        e.preventDefault()
        let updates = null
        if (canUnregister === true)
        {//need to also send allCourses, since courses is missing the students attribute and
            //need to delete student from reg
            updates = onUnRegisterCourse(e, loggedInAccount, allCourses, isCheckedCourseStatus)
            
        }
        else{ 
            updates = onRegisterCourse(e, loggedInAccount, courses, isCheckedCourseStatus)
        }
        setUpdates(updates)
        setLookForUpdates("true")
    }   
//selecting a course is only done by professor who are selecting a course to input final grades
//for their students
    const selectCourse = (selectedCourseID) => {
        if (canAssignGrades === true)
        {
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
                setNoCourses()
            }
            
        }
        else{ //admin looking at all semester courses
                if (allCourses.length !== 0)
                {
                    setCourses(allCourses)
                }
                else{
                    setNoCourses()
                }
                
        }
        setLoadedCourses(true)
    }

    const setNoCourses = () => {
        setCourses([{id: "No Courses Found.."}])
    }

    const setIsCheckedCourseStatusInitialState = () => {
        findIsCheckedCourseStatusInitialState(courses, setIsCheckedCourses, setLoaded)
    }

    const checkCourse= (id)=> {
        updateCheckedCourse(id, isCheckedCourseStatus, setIsCheckedCourses)
    }

    const checkForUpdates = () => {
        if (updates.updAcc !== null && updates.updSemCourses !== null )
        {
            setLookForUpdates(updatesReady)
        } 
        else
        {
            setLookForUpdates("false")
            setLookForUpdates("true")
        }
    }

    const deleteSemCourse = (id) => {
        const c = courses.filter(course => (course.id !== id))
        if (c.length !== 0 )
        {
            setCourses(c)
            setDeleteObjID(id)
        }
        else
        {
            setNoCourses()
        }
        
    }

    const courseItemDetails = (course) => {
        return (
            <div className="same-line" 
                onClick={() => { selectCourse(course.id)}  }>
                
                    
                    <label >{course.name} ({course.subject}) </label>
                    {/** trash can only pops up if admin viewing courses since only admin can delete courses
                     * if you put selectedCourses == null
                     */}
                    { selectedCourses === null &&
                    <label onClick={() => deleteSemCourse(course.id)}>
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
                    {(canUnregister !== true && canUnregister !== "not true") && 
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
            { isCheckedCourseStatus === null && loadedCourses === true && setIsCheckedCourseStatusInitialState()}
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
                    {(courses[0].id !== "No Courses Found.." && courses[0].id !== "Courses not set up yet") &&
                    <BorderedList itemListTitleName={"Current Courses: "} listItems={courseItems}></BorderedList>}
                    <div>
                        {(courses[0].id === "No Courses Found.." || courses[0].id === "Courses not set up yet") &&
                        <div>
                            <label>No Courses Found.. </label>
                        </div>
                        }
        
                    </div>
                    {(canRegister === true || canUnregister === true) &&
                    <div>
                        {courses[0].id !== "No Courses Found.." &&
                        <div>
                            <br></br> <br></br> <br></br> 
                            <ButtonTemplate 
                            theText={canRegister===true ? 'Register Selected Courses' : 'Unregister Selected Courses'}></ButtonTemplate>
                        </div>
                        
                        //<input type='submit' value={canRegister==true ? 'Register Selected Courses' : 'Unregister Selected Courses' }/>
                        }
                        <br></br>
                        {//<button onClick={reloadSearchBar} className="form-font-size form-btn go-back-button">Go Back</button>
                        //<GoBackButtonTemplate onClick={reloadSearchBar} theText={"Go Back"}
                            //></GoBackButtonTemplate>
                            }

                    </div>
                    }
                </form>
                {canRegister===true &&
                        <div>
                            <GoBackButtonTemplate onClickEventFunc={reloadSearchBar} theText={"Go Back"}
                            ></GoBackButtonTemplate>
                        </div>
                }

                {lookForUpdates === "true" && <div> {checkForUpdates()} </div>}
                {lookForUpdates === updatesReady
                && <div> <SubmitAction onComplete={onComplete} 
                        data={updates}
                        multipleData={true}></SubmitAction> </div>}

                {deleteObjID !== null && 
                    <div>
                        <SubmitAction onComplete={() => setDeleteObjID(null)} 
                                ActionMethod={DeleteSemesterCourse} data={deleteObjID}></SubmitAction>
                    </div>}

            </div>
            
        )
    
}

export default SemesterCourses