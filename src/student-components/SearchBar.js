import { useState } from "react";
import { useSelector } from "react-redux";
import SemesterCourses from "../admin-components/SemesterCourses";
import { determineSelectedCourses } from "./SearchBarFilterLogic";
import { FetchAccounts } from "../actions/accountActions";
import { FetchSubjects } from "../actions/subjectActions";
import { FetchSemesterCourses } from "../actions/semesterCourseActions";
import CreationForm from "../page-templates/CreationForm";
import { InputTemplate, InputDropDownListTemplate } from "../page-templates/InputTemplate";


const SearchBar = ({profAccType, onComplete, loggedInAccount}) => {
    const [courseName, setCourseName] = useState('')
    const [professor, setProfessor] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [startTime, setStartTime] = useState('')
    const [matches, setMatches] = useState(null)

    const [selectedCourses, setSelectedCourses] = useState(null)

    const subjects = useSelector(state => state.subjects.items)
    const courses = useSelector(state => state.semesterCourses.items)
    const accounts = useSelector(state => state.accounts.items)
    const profAccounts = accounts.filter(account => 
        (account.accountType === profAccType))

    const profNames = profAccounts.map(acc => {
        const profName = "Dr. " + acc.firstName + " " + acc.middleName + " " + acc.lastName + " (" + acc.email + ")"
        const prof = {
            name: profName
        }
        return prof
        
    })
    FetchAccounts()
    FetchSubjects()
    FetchSemesterCourses()
    /*useEffect(() => { 
    }, [])*/

    const getFilterCriteria = () => {
        const filterCriteria = {name: courseName, professor: professor, subject: subjectName, startTime: startTime}
        return filterCriteria
    }

    const onSubmit = (e) => {
        e.preventDefault()
        determineSelectedCourses(getFilterCriteria(), selectedCourses, setMatches, loggedInAccount.coursesRegisteredIn)        
        
    }


    //loading all the courses into selectedCourses at the beggining of the program
    //if user wants to go back and make a different search, reseting matches to null
    const loadCourses = () => {
        console.log("reloading courses for search bar")
        setMatches(null)
        setSelectedCourses(courses)
    }

    const makeOptions= (opts) => {
        return opts.map((opt, index)=> (
            <div key={index} className="select-div-color">
                <option value={opt.name} />                 
            </div>
        ))
    }

    const SearchBarFormFields = (
        <div className="form-font-size">

                        <InputDropDownListTemplate thePlaceholder={'Course'} theValue={courseName} 
                    allOptions={makeOptions(courses)} setTheValue={setCourseName}>
                    </InputDropDownListTemplate>

                    <InputDropDownListTemplate thePlaceholder={'Subject'} theValue={subjectName} 
                    allOptions={makeOptions(subjects)} setTheValue={setSubjectName}>
                    </InputDropDownListTemplate>

                    <InputDropDownListTemplate thePlaceholder={'Professor'} theValue={professor} 
                    allOptions={makeOptions(profNames)} setTheValue={setProfessor}>
                    </InputDropDownListTemplate>

                    <InputTemplate thePlaceholder={'Start time (eg. 9:00am)'} theValue={startTime} setTheValue={setStartTime}>
                        </InputTemplate>

            </div>
    )

    return (
        <div>
            {selectedCourses == null && courses != null && courses.length !== 0 && loadCourses()}
            {selectedCourses != null && matches == null &&
                <CreationForm title={'Search'} 
                fields={SearchBarFormFields} 
                submitButtonText={'Search for Courses'} onSubmit={onSubmit}></CreationForm>}

            <div>

                {matches != null &&
                <SemesterCourses canRegister={true} onComplete={onComplete}  
                selectedCourses={matches} loggedInAccount={loggedInAccount}
                reloadSearchBar={() => loadCourses()}></SemesterCourses>}
            </div>
        </div>
        
    )
}

export default SearchBar