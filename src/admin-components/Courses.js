import { useSelector } from "react-redux";
import React, { useState } from "react";
import BorderedList from "../page-templates/BorderedList";
import SubmitAction from "../action-submitter/SubmitAction";
import { FetchCourses, DeleteCourse } from "../actions/courseActions";


const Courses = ()=> {
    const [deleteCourseID, setDeleteCourseID] = useState(null)

    FetchCourses()

    const courses = useSelector(state => state.courses.items)

    const courseItems = courses.map(course => (
        <div key={course.id} className="select-div-color">
            <div>
                <label>
                    name: {course.name}  &nbsp;
                </label>
                
                <label onClick={() => setDeleteCourseID(course.id)}>
                    <i className="fas fa-trash-alt delete-icon-color"></i>
                </label>
            </div>
            <div>
                <label>Subject: {course.subject} </label>
            </div>
            <div>
                <label>Description: {course.description} </label>
            </div>
            
            
        </div>
        ))

        return (
            <div>
                <BorderedList itemListTitleName={"Current Courses: "} listItems={courseItems}></BorderedList>
                {deleteCourseID !== null && 
                    <div>
                        <SubmitAction onComplete={() => setDeleteCourseID(null)} 
                                ActionMethod={DeleteCourse} data={deleteCourseID}></SubmitAction>
                    </div>}
            </div>
            
        )
    
}

export default Courses