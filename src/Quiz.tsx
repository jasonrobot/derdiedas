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

interface QuizState {
    currentQuestion: number,
    questions: QuizQuestionState[]
};

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

    const [quizState, setQuizState] = React.useState(initialState);

    const answerQuestion = curry(
        (index: number, answer: ArticleConjugation) => {
            // console.log(`question: ${index} answered with ${Case[answer.kasus]} ${Gender[answer.gender]} ${answer.name}`);
            const newQuizState: QuizState = {
                currentQuestion: quizState.currentQuestion + 1,
                questions: [...quizState.questions],
            };
            newQuizState.questions[index] = {
                ...quizState.questions[index],
                userAnswer: answer,
            };
            setQuizState(newQuizState);
        }
    );

    if (quizState.currentQuestion < quizState.questions.length) {
        const {
            word,
            userAnswer
        } = quizState.questions[quizState.currentQuestion];

        return (
            <div className="quiz">
                <QuizQuestion
                    key={word.name}
                    word={word}
                    answers={conjugations}
                    userAnswer={userAnswer}
                    questionAnswered={answerQuestion(quizState.currentQuestion)}>
                </QuizQuestion>
            </div>
        );
    } else {
        const questions = () => {
            return quizState.questions.map(({ word, userAnswer }, index) => {

                return (
                    <QuizQuestion
                        key={word.name}
                        word={word}
                        answers={conjugations}
                        userAnswer={userAnswer}
                        questionAnswered={answerQuestion(index)}>
                    </QuizQuestion>
                );
            });
        };

        return (
            <div className="quiz">
                {questions()}

            </div>
        );
    }
}

export default Quiz;
