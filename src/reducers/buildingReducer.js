import { ADD_BUILDING, DELETE_BUILDING, FETCH_BUILDINGS, UPDATE_BUILDING}  from "../actions/types"

const initialState = {
    items: [],
    item: {}
}

const buildingReducer = (state =initialState, action) => {
    switch(action.type) {
        case ADD_BUILDING:
            return {
                ...state,
                item: action.payload
              }
        case FETCH_BUILDINGS:
            return{
                ...state,
                items: action.payload
              }
        case DELETE_BUILDING:
          const newObjs = state.items.filter(objs => (objs.id !== action.payload))
          return {
            ...state,
            items: newObjs
          }
        case UPDATE_BUILDING:
          const updatedBldg = action.payload
          const bldgs = state.items.filter(bldg => (bldg.id !== updatedBldg.id))
          bldgs.push(updatedBldg)
          return {
            ...state,
            items: bldgs
          }
        default:
            return state
    }
}

export default buildingReducer