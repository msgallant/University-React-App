
export const fetchObjs = (serverURL, actionType) => {
  return (dispatch) => {
    fetch(serverURL)
      .then(res => res.json())
      .then(objs =>
        dispatch({
          type: actionType,
          payload: objs
        })
      )
  }
  }
  
  export const createObj = (objData, serverURL, actionType) => {
    return (dispatch) => { 
    fetch(serverURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(objData)
    })
      .then(res => res.json())
      .then(obj =>
        dispatch({
          type: actionType,
          payload: obj
        })
      )
    }
  }

  export const deleteObj = (id, serverURL, actionType) => {
    return (dispatch) => {
      const specificURL = serverURL + `/${id}`
      fetch(specificURL, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
      dispatch({
          type: actionType,
          payload: id
        })
    }
  }

  export const updateObj = (objData, serverURL, actionType) => {
    return (dispatch) => {
      const url = serverURL + `/${objData.id}`
      fetch(url, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(objData)
      })
        .then(res => res.json())
        .then(obj =>
          dispatch({
            type: actionType,
            payload: obj
          })
        )
    }
  }
