import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './App.css';

import {
    wordListFetch,
} from './actions';

import {
    Gender,
} from './prototype';

import MainMenu from './MainMenu';
import Quiz from './Quiz';

const connector = connect();

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = ({
    dispatch,
}: Props) => {

    useEffect(() => {
        dispatch(wordListFetch());
    }, []);

    const currentQuestion = {
        name: 'Frau',
        gender: Gender.Feminine,
    };

    if (currentQuestion == null) {
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

export default connector(App);
