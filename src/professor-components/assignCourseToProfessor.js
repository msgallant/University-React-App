//profTitleAndEmail contains:
// "Dr. " + acc.firstName + " " + acc.middleName + " " + acc.lastName + " (" + acc.email + ")"
export const assignCourseToProfessor = (semesterCourseCopy, profTitleAndEmail, allProfAccs, updateAccount ) => {
    const profAcc = findProfAccountGivenTitleAndEmail(profTitleAndEmail, allProfAccs)
    if (profAcc !=="Error - no prof matching account")
    {
        profAcc.coursesRegisteredIn.push(semesterCourseCopy)
        updateAccount(profAcc)
    }
    
}

// string that gets stored in a semesterCourse professor field:
// "Dr. " + acc.firstName + " " + acc.middleName + " " + acc.lastName + " (" + acc.email + ")"
//find prof account that corresponds to email
const findProfAccountGivenTitleAndEmail = (titleAndEmail, allProfAccs) => {
    const email = findProfEmailGivenTitleAndEmail(titleAndEmail)
    let matchProfAcc = "Error - no prof matching account"
    allProfAccs.forEach(profAcc => {
        if (profAcc.email === email)
        {
            matchProfAcc = profAcc
        }
    })
    return matchProfAcc
}
const findProfEmailGivenTitleAndEmail = (titleAndEmail) => {
    let foundStartOfEmail = false
    let email = ''

    titleAndEmail.split("").forEach(letter => {
        if (letter === '(') //start of email
        {
            foundStartOfEmail = true
        }
        else if (foundStartOfEmail === true)
        {
            if (letter !== ')') //end of email
            {
                email += letter
            }
        }
    })
    return email
}

export const unassignCourseToProfessor = (courseID, profAcc) => {
    let updatedAssignedCourses = []
    profAcc.coursesRegisteredIn.forEach( profCourse => {
        if (profCourse.id !== courseID)
        {
            updatedAssignedCourses.push(profCourse)
        }
    })

    profAcc.coursesRegisteredIn = updatedAssignedCourses
}