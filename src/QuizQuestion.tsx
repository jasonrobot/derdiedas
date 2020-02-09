import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    always,
    equals,
    ifElse,
    not,
} from 'ramda';

import {
    ArticleConjugation,
    Gender,
    Word,
} from './prototype';

import {
    answerQuestion,
} from './actions';

import {
    RootState
} from './index';

function mapStateToProps(state: RootState) {
    return {
        // articles: filter(equals(state.kasus), prop('kasus'))(state.article),
        articles: state.article.filter(article => article.kasus === state.kasus),
        // word: state.words.active[0],
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        answerQuestion: (gender: Gender) => dispatch(answerQuestion(gender)),
    };
}

const connector = connect(
    mapStateToProps,
    mapDispatchToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface QQProps extends PropsFromRedux {
    word: Word,
}

const QuizQuestion: React.FunctionComponent<QQProps> = ({
    word: {
        answer,
        gender,
        name,
    },
    articles,
    answerQuestion,
}: QQProps) => {

    const answersMarkup = articles.map((article: ArticleConjugation, index: number) => {
        return (
            <button
                key={index}
                disabled={not(equals(undefined, answer))}
                onClick={() => answerQuestion(article.gender)}>
                {article.name}
            </button >
        );
    });

    const isCorrectAttr = {
        'data-is-correct': ifElse(
            equals(undefined),
            always({}),
            equals(gender),
        )(answer),
    };

    return (
        <div
            className="question"
            {...isCorrectAttr}>
            <div className="answers">
                {answersMarkup}
            </div>
            {name}
        </div>
    );
}

export default connector(QuizQuestion);
