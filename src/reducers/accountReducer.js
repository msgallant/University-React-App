import { FETCH_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT } from "../actions/types"
const initialState = {
  items: [],
  item: {}
};
const accountReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case FETCH_ACCOUNTS:
          console.log("reducer fetching");
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
          console.log("reducer deleting account : " + state.items[2].firstName)
          console.log("reducer all accounts objs : " + state.items)
          console.log("action payload: " + action.payload)
          const newAccounts = state.items.filter(account => (account.id !== action.payload))
          console.log("new: " + newAccounts.map(a=> a.id))
          return {
            ...state,
            items: newAccounts
          }
        default:
          return state
    }
}

export default accountReducer