import SemesterCourses from "../admin-components/SemesterCourses"

const UserCourses = ({onComplete, onSelect, canAssignGrades, canUnregister, loggedInAccount}) => {
    console.log(loggedInAccount.coursesRegisteredIn)

    return (
        <div>
            
            <SemesterCourses canRegister={false} 
            loggedInAccount={loggedInAccount}
            canUnregister={canUnregister} 
            onComplete={onComplete}
            selectedCourses={loggedInAccount.coursesRegisteredIn}
            onSelect={onSelect}
            canAssignGrades={canAssignGrades}
             ></SemesterCourses>
        </div>
    )

}

export default UserCourses