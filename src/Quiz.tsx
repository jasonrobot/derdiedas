import React, { useState } from 'react';
import { connect } from 'react-redux';
import { pick } from 'ramda';

import QuizQuestion from './QuizQuestion';

import {
    Case,
    Gender,
    Word,
    Article,
    getArticlesForCase,
    ArticleConjugation,
} from './prototype';

import {
    answerQuestion,
} from './actions';

interface QuizProps {
    article: Article,
    kasus: Case,
    currentQuestion: Word,
}

const NEXT_QUESTION_DELAY = 1000;

// const mapStateToProps = pick(['article', 'kasus', 'currentQuestion']);

function mapStateToProps(state: any) {
    return {
        article: state.article,
        kasus: state.kasus,
        currentQuestion: state.currentQuestion,
    };
}


// function mapDispatchToProps(dispatch) {
//     return {
//         // ¯\_(ツ)_/¯
//     };
// }

const Quiz: React.FunctionComponent<QuizProps> = ({
    article,
    kasus,
    currentQuestion
}: QuizProps) => {

    const answers = getArticlesForCase(article, kasus);

    return React.createElement('div', { className: 'quiz' }, [
        QuizQuestion({
            key: currentQuestion.name,
            currentQuestion,
            answers
        }),
        // ...recentQuestions,
    ]);
}

export default connect(
    mapStateToProps,
    // mapDispatchToProps,
)(Quiz);
