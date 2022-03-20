import { useState } from "react"
import { subjectActionCreators } from "../actions"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Subjects from "./Subjects"
import CreationForm from "../page-templates/CreationForm";
import { InputTemplate } from "../page-templates/InputTemplate";

const SubjectForm = ({ onComplete }) => {
    const [subjectName, setSubjectName] = useState('')

    const dispatch = useDispatch()
    const { createSubject } = bindActionCreators(subjectActionCreators, dispatch)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!subjectName){
            alert('Subject name is missing')
            return
        }

        const newSubject = {
            name: subjectName
        }

        createSubject(newSubject)
        onComplete()
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

        </div>
    )
}

export default SubjectForm