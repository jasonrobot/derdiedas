import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    always,
    compose,
    concat,
    equals,
    head,
    ifElse,
    isNil,
    not,
    tail,
    toUpper,
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

    const isAnswered = not(equals(undefined));

    const answersMarkup = articles.map((article: ArticleConjugation, index: number) => {
        return (
            <button
                key={index}
                disabled={isAnswered}
                onClick={() => answerQuestion(article.gender)}>
                {article.name}
            </button >
        );
    });

    const isCorrectAttr = {
        'data-is-correct': ifElse(
            compose(not, isNil),
            equals(gender),
            always({}),
        )(answer),
    };

    const capitalize = (s: string) => concat(toUpper(head(s)), tail(s));

    const renderedName = ifElse(
        compose(not, isNil),
        always(`${articles[gender].name} ${capitalize(name)}`),
        always(capitalize(name))
    )(answer);

    return (
        <div
            className="question"
            {...isCorrectAttr}>
            <div className="answers">
                {answersMarkup}
            </div>
            {renderedName}
        </div>
    );
}

export default connector(QuizQuestion);
