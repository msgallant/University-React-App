import { useState } from 'react';
import { checkPrefix, checkSuffix } from '../pageNameChecker';
import SearchBar from './SearchBar';
import {pageNames, pageNamesPrefixes, pageNamesSuffixes} from '../pageNames'
import UserCourses from './UserCourses';
import StudentTranscript from './StudentTranscript';
import { listButton } from '../menu-buttons/listButton';
//order of lists cannot be changed but things can be added to list
//Can't have page name with same prefix and suffix
const StudentMenuBar = ({loggedInAccount}) => {
    const [showThisPage, setShowThisPage] = useState('')


    const onClick = (pageName) => {
        setShowThisPage([pageName])
    }

    const closeForm = () => {
        console.log("closing student menu")
        setShowThisPage('')
    }

    return (
        <div className='full-height'>
            <div className="menu-option-left-layout full-height">
                <label className="black form-title-size">Menu </label>

                <label className="block black menu-option-font menu-option-spacing">
                    Courses </label>

                {/* " Search for Courses"*/}
                {listButton(pageNames[16], onClick)}


                {/* " View Class Schedule"*/}
                {listButton(pageNames[17], onClick)}

                <label className="block black menu-option-font menu-option-spacing">
                    Transcript </label>

                {/* " View Transcript"*/}
                {listButton(pageNames[18], onClick)}
            </div>


            <div>
                {/* if showThisPage has (spaces matter) prefix ' Search ' and suffix 'Course' or 'Courses' */}             
                {checkPrefix(pageNamesPrefixes[2], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[4], showThisPage.toString()) === true
                    && <SearchBar profAccType={pageNames[2].substring(pageNamesPrefixes[0].length)}
                    onComplete={closeForm} loggedInAccount={loggedInAccount} ></SearchBar>}
            </div>

            <div>
                {/* if showThisPage has (spaces matter) prefix ' View ' and suffix 'Class Schedule' or 'Class Schedules' */}             
                {checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[6], showThisPage.toString()) === true
                    && <UserCourses onComplete={closeForm}  
                    canUnregister={true} loggedInAccount={loggedInAccount}/>}
            </div>

            <div>
                {/* if showThisPage has (spaces matter) prefix ' View ' and suffix 'Transcript' or 'Transcripts' */}             
                {checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[7], showThisPage.toString()) === true
                    && <StudentTranscript loggedInAccount={loggedInAccount}/>}
            </div>
            
        </div>
    )
}

export default StudentMenuBar