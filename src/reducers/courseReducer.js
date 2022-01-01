import { ADD_COURSE, DELETE_COURSE, FETCH_COURSES}  from "../actions/types"

const initialState = {
    items: [],
    item: {}
}

const courseReducer = (state =initialState, action) => {
    switch(action.type) {
        case ADD_COURSE:
            return {
                ...state,
                item: action.payload
              }
        case FETCH_COURSES:
            return{
                ...state,
                items: action.payload
              }
        case DELETE_COURSE:
          const newObjs = state.items.filter(course => (course.id !== action.payload))
          return {
            ...state,
            items: newObjs
          }
        default:
            return state
    }
}

export default courseReducer