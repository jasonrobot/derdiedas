import React from 'react';
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
    wordList: Word[],
    article: Article,
    kasus: Case
}

interface QuizQuestionState {
    word: Word,
    conjugations: ArticleConjugation[],
    userAnswer: ArticleConjugation | null
}

type QuizState = QuizQuestionState[];

const Quiz: React.FunctionComponent<QuizProps> = ({
    wordList,
    article,
    kasus
}: QuizProps) => {
    const getArticles = (article: Article) => getArticlesForCase(kasus, article);

    const conjugations = getArticles(article);
    // TODO if there are two articles that are written the same, remove the
    // incorrect answer

    const initialState: QuizState = wordList.map(word => {
        return {
            userAnswer: null,
            conjugations,
            word,
        };
    });

    const [quizState, setQuizState] = React.useState(initialState);

    const answerQuestion = curry(
        (index: number, answer: ArticleConjugation) => {
            // console.log(`question: ${index} answered with ${Case[answer.kasus]} ${Gender[answer.gender]} ${answer.name}`);
            quizState[index] = {
                ...quizState[index],
                userAnswer: answer,
            };
            setQuizState(quizState);
        }
    );

    const questions = quizState.map(({ word }, index) => {
        return (
            <QuizQuestion
                key={index}
                word={word}
                answers={conjugations}
                questionAnswered={answerQuestion(index)}>
            </QuizQuestion>
        );
    });



    return (
        <div className="quiz">
            {questions}

        </div>
    );
}

export default Quiz;
