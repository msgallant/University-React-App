import { FETCH_ACCOUNTS, ADD_ACCOUNT } from "./types";

const serverAccountsURL = 'http://localhost:5000/Accounts'


export const fetchAccounts = () => {
  return (dispatch) => {
  console.log("attempting dispatch")
    fetch('http://localhost:5000/Accounts')
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
    //const dispatch = useDispatch()
    console.log("creating new account" + JSON.stringify(accountData))
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