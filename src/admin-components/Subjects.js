import { useSelector } from "react-redux";
import React, { useState } from "react";
import BorderedList from "../page-templates/BorderedList";
import { FetchSubjects, DeleteSubject } from "../actions/subjectActions";
import SubmitAction from "../action-submitter/SubmitAction";

const Subjects = ()=> {
    const [deleteObjID, setDeleteObjID] = useState(null)

    FetchSubjects()

    const subjs = useSelector(state => state.subjects.items)

    const subjectItems = subjs.map(subject => (
        <div key={subject.id} className="select-div-color">
            <label>
                 {subject.name}  &nbsp;
            </label>
            
            <label onClick={() => setDeleteObjID(subject.id)}>
                <i className="fas fa-trash-alt delete-icon-color"></i>
            </label>
            
            
        </div>
        ))

        return (
            <div>
                <BorderedList itemListTitleName={"Current Subjects: "} listItems={subjectItems}></BorderedList>
                {deleteObjID !== null && 
                    <div>
                        <SubmitAction onComplete={() => setDeleteObjID(null)} 
                                ActionMethod={DeleteSubject} data={deleteObjID}></SubmitAction>
                    </div>}
            </div>
                

        )
    
}

export default Subjects