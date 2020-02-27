import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import './App.css';

import {
    RootState
} from './index';

import {
    wordListFetch,
} from './actions';

import MainMenu from './MainMenu';
import Quiz from './Quiz';

function mapStateToProps(state: RootState) {
    return {
        loading: state.wordListLoading,
        error: state.wordListError
    };
}


const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = ({
    loading,
    error,
    dispatch,
}: Props) => {

    useEffect(() => {
        dispatch(wordListFetch());
    }, []);

    if (loading) {
        return (
            <div className="quiz">
                <MainMenu />
                <div>loading...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="quiz">
                <MainMenu />
                <div>error...</div>
            </div>
        )
    }

    return (
        <div className="quiz">
            <MainMenu />
            <Quiz />
        </div>
    );
}

export default connector(App);
