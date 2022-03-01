import { UPDATE_UNIQUE_SEMESTER_COURSE_ID, FETCH_UNIQUE_SEMESTER_COURSE_ID } from "../actions/types"
const initialState = {
  items: [],
  item: {}
};
const UniqueSemesterCourseIDReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case FETCH_UNIQUE_SEMESTER_COURSE_ID:
            return{
              ...state,
              items: action.payload
            }
        case UPDATE_UNIQUE_SEMESTER_COURSE_ID:
          return {
            ...state,
            items: action.payload
          }

        default:
          return state
    }
}

export default UniqueSemesterCourseIDReducer