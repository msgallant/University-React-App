import { FETCH_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT} from "./types";
import useFetch from "../actions-methods/useFetch";
import useCreate from "../actions-methods/useCreate";
import useDelete from "../actions-methods/useDelete";
import useUpdate from "../actions-methods/useUpdate";
const serverAccountsURL = 'http://localhost:5000/Accounts'

export const FetchAccounts = () => {
  useFetch(serverAccountsURL, FETCH_ACCOUNTS)
}

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
   useCreate(accountData, serverAccountsURL, ADD_ACCOUNT)

  }

  export const DeleteAccount = (id) => {
    useDelete(id, serverAccountsURL, DELETE_ACCOUNT)
  }

  export const UpdateAccount = (acc) => {
    useUpdate(acc, serverAccountsURL, UPDATE_ACCOUNT)
  }
  


