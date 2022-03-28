import { useState } from "react"
import Subjects from "./Subjects"
import CreationForm from "../page-templates/CreationForm";
import { InputTemplate } from "../page-templates/InputTemplate";
import { CreateSubject } from "../actions/subjectActions";
import SubmitAction from "../action-submitter/SubmitAction";

const SubjectForm = ({ onComplete }) => {
    const [subjectName, setSubjectName] = useState('')
    const [update, setUpdate] = useState(null) 

    const onSubmit = (e) => {
        e.preventDefault()

        if (!subjectName){
            alert('Subject name is missing')
            return
        }

        const newSubject = {
            name: subjectName
        }

        setUpdate(newSubject)
    }

    const subjectFormFields = (
        
            <InputTemplate thePlaceholder={'Subject name '} theValue={subjectName} setTheValue={setSubjectName}>
                        </InputTemplate>  
        
    )

    return (
        <div className="separate-different-elements">

                <div className="place-at-top">
                    <CreationForm title={'Create a Subject'} 
                        fields={subjectFormFields} submitButtonText={'Create New Subject'} 
                        onSubmit={onSubmit}></CreationForm>
                </div>

            <div className="place-at-top">
                <Subjects></Subjects>
            </div>

            {update !== null && 
                <div> 
                    <SubmitAction onComplete={() => {
                        setUpdate(null)
                        onComplete()}} 
                        ActionMethod={CreateSubject} data={update}></SubmitAction>
                </div>
            }

        </div>
    )
}

export default SubjectForm