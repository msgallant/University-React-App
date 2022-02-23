

export const account = {
    accountType: "", 
    firstName: "", 
    middleName: "", 
    lastName: "", 
    email: "", 
    password: "",
    coursesRegisteredIn: [],
    transcript: [],
    id: "1"
}

//semester course has list of students, this is what gets put in the list to keep track
//of registered students, removing coursesRegisteredIn, transcript, account type and password
//because the course only needs to keep track of what students are in the course
export const getCopyOfStudentAccountForCourse = (studentAcc) => {
    const studentCourseCopy = {
        firstName: studentAcc.firstName,
        middleName: studentAcc.middleName,
        lastName: studentAcc.lastName,
        email: studentAcc.email,
        id: studentAcc.id
    }
    return studentCourseCopy
}