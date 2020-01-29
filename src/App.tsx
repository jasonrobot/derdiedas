import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';

import {
    makeWord,
    Case,
    Word,
    Article,
    FRAU,
    AUTO,
    DEFINITE
} from './prototype';

import {
    AppState
} from './state';

import {
    Gender,
} from './prototype';

import MainMenu from './MainMenu';
import Quiz from './Quiz';

const App: React.FC = () => {

    // const [appState, setAppState] = useState<AppState>(INITIAL_STATE);

    // useEffect(() => {
    //     fetchWordData().then((wordPacks: [[Word]]) => {
    //         setAppState({
    //             ...appState,
    //             wordPacks
    //         });
    //     });
    // }, []);

    const currentQuestion = {
        name: 'Frau',
        gender: Gender.Feminine,
    };

    // return (
    //     React.createElement('div', { className: 'quiz' }, [
    //         MainMenu({}),
    //         new Quiz({
    //             article: DEFINITE,
    //             kasus: Case.Nominative,
    //             currentQuestion,
    //         })
    //     ])
    // );

    if (currentQuestion === null) {
        return (
            <div className="quiz">
                <MainMenu />
                <div>loading...</div>
            </div>
        )
    } else {
        return (
            <div className="quiz">
                <MainMenu />
                <Quiz />
            </div>
        );
    }
}
export default connect()(App);
