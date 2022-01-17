
export const semesterCourse = {
    name: '',
    courseDesc: '',
    subject: '',
    schedule: '', //time slot
    professor: '',
    location: '',
    filled: 0, //how many students registered for course
    capacity: 0, //how many students can enroll in course
    students: [] //students registered in course
}

//missing capacity and filled because don't need, also missing students which is necessary,
//otherwise will get an error because semesterCourse objects are stored in account objs
//but students are account objs, you can't have circular references, so, instead of
//actual semester courses getting stored in accounts, the following gets stored
//instead while semester courses 'students' attribute store actual account objs
export const getCopyOfSemesterCourseForStudent = (userCourse) => {
    const studentCourseCopy = {
        name: userCourse.name,
        courseDesc: userCourse.courseDesc,
        subject: userCourse.subject,
        schedule: userCourse.schedule, //time slot
        professor: userCourse.professor,
        location: userCourse.location
    }
    return studentCourseCopy
}