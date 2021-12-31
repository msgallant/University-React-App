import { ADD_SUBJECT, DELETE_SUBJECT, FETCH_SUBJECT}  from './types'

const serverSubjectsURL = 'http://localhost:5000/Subjects'


export const fetchSubjects = () => {
  return (dispatch) => {
    fetch(serverSubjectsURL)
      .then(res => res.json())
      .then(subjects =>
        dispatch({
          type: FETCH_SUBJECT,
          payload: subjects
        })
      )
  }
  }
export const createSubject = (subjectData) => {
    return (dispatch) => { 
        fetch(serverSubjectsURL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(subjectData)
        })
          .then(res => res.json())
          .then(subject =>
            dispatch({
              type: ADD_SUBJECT,
              payload: subject
            })
          )
        }
}

export const deleteSubject = (id) => {
  return (dispatch) => {
    const accountUrl = serverSubjectsURL + `/${id}`
    fetch(accountUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    dispatch({
        type: DELETE_SUBJECT,
        payload: id
      })
  }
}