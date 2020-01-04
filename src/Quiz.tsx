import React from 'react';

import QuizQuestion from './QuizQuestion';

import {
    Case,
    Word,
    Article,
    aconj,
    getArticlesForCase,
    checkGender,
} from './prototype';

interface QuizProps {
    wordList: Word[],
    article: Article,
    kasus: Case
}

const Quiz: React.FunctionComponent<QuizProps> = ({
    wordList,
    article,
    kasus
}: QuizProps) => {
    const getArticles = (article: Article) => getArticlesForCase(kasus, article);
    const articles = getArticles(article);
    console.log(articles);
    const questions = wordList.map(({ word }) => {
        return (
            <QuizQuestion key={word} word={word} answers={articles}></QuizQuestion>
        );
    });

    return (
        <div>
            {questions}
        </div>
    );
}

export default Quiz;
