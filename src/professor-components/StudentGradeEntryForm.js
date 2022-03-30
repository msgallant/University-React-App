import { useState } from 'react'

const StudentGradeEntryForm = ({studentAccount, courseID, onGradeEntryReceived}) => {
    const [gradeEntry, setGradeEntry] = useState(false)

    const setThisGradeEntry = (grade) => {
        setGradeEntry(grade)
        onGradeEntryReceived(grade, studentAccount.id)

    }

    const findTranscriptEntry = () => {
        
        studentAccount.transcript.forEach(entry => {
            if (courseID === entry.id)
            {
                setGradeEntry(entry.grade)
            }
        })
    }

    return (
        <div>
            {gradeEntry === false && findTranscriptEntry()}
            {gradeEntry !== false &&
            <div className="select-div-color padding" >

                <label  className="center-left">
                    {studentAccount.firstName} {studentAccount.middleName} {studentAccount.lastName}
                    &nbsp;  &nbsp; 
                </label>
                <label className='hidden'>=</label>
                <input className="center-right grade-assign-input-box"
                    value={gradeEntry == null ? '' : gradeEntry}
                    onChange={(e) => setThisGradeEntry(e.target.value)}
                        />
                    <br></br>
                <label className="center-left">({studentAccount.email})</label>
                <label className='hidden'>=</label>
                
            </div>}
            

        </div>
    )

}

export default StudentGradeEntryForm