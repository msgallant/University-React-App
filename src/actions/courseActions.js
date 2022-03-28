import { FETCH_COURSES, DELETE_COURSE, ADD_COURSE } from "./types"
import useFetch from "../actions-methods/useFetch";
import useCreate from "../actions-methods/useCreate";
import useDelete from "../actions-methods/useDelete";

const serverURL = 'http://localhost:5000/Courses'

export const FetchCourses = () => {
  useFetch(serverURL, FETCH_COURSES)
}
export const CreateCourse = (courseData) => {
  useCreate(courseData, serverURL, ADD_COURSE)
}

export const DeleteCourse = (id) => {
  useDelete(id, serverURL, DELETE_COURSE)
}

