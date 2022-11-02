import thunk from 'redux-thunk'

import rootReducer from '../reducers'
import {createWrapper} from 'next-redux-wrapper';
import {configureStore} from "@reduxjs/toolkit";

// initial states here

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// creating store
export const store = configureStore( {
    reducer : rootReducer,

    middleware: middleware}
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
