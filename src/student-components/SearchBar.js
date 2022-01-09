import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { semesterCourseActionCreators, timeSlotActionCreators, 
    accountActionCreators, subjectActionCreators} from "../actions"
import { dataListValidOptionObjectNameChecker } from "../admin-components/dataListValidOptionChecker";
import SemesterCourses from "../admin-components/SemesterCourses";
import { checkIfValidTime } from "../admin-components/timeSlotFormat";

const SearchBar = ({profAccType, onComplete}) => {
    const [courseName, setCourseName] = useState('')
    const [professor, setProfessor] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [startTime, setStartTime] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [filtered, setFiltered] = useState(false)
    const [matches, setMatches] = useState(null)
    const [loadedFilters, setLoadedFilters] = useState([])
    const [loadedFilteredCourses, setLoadedFilteredCourses] = useState(false)
    const [selectedCourses, setSelectedCourses] = useState(null)

    const dispatch = useDispatch()

    const { fetchSemesterCourses } = bindActionCreators(semesterCourseActionCreators, dispatch)
    const { fetchTimeSlots } = bindActionCreators(timeSlotActionCreators, dispatch)
    const { fetchAccounts } = bindActionCreators(accountActionCreators, dispatch)
    const { fetchSubjects } = bindActionCreators(subjectActionCreators, dispatch)

    const subjects = useSelector(state => state.subjects.items)
    const courses = useSelector(state => state.semesterCourses.items)
    const timeSlots = useSelector(state => state.timeSlots.items)
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

    useEffect(() => {
        fetchSemesterCourses()
        fetchAccounts()
        fetchTimeSlots()
        fetchSubjects()
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("attempting to submit")

        if (dataListValidOptionObjectNameChecker(courses, courseName)){
            determineSelectedCourses(courseName)
        }

        if (dataListValidOptionObjectNameChecker(profNames, professor)){
            determineSelectedCourses(professor)
        }

        if (dataListValidOptionObjectNameChecker(subjects, subjectName)){
            determineSelectedCourses(subjectName)
        }
        if (checkIfValidTime(startTime))
        {
            determineSelectedCourses(startTime)
        }
        
    }

    const findStartTime = (scheduleString) => {
        let startTime = ''
        scheduleString.forEach(letter => {
            if (letter !== ' ')
            {
                startTime.concat(letter)
            }
        })
        console.log("start time is: ")
        console.log(startTime)
        return startTime
    }

    //if a filter is being applied to the matching courses to remove any courses that do not meet the criteria
//need this so program knows when the filters are done before returning the matching courses
let filtersInAction = [] 

const filter = {
    inAction: true
}
const filterStart = () => {
    filtersInAction.push(filter)
}
const filterFinish = (matches) => {
    let filterFinish = false
    let allFiltersAlreadyFinished = true
    filtersInAction.forEach(ele => {
        if (filterFinish === false && ele.inAction === true) 
        {
            filterFinish = true
            ele.inAction = false
        }

    })

    filtersInAction.forEach(ele => {
        if (filterFinish === false && ele.inAction === true) 
        {
            allFiltersAlreadyFinished = false
        }

    })

    if (allFiltersAlreadyFinished === true)
    {
        setFiltered(true)
    }

}

    //criteria must be a string, either course name, professor name, subject names of a string containing the start time only
    const determineSelectedCourses = (criteria) => {
        filterStart()
        console.log("determining - starting with:")
        console.log(selectedCourses)
        let matches = []
        selectedCourses.forEach(element => {
            //check to see if any matches with the criteria
            console.log("element.subject === criteria")
            console.log(element.subject === criteria)
            if (element.name === criteria || element.subject === criteria || element.professor === criteria)
            {
                matches.push(element)
            }
            else if (checkIfValidTime(element.schedule) && element.schedule === findStartTime(criteria)) //if criteria is a time
            {
                matches.push(element)
            }
        })
        console.log("determining matches")
        console.log(matches)
        setMatches(matches)
        setSelectedCourses(matches)
        console.log(selectedCourses)
        filterFinish(matches)
    }

//loading courses that matched the criteria given by the user
    const loadFilteredCourses = (matches) => {
        console.log("loadFilteredCourses")
        if (JSON.stringify(matches) !== JSON.stringify(selectedCourses))
        {
            console.log("matches !== selectedCourses")
            console.log(JSON.stringify(matches))
            console.log("next part")
            console.log(JSON.stringify(selectedCourses))
            console.log(loadedFilteredCourses)
            setSelectedCourses(matches)
            
        }
        if (loadedFilteredCourses === false)
            {
                console.log("in while")
                var temp = selectedCourses
                console.log(JSON.stringify(matches))
            console.log("next part")
            console.log(JSON.stringify(selectedCourses))
                if (JSON.stringify(matches) === JSON.stringify(selectedCourses))
                {
                    console.log("hit!!")
                    setLoadedFilteredCourses(true)
                }
            }
        console.log("done filtering")

    }
    //loading all the courses into selectedCourses at the beggining of the program
    const loadCourses = () => {
        if (courses != null && courses.length !== 0)
        {
            setSelectedCourses(courses)
        console.log("loading")
        console.log(courses)
        }
        if (selectedCourses != null && selectedCourses.length !== 0)
        {
            console.log("loading selected")
        console.log(selectedCourses)
            setLoaded(true)
        }
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
            {loaded === false && courses != null && loadCourses()}
            {loaded === true &&
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
                {console.log("filtered: " + filtered)}
                {console.log("matches: " + matches)}
                {console.log("loaded filtered: " + loadedFilteredCourses)}
                {console.log("selected courses filtered: ")}
                {console.log(selectedCourses)}
                {matches != null && loadedFilteredCourses === false && loadFilteredCourses(matches)}
                {filtered && loadedFilteredCourses &&
                <SemesterCourses canRegister={true} onComplete={onComplete}  
                selectedCourses={selectedCourses}></SemesterCourses>}
            </div>
        </div>
        
    )
}

export default SearchBar