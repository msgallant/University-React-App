import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { subjectActionCreators } from "../actions";
import { useEffect } from 'react'

const Subjects = ()=> {
    const dispatch = useDispatch()
    const { fetchSubjects, deleteSubject } = bindActionCreators(subjectActionCreators, dispatch)

    useEffect(() => {
        fetchSubjects()
    }, [])

    const subjs = useSelector(state => state.subjects.items)

    const subjectItems = subjs.map(subject => (
        <div key={subject.id} className="select-div-color">
            <label>
                name: {subject.name}  &nbsp;
            </label>
            
            <label onClick={() => deleteSubject(subject.id)}>
                <i className="fas fa-trash-alt delete-icon-color"></i>
            </label>
            
            
        </div>
        ))

        return (
        
            <div>
                <div>
                    <label> Current Subjects: </label>
                </div>
                <div>
                    <label>{subjectItems}</label>
    
                </div>
            </div>
        )
    
}

export default Subjects