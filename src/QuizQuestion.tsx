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
} from './prototype';

import {
    answerQuestion,
} from './actions';

import {
    RootState
} from './index';

function mapStateToProps(state: RootState) {
    const {
        answer,
        gender,
        name,
    } = state.words.active[0];

    return {
        // articles: filter(equals(state.kasus), prop('kasus'))(state.article),
        articles: state.article.filter(article => article.kasus === state.kasus),
        answer,
        gender,
        name,
    };
}

function mapDispatchToProps() { }

const connector = connect(
    mapStateToProps,
    // mapDispatchToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux { }

const QuizQuestion: React.FunctionComponent<Props> = ({
    answer,
    gender,
    name,
    articles,
    dispatch
}: Props) => {

    const answersMarkup = articles.map((article: ArticleConjugation, index: number) => {
        return (
            <button
                key={index}
                disabled={not(equals(undefined, answer))}
                onClick={() => dispatch(answerQuestion(article.gender))}>
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

// export default function(props: QuizQuestionProps, ...children: React.ReactNode[]) {
//     return React.createElement(QuizQuestion, props, ...children);
// }
export default connector(QuizQuestion);
