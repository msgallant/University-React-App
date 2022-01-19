import { useState } from 'react'

const StudentGradeEntryForm = ({studentAccount, courseID, onGradeEntryReceived}) => {
    const [gradeEntry, setGradeEntry] = useState(false)

    const setThisGradeEntry = (grade) => {
        console.log("received final grade")
        setGradeEntry(grade)
        onGradeEntryReceived(grade, studentAccount.id)

    }

    const findTranscriptEntry = () => {
        console.log("finding transcript entry")
        console.log(courseID)
        
        studentAccount.transcript.forEach(entry => {
            console.log("entry.id")
            console.log(entry.id)
            if (courseID === entry.id)
            {
                setGradeEntry(entry.grade)
                console.log("setting initial null grade")
                console.log(gradeEntry)
            }
        })
    }

    return (
        <div>
            {gradeEntry === false && findTranscriptEntry()}
            {gradeEntry !== false &&
            <div className="select-div-color">
                <label >
                    Name: {studentAccount.firstName} {studentAccount.middleName} {studentAccount.lastName}
                    &nbsp; Email: {studentAccount.email} &nbsp; {console.log("gradeEntry != null")}
                </label>
                <label htmlFor="grade entry"> Grade: </label>
                <input id="grade entry" name="grade entry"
                    value={gradeEntry == null ? '' : gradeEntry}
                    onChange={(e) => setThisGradeEntry(e.target.value)}
                        />
            </div>}
            

        </div>
    )

}

export default StudentGradeEntryForm