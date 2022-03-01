import { checkPrefix, checkSuffix } from '../pageNameChecker';
import {pageNames, pageNamesPrefixes, pageNamesSuffixes} from '../pageNames'
import UserCourses from '../student-components/UserCourses';
import AssignGrades from './AssignGrades';
import { useState } from 'react';

const ProfessorMenuBar = ({loggedInAccount}) => {
    const [showThisPage, setShowThisPage] = useState('')

    const onClick = (pageName) => {
        setShowThisPage([pageName])
    }

    const closeForm = () => {
        console.log("closing professor menu")
        setShowThisPage('')
    }

    return (
        <div>
            <div className="icon-color">
                <label className="block black">Menu </label>

                {/* " View Class Schedule"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[17])}>
                        <i className="far fa-list-alt"></i>
                        <label>{pageNames[17]}</label>
                    </div>

                {/* " Assign Student Grades" */}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[19])}>
                        <i className="far fa-list-alt"></i>
                        <label>{pageNames[19]}</label>
                    </div>


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
                    && <AssignGrades onComplete={closeForm} loggedInAccount={loggedInAccount}  /> }
            </div>
        </div>
    )
}

export default ProfessorMenuBar