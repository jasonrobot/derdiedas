// React
import React from 'react';
import ReactDOM from 'react-dom';

//Redux and stuff
import {
    applyMiddleware,
    createStore,
    combineReducers
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';

// Ramda

// My Stuff
import {
    Case,
    DEFINITE,
    FRAU,
    AUTO,
} from './prototype';

import './index.css';
import App from './App';

import * as Reducers from './reducers';

const rootReducer = combineReducers({
    ...Reducers
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger(),
    )
);

export const INITIAL_STATE: RootState = {
    wordListLoading: false,
    wordListError: false,
    words: {
        active: [FRAU, AUTO],
        inactive: [],
    },
    kasus: Case.Nominative,
    article: DEFINITE,
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider >,
    document.getElementById('root'),
);
