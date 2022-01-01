import '@fortawesome/fontawesome-free/js/all.js';
import { useState } from 'react';
import AccountForm from './AccountForm';
import CourseForm from './CourseForm';
import Accounts from './Accounts';
import SubjectForm from './SubjectForm';
import Subjects from './Subjects';
import Buildings from './Buildings';
import BuildingForm from './BuildingForm';




const checkPrefix = (prefix, fullPageName) => {
    if (prefix === fullPageName.substring(0, prefix.length))
    {
        return true
    } 
    return false
}
const checkSuffix = (suffix, fullPageName) => {
    const num = fullPageName.length - suffix.length
    if (suffix === fullPageName.substring(num) )
    {
        return true
    }
    if (suffix.concat("s") === fullPageName.substring(num-1))
    {
        return true
    }
    return false
}
const MenuBar = () => {

    const [showThisPage, setShowThisPage] = useState('')
    const pageNames = [" Create Admin Account", " View Admin Accounts", " Create Professor Account", " View Professor Accounts",
                        " Create Student Account", " View Student Accounts", " Create Subject", " View Subjects", 
                        " Create Building", " View Buildings",
                         "Create Course", " View Courses"]

    const pageNamesPrefixes = [" Create ", " View "]
    const pageNamesSuffixes = ["Account", "Subject", "Building", "Course"]

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

                <div className="menu-icon-color" onClick={() => onClick(pageNames[0])}>
                    <i className="fas fa-user-plus"></i>
                    <label> {pageNames[0]}</label>
                </div>

                <div className="menu-icon-color" onClick={() => onClick(pageNames[1])}>
                    <i className="far fa-list-alt"></i>
                    <label> {pageNames[1]}</label>
                </div>

                <div className="menu-icon-color" onClick={() => onClick(pageNames[2])}>
                    <i className="fas fa-user-plus"></i>
                    <label> {pageNames[2]}</label>
                </div>

                <div className="menu-icon-color" onClick={() => onClick(pageNames[3])}>
                    <i className="far fa-list-alt"></i>
                    <label> {pageNames[3]} </label>
                </div>

                <div className="menu-icon-color" onClick={() => onClick(pageNames[4])}>
                    <i className="fas fa-user-plus"></i>
                    <label> {pageNames[4]}</label>
                </div>

                <div className="menu-icon-color" onClick={() => onClick(pageNames[5])}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[5]}</label>
                </div>

                <div className="menu-icon-color" onClick={() => onClick(pageNames[6])}>
                    <i className="fas fa-plus"></i>
                    <label>{pageNames[6]}</label>
                </div>

                <div className="menu-icon-color" onClick={() => onClick(pageNames[7])}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[7]}</label>
                </div>

                <div className="menu-icon-color" onClick={() => onClick(pageNames[8])}>
                    <i className="fas fa-plus"></i>
                    <label>{pageNames[8]}</label>
                </div>

                <div className="menu-icon-color" onClick={() => onClick(pageNames[9])}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[9]}</label>
                </div>
            </div>

            <div>
                {/* if showThisPage has (spaces matter) prefix ' Create ' and suffix 'Account' or 'Accounts' */}
                {console.log("page matching: " + pageNamesPrefixes[0] + showThisPage)}              
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

                {/* if showThisPage has prefix ' Create ' and suffix 'Course' or 'Courses' */}
                {/* checkPrefix(pageNamesPrefixes[0], showThisPage.toString()) === true
                    && checkSuffix(pageNamesSuffixes[1], showThisPage.toString()) === true
                && <CourseForm></CourseForm>*/}
               
            </div>

        </div>
        
        
    )
}


export default MenuBar