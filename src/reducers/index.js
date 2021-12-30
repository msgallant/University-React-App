import accountReducer from './accountReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    accounts: accountReducer
})

export default allReducers