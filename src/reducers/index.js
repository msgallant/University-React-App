import accountReducer from './accountReducer'
import subjectReducer from './subjectReducer'
import buildingReducer from './buildingReducer'
import courseReducer from './courseReducer'
import timeSlotReducer from './timeSlotReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    accounts: accountReducer,
    subjects: subjectReducer,
    buildings: buildingReducer,
    courses: courseReducer,
    timeSlots: timeSlotReducer
})

export default allReducers