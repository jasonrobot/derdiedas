import React, { useState } from 'react';
import { curry } from 'ramda';

import QuizQuestion from './QuizQuestion';

import {
    Case,
    Gender,
    Word,
    Article,
    getArticlesForCase,
    ArticleConjugation,
} from './prototype';

interface QuizProps {
    wordPack: Word[],
    article: Article,
    kasus: Case
}

const NEXT_QUESTION_DELAY = 1000;

const Quiz: React.FunctionComponent<QuizProps> = ({
    wordPack,
    article,
    kasus
}: QuizProps) => {

    const answerQuestion = curry(
        (index: number, answer: ArticleConjugation) => {
            const nextQuizState: QuizState = {
                currentQuestion,
                questions: [...questions],
            };
            nextQuizState.questions[index] = {
                ...questions[index],
                userAnswer: answer,
            };
            setQuizState(nextQuizState);
            setTimeout(() => {
                const nextQuestion = {
                    ...nextQuizState,
                    currentQuestion: currentQuestion + 1,
                };
                setQuizState(nextQuestion);
            }, NEXT_QUESTION_DELAY);
        }
    );

    const {
        word,
        userAnswer
    } = questions[currentQuestion];

    return React.createElement('div', { className: 'quiz' }, [
        QuizQuestion({
            key: word.name,
            answers: conjugations,
            questionAnswered: answerQuestion(currentQuestion),
            word,
            userAnswer,
        }),
        ...recentQuestions,
    ]);
}

export default Quiz;
