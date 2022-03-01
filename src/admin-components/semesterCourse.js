
export const semesterCourse = {
    name: '',
    courseDesc: '',
    subject: '',
    schedule: '', //time slot
    professor: '',
    location: '',
    filled: 0, //how many students registered for course
    capacity: 0, //how many students can enroll in course
    students: [], //students registered in course
    id: -1
}

// missing students which is necessary,
//otherwise will get an error because semesterCourse objects are stored in account objs
//but students are account objs, you can't have circular references, so, instead of
//actual semester courses getting stored in accounts, the following gets stored
//instead while semester courses 'students' attribute store actual account objs
//also given to professor accounts if they are the professor for the course
export const getCopyOfSemesterCourseForAUserAccount = (userCourse) => {
    const courseCopy = {
        name: userCourse.name,
        courseDesc: userCourse.courseDesc,
        subject: userCourse.subject,
        schedule: userCourse.schedule, //time slot
        professor: userCourse.professor,
        location: userCourse.location,
        id: userCourse.id
    }
    return courseCopy
}
