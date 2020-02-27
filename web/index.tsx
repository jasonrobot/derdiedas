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
} from './types';

import Articles from './Article';
import './index.css';
import App from './App';

import {
    wordListLoading,
    wordListError,
    article,
    kasus,
    words,
} from './reducers';

const rootReducer = combineReducers({
    wordListLoading,
    wordListError,
    article,
    kasus,
    words,
})

export type RootState = ReturnType<typeof rootReducer>;

export const INITIAL_STATE: RootState = {
    wordListLoading: false,
    wordListError: false,
    words: {
        // active: sampleWords,
        active: [],
        inactive: [],
        recent: [],
    },
    kasus: Case.Nominative,
    article: Articles.DEFINITE,
};

const store = createStore(
    rootReducer,
    INITIAL_STATE,
    applyMiddleware(
        thunkMiddleware,
        createLogger(),
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider >,
    document.getElementById('root'),
);
