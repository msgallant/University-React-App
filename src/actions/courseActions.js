import { FETCH_COURSES, DELETE_COURSE, ADD_COURSE } from "./types"
const serverURL = 'http://localhost:5000/Courses'

export const fetchCourses = () => {
  return (dispatch) => {
    fetch(serverURL)
      .then(res => res.json())
      .then(courses =>
        dispatch({
          type: FETCH_COURSES,
          payload: courses
        })
      )
  }
  }
export const createCourse = (courseData) => {
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
              type: ADD_COURSE,
              payload: course
            })
          )
        }
}

export const deleteCourse = (id) => {
  return (dispatch) => {
    const url = serverURL + `/${id}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    dispatch({
        type: DELETE_COURSE,
        payload: id
      })
  }
}