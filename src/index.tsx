import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { action, createAction } from 'typesafe-actions';

import {
    cond,
    equals,
} from 'ramda';

import {
    Case
} from './prototype';

import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

import {
    AppState,
    INITIAL_STATE,
    fetchWordData,
} from './state';

//////// Actions

enum ActionType {
    AnswerQuestion,
    SetArticle,
    SetCase,
    SetWordPack,
};

// const setCaseAction = (kasus: Case) => action(ActionType[ActionType.SetCase], kasus);

const setCaseAction

// const setCaseAction = createAction(SetCase)<Case>();

//////// Recuders

function setCaseReducer(state,

function rootReducer(state = INITIAL_STATE, { type }: Action) {
    return cond<ActionType, AppState>([
        [equals<ActionType>('answerQuestion'), () => {
            return state;
        }],
        [equals<ActionType>('setArticle'), () => {
            return state;
        }],
        [equals<ActionType>('setCase'), () => {
            return state;
        }],
        [equals<ActionType>('setWordPack'), () => {
            return state;
        }]
    ])(type);
}

const store = createStore(rootReducer, INITIAL_STATE);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider >,
    document.getElementById('root'),
);

// ReactDOM.render(
//     new Provider({ store }, [
//         App({})
//     ]),
//     document.getElementById('root'),
// );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
