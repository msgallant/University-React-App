import { FETCH_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT, ADD_REGISTERED_SEMESTER_COURSE } from "../actions/types"
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
        case ADD_REGISTERED_SEMESTER_COURSE:
          return state

        default:
          return state
    }
}

export default accountReducer