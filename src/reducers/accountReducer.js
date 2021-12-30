import { FETCH_ACCOUNTS, ADD_ACCOUNT } from "../actions/types"
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
        default:
          return state
    }
}

export default accountReducer