import { FETCH_SEMESTER_COURSES, DELETE_SEMESTER_COURSE, ADD_SEMESTER_COURSE } from "./types"
const serverURL = 'http://localhost:5000/SemesterCoures'

export const fetchSemesterCourses = () => {
  return (dispatch) => {
    fetch(serverURL)
      .then(res => res.json())
      .then(courses =>
        dispatch({
          type: FETCH_SEMESTER_COURSES,
          payload: courses
        })
      )
  }
  }
export const createSemesterCourse = (courseData) => {
    return (dispatch) => { 
        fetch(serverURL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(courseData)
        })
          .then(res => res.json())
          .then(course =>
            dispatch({
              type: ADD_SEMESTER_COURSE,
              payload: course
            })
          )
        }
}

export const deleteSemesterCourse = (id) => {
  return (dispatch) => {
    const url = serverURL + `/${id}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    dispatch({
        type: DELETE_SEMESTER_COURSE,
        payload: id
      })
  }
}