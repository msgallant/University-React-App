import { useState } from "react"
import { subjectActionCreators } from "../actions"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Subjects from "./Subjects"

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

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Subject name: </label>
                    <input
                    type='text'
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    />

                <div>
                    <input type='submit' value='Create New Subject' />
                </div>
            </form>
            <div>
                <Subjects></Subjects>
            </div>

        </div>
    )
}

export default SubjectForm