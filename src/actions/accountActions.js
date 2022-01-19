import { FETCH_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT} from "./types";

const serverAccountsURL = 'http://localhost:5000/Accounts'


export const fetchAccounts = () => {
  return (dispatch) => {
    fetch(serverAccountsURL)
      .then(res => res.json())
      .then(accounts =>
        dispatch({
          type: FETCH_ACCOUNTS,
          payload: accounts
        })
      )
  }
  }
  
  export const CreateAccount = (accountData) => {
    return (dispatch) => { 
    fetch(serverAccountsURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(accountData)
    })
      .then(res => res.json())
      .then(account =>
        dispatch({
          type: ADD_ACCOUNT,
          payload: account
        })
      )
    }
  }

  export const deleteAccount = (id) => {
    return (dispatch) => {
      const accountUrl = serverAccountsURL + `/${id}`
      fetch(accountUrl, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
      dispatch({
          type: DELETE_ACCOUNT,
          payload: id
        })
    }
  }

  export const updateAccount = (acc) => {
    console.log("change dispatch type for this")
    return (dispatch) => {
      const url = serverAccountsURL + `/${acc.id}`
      fetch(url, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(acc)
      })
        .then(res => res.json())
        .then(acc =>
          dispatch({
            type: UPDATE_ACCOUNT,
            payload: acc
          })
        )
    }
  }


