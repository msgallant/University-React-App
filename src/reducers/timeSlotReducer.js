import { ADD_TIME_SLOT, DELETE_TIME_SLOT, FETCH_TIME_SLOTS}  from "../actions/types"

const initialState = {
    items: [],
    item: {}
}

const timeSlotReducer = (state =initialState, action) => {
    switch(action.type) {
        case ADD_TIME_SLOT:
            return {
                ...state,
                item: action.payload
              }
        case FETCH_TIME_SLOTS:
            return{
                ...state,
                items: action.payload
              }
        case DELETE_TIME_SLOT:
          const newObjs = state.items.filter(timeSlot => (timeSlot.id !== action.payload))
          return {
            ...state,
            items: newObjs
          }
        default:
            return state
    }
}

export default timeSlotReducer