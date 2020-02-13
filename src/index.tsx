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
    Gender,
    DEFINITE,
} from './prototype';

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

const sampleWords = [{
    name: 'Auto',
    gender: Gender.Neuter,
}, {
    name: 'Frau',
    gender: Gender.Feminine,
}, {
    name: 'Mann',
    gender: Gender.Masculine,
}, {
    name: 'Mädchen',
    gender: Gender.Neuter
}, {
    name: 'Haus',
    gender: Gender.Masculine
}, {
    name: 'Zeitung',
    gender: Gender.Feminine
}, {
    name: 'Bier',
    gender: Gender.Neuter
}];

export type RootState = ReturnType<typeof rootReducer>;

export const INITIAL_STATE: RootState = {
    wordListLoading: false,
    wordListError: false,
    words: {
        active: sampleWords,
        inactive: [],
        recent: [],
    },
    kasus: Case.Nominative,
    article: DEFINITE,
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
