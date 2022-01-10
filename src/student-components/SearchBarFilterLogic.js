//scheduleString is a SemesterCourse schedule attribute, the first part of that before the space is the start time
//which is what we're trying to find
const findStartTime = (scheduleString) => {
    const startTime = scheduleString.split(" ", 1)
    return startTime[0]
}


//criteria must be a string, either course name, professor name, subject names of a string containing the start time only
export const determineSelectedCourses = (criteria, selectedCourses, setMatches) => {
    
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
    
}