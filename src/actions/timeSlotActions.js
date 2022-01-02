import { FETCH_TIME_SLOTS, DELETE_TIME_SLOT, ADD_TIME_SLOT } from "./types"
const serverURL = 'http://localhost:5000/TimeSlots'

export const fetchTimeSlots = () => {
  return (dispatch) => {
    fetch(serverURL)
      .then(res => res.json())
      .then(timeSlots =>
        dispatch({
          type: FETCH_TIME_SLOTS,
          payload: timeSlots
        })
      )
  }
  }
export const createTimeSlot = (timeSlotData) => {
    return (dispatch) => { 
        fetch(serverURL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(timeSlotData)
        })
          .then(res => res.json())
          .then(timeSlot =>
            dispatch({
              type: ADD_TIME_SLOT,
              payload: timeSlot
            })
          )
        }
}

export const deleteTimeSlot = (id) => {
  return (dispatch) => {
    const url = serverURL + `/${id}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    dispatch({
        type: DELETE_TIME_SLOT,
        payload: id
      })
  }
}