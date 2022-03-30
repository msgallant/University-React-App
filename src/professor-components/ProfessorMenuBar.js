import { checkPrefix, checkSuffix } from '../pageNameChecker';
import {pageNames, pageNamesPrefixes, pageNamesSuffixes} from '../pageNames'
import UserCourses from '../student-components/UserCourses';
import AssignGrades from './AssignGrades';
import { useState } from 'react';
import { listButton } from '../menu-buttons/listButton';

const ProfessorMenuBar = ({loggedInAccount}) => {
    const [showThisPage, setShowThisPage] = useState('')
    const [data, setData] = useState('')

    const onClick = (pageName) => {
        setShowThisPage([pageName])
    }

    const closeForm = () => {
        console.log("closing professor menu")
        setShowThisPage('')
    }

    const openForm = (nextPage, theData) => {
        console.log("opening form")
        setData(theData)
        setShowThisPage(nextPage)
    }

    return (
        <div>
            <div className="menu-option-left-layout">
                <label className="black form-title-size">Menu </label>

                <label className="block black menu-option-font menu-option-spacing">
                    Courses </label>

                {/* " View Class Schedule"*/}
                {listButton(pageNames[17], onClick)}

                <label className="block black menu-option-font menu-option-spacing">
                    Grades </label>

                {/* " Assign Student Grades" */}
                {listButton(pageNames[19], onClick)}


            </div>

            <div>
                {/* if showThisPage has (spaces matter) prefix ' View ' and suffix 'Class Schedule' or 'Class Schedules' */}             
                {checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[6], showThisPage.toString()) === true
                    && <UserCourses onComplete={closeForm} loggedInAccount={loggedInAccount} 
                    canUnregister={"not true"} />}
            </div>

            <div>
                {/* if showThisPage has (spaces matter) prefix ' Assign ' and suffix 'Grades' or 'Gradess' */}             
                {checkPrefix(pageNamesPrefixes[3], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[8], showThisPage.toString()) === true
                    && <AssignGrades onComplete={closeForm} loggedInAccount={loggedInAccount} 
                    canUnregister={"not true"} goBack={openForm}/> }
            </div>
        </div>
    )
}

export default ProfessorMenuBar