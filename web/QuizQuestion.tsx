import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    always,
    compose,
    equals,
    ifElse,
    isNil,
    not,
    or,
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

    let answersMarkup = [];
    if (answer === undefined) {
        // No answer given, set up clickable answers for every article.

        answersMarkup = articles.map((article: ArticleConjugation, index: number) => {
            const clickHandler = () => answerQuestion(article.gender);

            return (
                <div
                    key={index}
                    className="answer"
                    onClick={clickHandler}>
                    {article.name}&nbsp;
                    <span className="capitalize">{name}</span>
                </div>
            );
        });

    } else {
        // The question has been answered, show the user's answer, and the correct
        // answer if they were wrong.

        const correctArticle = articles.find(art => art.gender === gender);
        const userAnswer = articles.find(art => art.gender === answer);

        const articlesToShow: ArticleConjugation[] = [];
        if (userAnswer) {
            articlesToShow.push(userAnswer);
        }

        if (answer !== gender) {
            if (correctArticle) {
                articlesToShow.push(correctArticle);
            }
        }

        answersMarkup = articlesToShow
            .map((article: ArticleConjugation, index: number) => {
                const isCorrect = equals(article.gender, gender);
                return (
                    <div
                        key={index}
                        className="answer"
                        data-is-correct={isCorrect}>
                        {article.name}&nbsp;
                        <span className="capitalize">{name}</span>
                    </div>
                );
            });
    }

    const isCorrectAttr = {
        'data-is-correct': ifElse(
            compose(not, isNil),
            equals(gender),
            always({}),
        )(answer),
    };

    return (
        <div
            className="question"
            {...isCorrectAttr}>
            <div className="answers">
                {answersMarkup}
            </div>
        </div>
    );
}

export default connector(QuizQuestion);
