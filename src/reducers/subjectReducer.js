import { ADD_SUBJECT, DELETE_SUBJECT, FETCH_SUBJECT}  from "../actions/types"

const initialState = {
    items: [],
    item: {}
}

const subjectReducer = (state =initialState, action) => {
    switch(action.type) {
        case ADD_SUBJECT:
            return {
                ...state,
                item: action.payload
              }
        case FETCH_SUBJECT:
            return{
                ...state,
                items: action.payload
              }
        case DELETE_SUBJECT:
          const newSubjects = state.items.filter(subject => (subject.id !== action.payload))
          console.log("new: " + newSubjects.map(a=> a.id))
          return {
            ...state,
            items: newSubjects
          }
        default:
            return state
    }
}

export default subjectReducer