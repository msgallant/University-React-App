import { useState } from "react"
import { useSelector } from "react-redux";
import { newCourse } from "./course";
import  Courses  from "./Courses"
import { dataListValidOptionObjectNameChecker } from "./dataListValidOptionChecker";
import { InputDropDownListTemplate, InputTemplate } from "../page-templates/InputTemplate";
import CreationForm from "../page-templates/CreationForm";
import SubmitAction from "../action-submitter/SubmitAction";
import { CreateCourse } from "../actions/courseActions";
import { FetchSubjects } from "../actions/subjectActions";

const CourseForm = ({ onComplete }) => {
    const [courseName, setCourseName] = useState('')
    const [courseDesc, setCourseDesc] = useState('')
    const [subject, setSubject] = useState('')
    const [update, setUpdate] = useState(null)

    const subjects = useSelector(state => state.subjects.items)
    FetchSubjects()


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

        //checks if subject matches with 1 of the valid subjects .name attribute
        if (!dataListValidOptionObjectNameChecker(subjects, subject))
        {
            alert('Invalid subject')
            return
        }
        newCourse.subject = subject
        
        setUpdate(newCourse)

    }

     const availableSubjects = subjects.map((subj) => (
        <div key={subj.id}>
            <option value={subj.name}/>
        </div>
    ))

    const courseFormFields = (
        <div>

            <InputTemplate thePlaceholder={'Course name'} theValue={courseName} setTheValue={setCourseName}>
                    </InputTemplate> 

            <InputTemplate thePlaceholder={'Course description'} theValue={courseDesc} setTheValue={setCourseDesc}>
            </InputTemplate> 
            <div>
                <InputDropDownListTemplate thePlaceholder={'Subject '} theValue={subject} 
                    allOptions={availableSubjects} setTheValue={setSubject}>
                    </InputDropDownListTemplate>
            </div>
            
        </div>
    )

    return (
        <div className="separate-different-elements">
            <div className="place-at-top">
                <CreationForm title={'Create a New Course'} 
                    fields={courseFormFields} submitButtonText={'Create New Course'} 
                    onSubmit={onSubmit}></CreationForm>
            </div>
            <div className="place-at-top">
                <Courses></Courses>
            </div>

            {update !== null && 
                <div> 
                    <SubmitAction onComplete={() => {setUpdate(null); onComplete()}}
                        ActionMethod={CreateCourse} data={newCourse}></SubmitAction>
                </div>
            }

        </div>
    )
}

export default CourseForm