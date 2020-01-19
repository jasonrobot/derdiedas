import React, { useState, useEffect } from 'react';
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

import MainMenu from './MainMenu';
import Quiz from './Quiz';

const App: React.FC = () => {

    const [appState, setAppState] = useState<AppState>(INITIAL_STATE);

    useEffect(() => {
        fetchWordData().then((wordPacks: [[Word]]) => {
            setAppState({
                ...appState,
                wordPacks
            });
        });
    }, []);

    return (
        React.createElement('div', { className: 'quiz' }, [
            MainMenu({}),
            Quiz({
                wordPack: [FRAU, AUTO],
                article: DEFINITE,
                kasus: Case.Nominative,
            })
        ])
    );
}

export default App;
