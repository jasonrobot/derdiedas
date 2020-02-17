import React from 'react';

import { ArticleConjugation } from './prototype';

interface QuizAnswerProps {
    answer: ArticleConjugation,
    isAnswered: boolean,
    answerSelected: () => void
};

// const QuizAnswer: React.FunctionComponent<QuizAnswerProps> = ({
//     answer: {
//         gender,
//         word,
//     }
// }) => {
const QuizAnswer: React.FunctionComponent<QuizAnswerProps> = ({
    answer,
    isAnswered,
    answerSelected,
}) => {
    return (
        <button
            disabled={isAnswered}
            onClick={answerSelected}>
            {answer.name}
        </button>
    );
};

export default function(props: QuizAnswerProps, ...children: React.ReactNode[]) {
    return React.createElement(QuizAnswer, props, ...children);
}
