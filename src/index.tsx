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

import './index.css';
import App from './App';

import {
    kasus,
    article,
    currentWordPack,
    currentQuestion,
    wordPacks,
    fetchWordPacks,
} from './reducers'

const store = createStore(
    combineReducers({
        article,
        currentQuestion,
        currentWordPack,
        fetchWordPacks,
        kasus,
        wordPacks,
    }),
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
