import {combineReducers} from 'redux'
import articleReducer from './articleReducer'
import { productsReducer } from './productsReducer'

export default combineReducers({
    //example1: example1Reducer,
    //example2: example2Reducer,
    articles: articleReducer,
    products: productsReducer,
})