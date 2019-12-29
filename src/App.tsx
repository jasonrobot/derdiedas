import React from 'react';
import './App.css';

import {
    conjugateWord,
    frau,
    Case,
} from './prototype';

const App: React.FC = () => {
    return (
        <div className="App">
            { conjugateWord(frau, Case.Dative) }
        </div>
    );
}

export default App;
