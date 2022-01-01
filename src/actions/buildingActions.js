import { ADD_BUILDING, DELETE_BUILDING, FETCH_BUILDINGS, ADD_ROOM}  from './types'

const serverURL = 'http://localhost:5000/Buildings'


export const fetchBuildings = () => {
  return (dispatch) => {
    fetch(serverURL)
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: FETCH_BUILDINGS,
          payload: data
        })
      )
  }
  }
export const createBuilding = (data) => {
    return (dispatch) => { 
        fetch(serverURL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(data =>
            dispatch({
              type: ADD_BUILDING,
              payload: data
            })
          )
        }
}

export const deleteBuilding = (id) => {
  return (dispatch) => {
    const url = serverURL + `/${id}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    dispatch({
        type: DELETE_BUILDING,
        payload: id
      })
  }
}

export const addBuildingRoom = (building) => {
  return (dispatch) => {
    const url = serverURL + `/${building.id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(building)
    })
      .then(res => res.json())
      .then(building =>
        dispatch({
          type: ADD_ROOM,
          payload: building
        })
      )
  }
  
}
