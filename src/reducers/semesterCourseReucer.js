import { ADD_SEMESTER_COURSE, DELETE_SEMESTER_COURSE, FETCH_SEMESTER_COURSES,
  UPDATE_SEMESTER_COURSE}  from "../actions/types"

const initialState = {
    items: [],
    item: {}
}

const semesterCourseReducer = (state =initialState, action) => {
    switch(action.type) {
        case ADD_SEMESTER_COURSE:
            return {
                ...state,
                item: action.payload
              }
        case FETCH_SEMESTER_COURSES:
            return{
                ...state,
                items: action.payload
              }
        case DELETE_SEMESTER_COURSE:
          const newObjs = state.items.filter(course => (course.id !== action.payload))
          return {
            ...state,
            items: newObjs
          }
        case UPDATE_SEMESTER_COURSE:
          return state
        default:
            return state
    }
}

export default semesterCourseReducer