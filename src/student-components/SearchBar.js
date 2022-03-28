import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { semesterCourseActionCreators, timeSlotActionCreators, 
    accountActionCreators, subjectActionCreators} from "../actions"
import SemesterCourses from "../admin-components/SemesterCourses";
import { determineSelectedCourses } from "./SearchBarFilterLogic";
import { FetchAccounts } from "../actions/accountActions";
import { FetchSubjects } from "../actions/subjectActions";
import { FetchSemesterCourses } from "../actions/semesterCourseActions";


const SearchBar = ({profAccType, onComplete, loggedInAccount}) => {
    const [courseName, setCourseName] = useState('')
    const [professor, setProfessor] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [startTime, setStartTime] = useState('')
    const [matches, setMatches] = useState(null)

    const [selectedCourses, setSelectedCourses] = useState(null)

    const dispatch = useDispatch()

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

    return (
        <div>
            <label>Search</label>
            {selectedCourses == null && courses != null && courses.length !== 0 && loadCourses()}
            {selectedCourses != null && matches == null &&
            <form onSubmit={onSubmit}>


                    <label htmlFor="searchForCourse">Course: </label>
                    <input list="searchForCourseNames" id="searchForCourse" name="searchForCourse"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                        />
                    <datalist id="searchForCourseNames">
                        {makeOptions(courses) }
                    </datalist>

                    <label htmlFor="searchSubject">Subject: </label>
                    <input list="searchSubjectNames" id="searchSubject" name="searchSubject"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                        />
                    <datalist id="searchSubjectNames">
                        {makeOptions(subjects) }
                    </datalist>

                <label htmlFor="search prof">Professor: </label>
                    <input list="search professors" id="search prof" name="search prof"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}/>
                    <datalist id="search professors">
                        {makeOptions(profNames)}
                    </datalist>

                <label htmlFor="search start time">Start Time: </label>
                    <input id="search start time" name="search start time"
                    placeholder="9:00am"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}/>

                <input type='submit' value='Search for Courses' />

            </form>}

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