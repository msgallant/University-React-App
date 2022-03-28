import { getCopyOfSemesterCourseForAUserAccount } from "../admin-components/semesterCourse";
import { addNewRegisteredCourseEntriesIfAny, removeUnregisteredCoursesIfAny } from "./StudentTranscriptLogic";
import { getCopyOfStudentAccountForCourse } from "../admin-components/account";
  
  //this method is only called when student is registering for classes
//adds course to students list of courses, and adds corresponding transcript entry to student account
//and adds student to list of registered students in the course itself
  export const onRegisterCourse = (e, loggedInAccount, courses, isCheckedCourseStatus) => {
    e.preventDefault()
    let userCourses = []
    let studentAcc = loggedInAccount 

    courses.forEach((course => {
        //courses user wants to register for
        const wantedCourses = isCheckedCourseStatus.forEach((status) => {
            if (status.courseID === course.id && status.check === true)
            {
                if (course.filled !== course.capacity) //course not full
                {
                    course.filled = course.filled + 1
                    userCourses.push(course) //list of courses student registered in
                    course.students.push(getCopyOfStudentAccountForCourse(studentAcc)) //list of students in course including user now
                }
                else //course full, cannot register
                {
                    alert(course.name + " is already full")
                }
                
                
            }
        })
    }))

    //need to store course information in student account
    userCourses.forEach(userCourse => {
        studentAcc.coursesRegisteredIn.push(getCopyOfSemesterCourseForAUserAccount(userCourse))
        }) //need to store student account that is registered & has a transcript entry for course in it

    const updatedStudAcc = addNewRegisteredCourseEntriesIfAny(studentAcc) //add new registered courses to transcript with no grade
    //also adds a transcript entry with a grade value of null

    return {updAcc:updatedStudAcc, updSemCourses: userCourses}
}

//this method is only called when student is unregistering classes they are currently registered for
//unregisters course from students list of courses, and gets rid of corresponding transcript entry
//and removes student from list of registered students in the course itself
export const onUnRegisterCourse = (e, loggedInAccount, courses, isCheckedCourseStatus) => {
    e.preventDefault()
    let userCourses = []
    let unregisteredCourses = []
    let studentAcc = loggedInAccount 

    courses.forEach((course => {
    //courses user wants to unregister
        const wantedCourses = isCheckedCourseStatus.forEach((status) => {
        if (status.courseID === course.id && status.check === true)
        {
            course.filled = course.filled - 1
            let updatedCourseStudentList = course.students.filter(courseStudent => {
                if (courseStudent.id !== studentAcc.id)
                {
                    return courseStudent
                }
            })
            course.students = updatedCourseStudentList //list of students in course excluding user now
            unregisteredCourses.push(course) //need to remove student account that unregistered on server

        }
        else if (status.courseID === course.id && status.check === false) { //student still registered for course
            userCourses.push(course) //list of courses student registered in
        }
        })
        }))

    //need to remove unregistered courses information in student account
    studentAcc.coursesRegisteredIn = []
    userCourses.forEach(userCourse => {
    studentAcc.coursesRegisteredIn.push(getCopyOfSemesterCourseForAUserAccount(userCourse))
    })

    const updatedStudAcc = removeUnregisteredCoursesIfAny(studentAcc) 
    //gets rid of transcript entry & course entry for course/s that was just unregistered on server

    return {updAcc:updatedStudAcc, updSemCourses: userCourses}
}

//sets all courses to not checked
export const findIsCheckedCourseStatusInitialState = (courses, setIsCheckedCourses, setLoaded) => {
    const checkedCourseInitialState = courses.map(course => {
        return {
            check: false,
            courseID: course.id
        }
    })

    setIsCheckedCourses(checkedCourseInitialState)

    setLoaded(true)
}

//switches the true/false value of check for the course that matches with id
export const updateCheckedCourse= (id, isCheckedCourseStatus, setIsCheckedCourses)=> {
    const updatedCheckState = isCheckedCourseStatus.map(courseCheckStatus => {
        if (id === courseCheckStatus.courseID)
        {
            return {courseID: id, 
                check: !courseCheckStatus.check}
        }
        return courseCheckStatus
    })
    setIsCheckedCourses(updatedCheckState)
}