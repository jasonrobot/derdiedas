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
    const {
        currentQuestion,
        questions,
    }: QuizState = quizState;

    const answerQuestion = curry(
        (index: number, answer: ArticleConjugation) => {
            // console.log(`question: ${index} answered with ${Case[answer.kasus]} ${Gender[answer.gender]} ${answer.name}`);
            const newQuizState: QuizState = {
                currentQuestion: currentQuestion + 1,
                questions: [...questions],
            };
            newQuizState.questions[index] = {
                ...questions[index],
                userAnswer: answer,
            };
            setQuizState(newQuizState);
        }
    );

    if (currentQuestion < questions.length) {
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
    } else {
        const questionResults = () => {
            return questions.map(({ word, userAnswer }, index) => {

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
                {questionResults()}
            </div>
        );
    }
}

export default Quiz;
