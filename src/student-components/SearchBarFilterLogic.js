//scheduleString is a SemesterCourse schedule attribute, the first part of that before the space is the start time
//which is what we're trying to find
const findStartTime = (scheduleString) => {
    const startTime = scheduleString.split(" ", 1)
    return startTime[0]
}


//criteria must be a string, either course name, professor name, subject names of a string containing the start time only
export const determineSelectedCourses = (criteria, selectedCourses, setMatches, studentCourses) => {
    
    let myMatches = []
    selectedCourses.forEach((element, index) => {
        //check to see if any matches with the criteria
        if ((element.name === criteria.name || criteria.name === '') &&
        (element.subject === criteria.subject || criteria.subject === '') &&
        (element.professor === criteria.professor || criteria.professor === '') &&
        (findStartTime(element.schedule) === criteria.startTime || criteria.startTime === ''))
        {
            myMatches.push(element)
        }

        if (index === selectedCourses.length - 1)
        {
            
            setMatches(myMatches)
        }

    })

    if (myMatches.length !== 0 && studentCourses.length !== 0)
    {
        removeCoursesUserAlreadyRegisteredIn(myMatches, setMatches, studentCourses)
    }
    
}

//matches are courses that meets user searching criteria, studentCourses
//are the user courses they are already registered for
//user cannot register again for same course, so, if an already registered
//course meets user criteria must remove it
const removeCoursesUserAlreadyRegisteredIn = (matches, setMatches, studentCourses) => {
    let validMatches = []
    console.log("testing rmve corses")
    console.log(matches)
    console.log(studentCourses)
    matches.forEach((match) => {
        let alreadyRegistered = false
        studentCourses.forEach(studentCourse => {
            if (match.id === studentCourse.id)
            {
                alreadyRegistered = true
            }
        })
        if (alreadyRegistered !== true)
        {
            validMatches.push(match)
        }
    })

    setMatches(validMatches)
}