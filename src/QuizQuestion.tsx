import React from 'react';

import QuizAnswer from './QuizAnswer';

import {
    ArticleConjugation,
    Word
} from './prototype';

interface QuizQuestionProps {
    word: Word,
    isAnswered: boolean,
    answers: ArticleConjugation[],
    questionAnswered: (answer: ArticleConjugation) => void,
}

const QuizQuestion: React.FunctionComponent<QuizQuestionProps> = ({
    word,
    isAnswered,
    answers,
    questionAnswered,
}: QuizQuestionProps) => {

    const answerSelected = (article: ArticleConjugation) => {
        return () => {
            questionAnswered(article);
        }
    }

    const answersMarkup = answers.map((article: ArticleConjugation, index: number) => {
        return (
            <QuizAnswer
                answer={article}
                isAnswered={isAnswered}
                key={index}
                answerSelected={answerSelected(article)}>
                {article.name}
            </QuizAnswer>
        );
    });

    return (
        <div className="question">
            <div className="answers">
                {answersMarkup}
            </div>
            {word.name}
        </div>
    );
}

export default QuizQuestion;
