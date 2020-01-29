import React from 'react';
import {
    always,
    equals,
    ifElse,
    not,
} from 'ramda';
// import QuizAnswer from './QuizAnswer';

import {
    ArticleConjugation,
    Gender,
    Word
} from './prototype';

import {
    answerQuestion,
} from './actions';

interface QuizQuestionProps {
    currentQuestion: Word,
    answers: ArticleConjugation[],
    userAnswer?: Gender,
    key?: string,
    dispatch?: any, // FIXME NO ANY
}

const QuizQuestion: React.FunctionComponent<QuizQuestionProps> = ({
    currentQuestion,
    answers,
    userAnswer,
    dispatch
}: QuizQuestionProps) => {

    const answersMarkup = answers.map((article: ArticleConjugation, index: number) => {
        return (
            <button
                key={index}
                disabled={(userAnswer !== null)}
                onClick={() => dispatch(answerQuestion(article.gender))}>
                {article.name}
            </button >
        );
    });

    const isCorrectAttr = {
        'data-is-correct': ifElse(
            equals(undefined),
            equals(currentQuestion.gender),
            always({}),
        )(userAnswer),
    };

    return (
        <div
            className="question"
            {...isCorrectAttr}>
            <div className="answers">
                {answersMarkup}
            </div>
            {currentQuestion.name}
        </div>
    );
}

// export default function(props: QuizQuestionProps, ...children: React.ReactNode[]) {
//     return React.createElement(QuizQuestion, props, ...children);
// }
export default QuizQuestion;
