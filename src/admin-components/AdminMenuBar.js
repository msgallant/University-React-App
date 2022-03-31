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
import BuildingAddRoomForm from './BuildingAddRoomForm';
import {pageNames, pageNamesPrefixes, pageNamesSuffixes} from '../pageNames'
import { personPlusButton } from '../menu-buttons/personPlusButton';
import { listButton } from '../menu-buttons/listButton';
import { plusButton } from '../menu-buttons/plusButton';


const AdminMenuBar = ({loggedInAccount}) => {

    //order of lists cannot be changed but things can be added to list
    //"Admin Account, Student Account, Professor Account are the types of accounts that can be made"
    //Can't have page name with same prefix and suffix
    const [showThisPage, setShowThisPage] = useState('')
    const [data, setData] = useState('')

    const onClick = (pageName) => {
        setShowThisPage([pageName])
    }

    const closeForm = () => {
            setShowThisPage('')  
    }

    const openForm = (nextPage, theData) => {
        setData(theData)
        setShowThisPage(nextPage)
    }
    

    return (
        <div className='full-height'>
            <div className="menu-option-left-layout full-height ">
                <label className="black form-title-size">Menu </label>

                <label className="block black menu-option-font menu-option-spacing">
                    Accounts </label>
                {/* " Create Admin Account" */}
                {personPlusButton(pageNames[0], onClick)}

                {/* " View Admin Accounts"*/}
                {listButton(pageNames[1], onClick)}
                

                {/* " Create Professor Account" */}
                {personPlusButton(pageNames[2], onClick)}

                {/*" View Professor Accounts"*/}
                {listButton(pageNames[3], onClick)}

                {/* " Create Student Account"*/}
                {personPlusButton(pageNames[4], onClick)}

                {/* " View Student Accounts"*/}
                {listButton(pageNames[5], onClick)}

                <label className="block black menu-option-font menu-option-spacing">Subjects </label>

                {/*  " Create Subject"*/}
                {plusButton(pageNames[6], onClick)}

                {/* " View Subjects", */}
                {listButton(pageNames[7], onClick)}

                <label className="block black menu-option-font menu-option-spacing">University Buildings </label>

                {/*" Create Building"*/}
                {plusButton(pageNames[8], onClick)}

                {/* " View Buildings"*/}
                {listButton(pageNames[9], onClick)}

                <label className="block black menu-option-font menu-option-spacing">Course Time Slots </label>

                {/* " Create Time Slot"*/}
                {plusButton(pageNames[10], onClick)}

                {/* " View Time Slots"*/}
                {listButton(pageNames[11], onClick)}

                <label className="block black menu-option-font menu-option-spacing">Courses </label>

                {/* " Create Course"*/}
                {plusButton(pageNames[12], onClick)}

                {/* " View Courses"*/}
                {listButton(pageNames[13], onClick)}

                {/* " Create Course for the Semester" */}
                {plusButton(pageNames[14], onClick)}

                {/* " View Courses for the Semester"*/}
                {listButton(pageNames[15], onClick)}
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
                    && <BuildingForm onComplete={closeForm} openBuildingAddRoomFormPage={openForm}></BuildingForm>}

                {/* if showThisPage has prefix ' view ' and suffix 'Building' or 'Buildings' */}
                {checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[2], showThisPage.toString()) === true
                    && <Buildings openBuildingAddRoomFormPage={openForm}></Buildings>}

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
                    profAccType={pageNames[2].substring(pageNamesPrefixes[0].length)}
                    ></SemesterCourseForm>}

                {/* if showThisPage has prefix ' View ' and suffix 'Semester' or 'Semesters' */}
                { checkPrefix(pageNamesPrefixes[1], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[5], showThisPage.toString()) === true
                && <SemesterCourses canRegister={false} ></SemesterCourses>}

                {/* in buildings, admin can click add room which needs to take you to the BuildingAddRoomForm
                So,  if showThisPage has prefix ' Create ' and suffix 'Room' or 'Rooms'*/}
                { checkPrefix(pageNamesPrefixes[0], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[9], showThisPage.toString()) === true
                && <BuildingAddRoomForm openBuildingsForm={openForm} 
                building={data}></BuildingAddRoomForm>}
               
            </div>

        </div>
        
        
    )
}


export default AdminMenuBar