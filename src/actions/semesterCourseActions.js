import { FETCH_SEMESTER_COURSES, DELETE_SEMESTER_COURSE, ADD_SEMESTER_COURSE,
  UPDATE_SEMESTER_COURSE } from "./types"
import useFetch from "../actions-methods/useFetch";
import useCreate from "../actions-methods/useCreate";
import useDelete from "../actions-methods/useDelete";
import useUpdate from "../actions-methods/useUpdate";

const serverURL = 'http://localhost:5000/SemesterCourses'

export const FetchSemesterCourses = () => {
  useFetch(serverURL, FETCH_SEMESTER_COURSES)
  }
  export const CreateSemesterCourse = (objData) => {
    useCreate(objData, serverURL, ADD_SEMESTER_COURSE)
  }

export const DeleteSemesterCourse = (id) => {
  useDelete(id, serverURL, DELETE_SEMESTER_COURSE)
}

//register a student to this course
export const UpdateSemesterCourse = (semesterCourse) => {
  useUpdate(semesterCourse, serverURL, UPDATE_SEMESTER_COURSE)
  
}
