import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR } from "../actions/productActions";
import { products } from "./initialStates";
import update from 'immutability-helper';

const initialState = products

export function productsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PRODUCTS_PENDING: 
            return update(state, {
                pending: {$set: true}})

        case FETCH_PRODUCTS_SUCCESS:
            return update(state, {
                pending: {$set: false},
                items: {$set: action.payload},
                error: {$set: null}
            })
        case FETCH_PRODUCTS_ERROR:
            return update(state, {
                pending: {$set: false},
                error: {$set: action.payload}})

        default: 
            return state;
    }
}