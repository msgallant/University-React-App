import { ADD_BUILDING, DELETE_BUILDING, FETCH_BUILDINGS, ADD_ROOM}  from "../actions/types"

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
        case ADD_ROOM:
          const i = state.items.filter(objs => (objs.id !== action.payload.id))
          console.log("adding room")
          console.log(i)
          return state
        default:
            return state
    }
}

export default buildingReducer