import React, { useState, useEffect } from 'react';
import { curry } from 'ramda';

import QuizQuestion from './QuizQuestion';

import {
    Case,
    Word,
    Article,
    getArticlesForCase,
    ArticleConjugation,
    makeWord,
} from './prototype';

interface QuizProps {
    wordList: Word[],
    article: Article,
    kasus: Case
}

interface QuizQuestionState {
    word: Word,
    conjugations: ArticleConjugation[],
    userAnswer: ArticleConjugation | null
}

interface QuizState {
    currentQuestion: number,
    questions: QuizQuestionState[]
};

type WordData = [string, string][];

async function fetchWordData(): Promise<WordData> {
    const response = await fetch('http://localhost:8080/nouns3.json')
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json() as Promise<WordData>;
}

const NEXT_QUESTION_DELAY = 1500;

const Quiz: React.FunctionComponent<QuizProps> = ({
    wordList,
    article,
    kasus
}: QuizProps) => {
    const getArticles = (article: Article) => getArticlesForCase(kasus, article);

    const conjugations = getArticles(article);
    // TODO if there are two articles that are written the same, remove the
    // incorrect answer

    const initialState: QuizState = {
        currentQuestion: 0,
        questions: [
            ...wordList.map(word => {
                return {
                    userAnswer: null,
                    conjugations,
                    word,
                };
            }),
        ]
    };

    const [quizState, setQuizState] = useState(initialState);
    const {
        currentQuestion,
        questions,
    }: QuizState = quizState;

    useEffect(() => {
        fetchWordData().then((words) => {
            const questions = words.map(word => {
                return {
                    userAnswer: null,
                    word: makeWord(word),
                    conjugations
                };
            });
            setQuizState({
                currentQuestion: 0,
                questions
            });
        });
    }, []);

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

    return (
        <div className="quiz">
            <QuizQuestion
                key={word.name}
                word={word}
                answers={conjugations}
                userAnswer={userAnswer}
                questionAnswered={answerQuestion(currentQuestion)}>
            </QuizQuestion>
        </div>
    );

}

export default Quiz;
