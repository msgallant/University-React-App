import { FETCH_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT } from "./types";

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
    console.log("attempting delete")
    return (dispatch) => {
      const accountUrl = serverAccountsURL + `/$id`
      fetch(`http://localhost:5000/Accounts/${id}`, {
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