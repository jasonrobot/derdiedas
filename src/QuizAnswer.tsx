import React from 'react';

import {
    Gender,
    ArticleConjugation
} from './prototype';

interface QuizAnswerProps {
    answer: ArticleConjugation,
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
    answerSelected,
}) => {
    return (
        <button onClick={answerSelected}>
            {answer.name}
        </button>
    );
};

export default QuizAnswer;
