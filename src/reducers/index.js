import accountReducer from './accountReducer'
import subjectReducer from './subjectReducer'
import buildingReducer from './buildingReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    accounts: accountReducer,
    subjects: subjectReducer,
    buildings: buildingReducer
})

export default allReducers