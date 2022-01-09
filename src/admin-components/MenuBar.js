import '@fortawesome/fontawesome-free/js/all.js';
import { useState } from 'react';
import { checkPrefix, checkSuffix } from '../pageNameChecker';
import AccountForm from './AccountForm';
import CourseForm from './CourseForm';
import Courses from './Courses';
import Accounts from './Accounts';
import SubjectForm from './SubjectForm';
import Subjects from './Subjects';
import Buildings from './Buildings';
import BuildingForm from './BuildingForm';
import TimeSlotForm from './TimeSlotForm';
import TimeSlots from './TimeSlots';
import SemesterCourseForm from './SemesterCourseForm';
import SemesterCourses from './SemesterCourses';
import {pageNames, pageNamesPrefixes, pageNamesSuffixes} from '../pageNames'





const MenuBar = () => {

    //order of lists cannot be changed but things can be added to list
    //"Admin Account, Student Account, Professor Account are the types of accounts that can be made"
    //Can't have page name with same prefix and suffix
    const [showThisPage, setShowThisPage] = useState('')

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
                {/* " Create Admin Account" */}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[0])}>
                    <i className="fas fa-user-plus"></i>
                    <label> {pageNames[0]}</label>
                </div>
                {/* " View Admin Accounts"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[1])}>
                    <i className="far fa-list-alt"></i>
                    <label> {pageNames[1]}</label>
                </div>
                {/* " Create Professor Account" */}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[2])}>
                    <i className="fas fa-user-plus"></i>
                    <label> {pageNames[2]}</label>
                </div>

                {/*" View Professor Accounts"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[3])}>
                    <i className="far fa-list-alt"></i>
                    <label> {pageNames[3]} </label>
                </div>

                {/* " Create Student Account"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[4])}>
                    <i className="fas fa-user-plus"></i>
                    <label> {pageNames[4]}</label>
                </div>

                {/* " View Student Accounts"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[5])}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[5]}</label>
                </div>

                {/*  " Create Subject"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[6])}>
                    <i className="fas fa-plus"></i>
                    <label>{pageNames[6]}</label>
                </div>

                {/* " View Subjects", */}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[7])}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[7]}</label>
                </div>

                {/*" Create Building"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[8])}>
                    <i className="fas fa-plus"></i>
                    <label>{pageNames[8]}</label>
                </div>

                {/* " View Buildings"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[9])}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[9]}</label>
                </div>

                {/* " Create Time Slot"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[10])}>
                    <i className="fas fa-plus"></i>
                    <label>{pageNames[10]}</label>
                </div>

                {/* " View Time Slots"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[11])}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[11]}</label>
                </div>

                {/* " Create Course"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[12])}>
                    <i className="fas fa-plus"></i>
                    <label>{pageNames[12]}</label>
                </div>

                {/* " View Courses"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[13])}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[13]}</label>
                </div>

                {/* " Create Course for the Semester" */}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[14])}>
                    <i className="fas fa-plus"></i>
                    <label>{pageNames[14]}</label>
                </div>

                {/* " View Courses for the Semester"*/}
                <div className="menu-icon-color" onClick={() => onClick(pageNames[15])}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[15]}</label>
                </div>
            </div>

            <div>
                {/* if showThisPage has (spaces matter) prefix ' Create ' and suffix 'Account' or 'Accounts' */}             
                {checkPrefix(pageNamesPrefixes[0], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[0], showThisPage.toString()) === true
                    && <AccountForm accType={showThisPage.toString().substring(pageNamesPrefixes[0].length)}
                    onComplete={closeForm} />}

                {/* if showThisPage has prefix ' View ' and suffix 'Account' or 'Accounts' */}
                {checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[0], showThisPage.toString()) === true
                    && <Accounts accTypes={showThisPage.toString().substring(pageNamesPrefixes[1].length)} />}

                {/* if showThisPage has prefix ' Create ' and suffix 'Subject' or 'Subjects' */}
                {checkPrefix(pageNamesPrefixes[0], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[1], showThisPage.toString()) === true
                    && <SubjectForm onComplete={closeForm} ></SubjectForm>}

                {/* if showThisPage has prefix ' view ' and suffix 'Subject' or 'Subjects' */}
                {checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[1], showThisPage.toString()) === true
                    && <Subjects></Subjects>}

                {/* if showThisPage has prefix ' Create ' and suffix 'Building' or 'Buildings' */}
                {checkPrefix(pageNamesPrefixes[0], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[2], showThisPage.toString()) === true
                    && <BuildingForm onComplete={closeForm} ></BuildingForm>}

                {/* if showThisPage has prefix ' view ' and suffix 'Building' or 'Buildings' */}
                {checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[2], showThisPage.toString()) === true
                    && <Buildings></Buildings>}

                {/* if showThisPage has prefix ' Create ' and suffix 'Time Slot' or 'Time Slots' */}
                { checkPrefix(pageNamesPrefixes[0], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[3], showThisPage.toString()) === true
                && <TimeSlotForm onComplete={closeForm} ></TimeSlotForm>}

                {/* if showThisPage has prefix ' View ' and suffix 'Time Slot' or 'Time Slots' */}
                { checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[3], showThisPage.toString()) === true
                && <TimeSlots></TimeSlots>}

                {/* if showThisPage has prefix ' Create ' and suffix 'Course' or 'Courses' */}
                { checkPrefix(pageNamesPrefixes[0], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[4], showThisPage.toString()) === true
                && <CourseForm onComplete={closeForm} ></CourseForm>}

                {/* if showThisPage has prefix ' View ' and suffix 'Course' or 'Courses' */}
                { checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[4], showThisPage.toString()) === true
                && <Courses></Courses>}

                {/* if showThisPage has prefix ' Create ' and suffix 'Semester' or 'Semesters' */}
                {/*pageNames[2] is 'Create Professor Account, it's substrings to 'Professor Account'
                since that is the account type for professors, so, a professor can be assigned to 
                a course */}
                { checkPrefix(pageNamesPrefixes[0], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[5], showThisPage.toString()) === true
                && <SemesterCourseForm onComplete={closeForm} 
                profAccType={pageNames[2].substring(pageNamesPrefixes[0].length)}></SemesterCourseForm>}

                {/* if showThisPage has prefix ' View ' and suffix 'Semester' or 'Semesters' */}
                { checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[5], showThisPage.toString()) === true
                && <SemesterCourses canRegister={false} ></SemesterCourses>}
               
            </div>

        </div>
        
        
    )
}


export default MenuBar