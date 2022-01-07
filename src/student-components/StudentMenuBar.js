import { useState } from 'react';
import SemesterCourses from '../admin-components/SemesterCourses';
import { checkPrefix, checkSuffix } from '../pageNameChecker';

//order of lists cannot be changed but things can be added to list
//Can't have page name with same prefix and suffix
const StudentMenuBar = () => {
    const [showThisPage, setShowThisPage] = useState('')
    const pageNames = [" Search for Courses", " View Class Schedule", " View Transcript"]

    const pageNamesPrefixes = [" Search ", " View "]
    const pageNamesSuffixes = ["Course", "Schedule", "Transcript"]

    const onClick = (pageName) => {
        setShowThisPage([pageName])
    }

    const closeForm = () => {
        setShowThisPage('')
    }

    return (
        <div>
            <div className="icon-color">
                <label className="block black">Menu </label>

                {/* " Search for Courses"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[0])}>
                        <i className="far fa-list-alt"></i>
                        <label>{pageNames[0]}</label>
                    </div>
            </div>

            <div>
                {/* if showThisPage has (spaces matter) prefix ' Search ' and suffix 'Course' or 'Courses' */}             
                {checkPrefix(pageNamesPrefixes[0], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[0], showThisPage.toString()) === true
                    && <SemesterCourses canRegister={true} onComplete={closeForm} />}
            </div>
            
        </div>
    )
}

export default StudentMenuBar