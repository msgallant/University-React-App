import { useState } from 'react';
import SemesterCourses from '../admin-components/SemesterCourses';
import { checkPrefix, checkSuffix } from '../pageNameChecker';
import SearchBar from './SearchBar';
import {pageNames, pageNamesPrefixes, pageNamesSuffixes} from '../pageNames'
import UserCourses from './UserCourses';
import StudentTranscript from './StudentTranscript';

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
        <div>
            <div className="icon-color">
                <label className="block black">Menu </label>

                {/* " Search for Courses"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[16])}>
                        <i className="far fa-list-alt"></i>
                        <label>{pageNames[16]}</label>
                    </div>

                    {/* " View Class Schedule"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[17])}>
                        <i className="far fa-list-alt"></i>
                        <label>{pageNames[17]}</label>
                    </div>

                    {/* " View Transcript"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[18])}>
                        <i className="far fa-list-alt"></i>
                        <label>{pageNames[18]}</label>
                    </div>
            </div>


            <div>
                {/* if showThisPage has (spaces matter) prefix ' Search ' and suffix 'Course' or 'Courses' */}             
                {checkPrefix(pageNamesPrefixes[2], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[4], showThisPage.toString()) === true
                    && <SearchBar profAccType={pageNames[2].substring(pageNamesPrefixes[0].length)}
                    onComplete={closeForm}></SearchBar>}
            </div>

            <div>
                {/* if showThisPage has (spaces matter) prefix ' View ' and suffix 'Class Schedule' or 'Class Schedules' */}             
                {checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[6], showThisPage.toString()) === true
                    && <UserCourses onComplete={closeForm}  />}
            </div>

            <div>
                {/* if showThisPage has (spaces matter) prefix ' View ' and suffix 'Transcript' or 'Transcripts' */}             
                {checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[7], showThisPage.toString()) === true
                    && <StudentTranscript />}
            </div>
            
        </div>
    )
}

export default StudentMenuBar