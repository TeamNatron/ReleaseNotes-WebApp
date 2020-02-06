import {combineReducers} from 'redux'
import articleReducer from './articleReducer'

export default combineReducers({
    //example1: example1Reducer,
    //example2: example2Reducer,
    articles: articleReducer,
})