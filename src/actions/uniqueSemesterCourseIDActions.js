import { UPDATE_UNIQUE_SEMESTER_COURSE_ID, FETCH_UNIQUE_SEMESTER_COURSE_ID} from "./types";

const serverURL = 'http://localhost:5000/UniqueSemesterCourseID'


export const fetchUniqueSemesterCourseID = () => {
  return (dispatch) => {
    fetch(serverURL)
      .then(res => res.json())
      .then(id =>
        dispatch({
          type: FETCH_UNIQUE_SEMESTER_COURSE_ID,
          payload: id
        })
      )
  }
  }

  export const updateUniqueSemesterCourseID = (nextID) => {
    return (dispatch) => {
      const url = serverURL + `/${nextID.id}`
      fetch(url, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(nextID)
      })
        .then(res => res.json())
        .then(idObj =>
          dispatch({
            type: UPDATE_UNIQUE_SEMESTER_COURSE_ID,
            payload: idObj
          })
        )
    }
  }


