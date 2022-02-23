import { FETCH_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT } from "../actions/types"
const initialState = {
  items: [],
  item: {}
};
const accountReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case FETCH_ACCOUNTS:
            return{
              ...state,
              items: action.payload
            }
        case 'UPDATE_ACCOUNTS':
            return state;
        case ADD_ACCOUNT:
            return {
              ...state,
              item: action.payload
            }
        case DELETE_ACCOUNT:
          const newAccounts = state.items.filter(account => (account.id !== action.payload))
          return {
            ...state,
            items: newAccounts
          }
        case UPDATE_ACCOUNT:
          const updatedAcc = action.payload
          const updAccounts = state.items.filter(account => (account.id !== updatedAcc.id))
          updAccounts.push(updatedAcc)
          return {
            ...state,
            items: updAccounts
          }

        default:
          return state
    }
}

export default accountReducer