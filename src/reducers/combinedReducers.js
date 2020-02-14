import {combineReducers} from 'redux'
import {articlesReducer} from './articlesReducer'
import { productsReducer } from './productsReducer'

export default combineReducers({
    //example1: example1Reducer,
    //example2: example2Reducer,
    articles: articlesReducer,
    products: productsReducer,
})