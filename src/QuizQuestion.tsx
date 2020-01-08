import React from 'react';

// import QuizAnswer from './QuizAnswer';

import {
    ArticleConjugation,
    Word
} from './prototype';

interface QuizQuestionProps {
    word: Word,
    userAnswer: ArticleConjugation | null,
    answers: ArticleConjugation[],
    questionAnswered: (answer: ArticleConjugation) => void,
}

const QuizQuestion: React.FunctionComponent<QuizQuestionProps> = ({
    word,
    userAnswer,
    answers,
    questionAnswered,
}: QuizQuestionProps) => {

    const answerSelected = (article: ArticleConjugation) => {
        return () => {
            questionAnswered(article);
        }
    }

    const isAnswered = userAnswer !== null;

    const answersMarkup = answers.map((article: ArticleConjugation, index: number) => {
        return (
            <button
                key={index}
                disabled={isAnswered}
                onClick={answerSelected(article)}>
                {article.name}
            </button>
        );
    });

    const isCorrectAttr = {
        'data-is-correct': userAnswer !== null ? userAnswer.gender === word.gender : {}
    };

    return (
        <div
            className="question"
            {...isCorrectAttr}>
            <div className="answers">
                {answersMarkup}
            </div>
            {word.name}
        </div>
    );
}

export default QuizQuestion;
