import StudentGradeEntryForm from "../professor-components/StudentGradeEntryForm"
import TitleAndTwoColumnsTemplate from "./TitleAndTwoColumnsTemplate"

    const makeEntryForms = (selectedCourseStudentAccounts, selectedCourseID, storeGradeEntryReceived) => {
        return selectedCourseStudentAccounts.map((student, index)=> (
            <div key={index} className="block">
                <div  className="select-div-color">
                    <StudentGradeEntryForm studentAccount={student}
                    courseID={selectedCourseID}
                    onGradeEntryReceived={storeGradeEntryReceived}></StudentGradeEntryForm>              
                </div>
            </div>
        ))
    }
const AssignGradesTemplate = ({title, leftFieldTitle, rightFieldTitle, studentGradeEntries, selectedCourseID, storeGradeEntryReceived}) => {
    return (
        <div className="plain-border">
            <TitleAndTwoColumnsTemplate title={title} 
            leftFieldTitle={leftFieldTitle} rightFieldTitle={rightFieldTitle}></TitleAndTwoColumnsTemplate>
            
            <div className="form-font-size block">
                {makeEntryForms(studentGradeEntries, selectedCourseID, storeGradeEntryReceived)}
            </div>
            
            
        </div>
    )
}

export const EmptyAssignGradesTemplate = ({title}) => {

    return (
    <div className="plain-border">
        <TitleAndTwoColumnsTemplate title={title} ></TitleAndTwoColumnsTemplate>

        <label>No students registered in this course...</label>
    </div>)
}

export default AssignGradesTemplate