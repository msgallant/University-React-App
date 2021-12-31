import accountReducer from './accountReducer'
import subjectReducer from './subjectReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    accounts: accountReducer,
    subjects: subjectReducer
})

export default allReducers