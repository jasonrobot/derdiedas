import React from 'react';
import './App.css';

import {
    Case,
    FRAU,
    AUTO,
    DEFINITE
} from './prototype';

import MainMenu from './MainMenu';
import Quiz from './Quiz';

const App: React.FC = () => {
    return (
        <div className="App">
            <MainMenu></MainMenu>
            <Quiz wordList={[FRAU, AUTO]} article={DEFINITE} kasus={Case.Nominative}></Quiz>
        </div >
    );
}

export default App;
