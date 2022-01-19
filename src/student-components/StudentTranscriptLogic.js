import { transcriptEntry } from "./transcriptEntry"
import { accountActionCreators } from "../actions"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import { useState } from "react";

const makeEmptyTranscriptEntry = (name, id) => {

//same format as transcript entry but can't use transcript entry because if adding more than 1
//course, the last course will overwrite the previous courses
    return {name: name, grade: null, id: id}
}

export const updateTranscriptOnCourseChanges = (studentAccount) => {
    const newTranscriptEntries = []
    //regCourses is one of the course the student is registered in
    studentAccount.coursesRegisteredIn.forEach(regCourses => {
        let isNewCourse = true

        studentAccount.transcript.forEach(entry => {

            if (entry.name === regCourses.name) //if course name never found on transcript, need to add it
            {
                isNewCourse = false
            }
            
            
        })
        if (isNewCourse === true) //a course that was just registered and doesnt have a transcript entry yet
        {
            newTranscriptEntries.push(makeEmptyTranscriptEntry(regCourses.name, regCourses.id))
        }


    })
    const updatedTranscript = studentAccount.transcript.concat(newTranscriptEntries)
    studentAccount.transcript = updatedTranscript

    return studentAccount


}

