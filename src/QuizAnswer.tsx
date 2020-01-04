import React from 'react';

import {
    Gender,
    ArticleConjugation
} from './prototype';

interface QuizAnswerProps {
    /*     onclick:  */
    answer: ArticleConjugation
};

// const QuizAnswer: React.FunctionComponent<QuizAnswerProps> = ({
//     answer: {
//         gender,
//         word,
//     }
// }) => {
const QuizAnswer: React.FunctionComponent<QuizAnswerProps> = ({
    answer: answer
}) => {
    return (
        <button onClick={() => console.log(`${Gender[answer.gender]}: ${answer}`)}>
            {answer.word}
        </button>
    );
};

export default QuizAnswer;
