import React from 'react';

import QuizAnswer from './QuizAnswer';

import {
    ArticleConjugation,
} from './prototype';

interface QuizQuestionProps {
    word: string,
    answers: ArticleConjugation[]
}

const QuizQuestion: React.FunctionComponent<QuizQuestionProps> = ({
    word: word,
    answers: answers,
}: QuizQuestionProps) => {
    const answersMarkup = answers.map((article: ArticleConjugation, index: number) => {
        return (
            <QuizAnswer
                answer={article}
                key={index}>
                {article.word}
            </QuizAnswer>
        );
    });

    return (
        <div className="question">
            {answersMarkup}
            {word}
        </div>
    );
}

export default QuizQuestion;
