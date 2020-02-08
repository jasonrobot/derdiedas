import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import QuizQuestion from './QuizQuestion';

import {
    getArticlesForCase,
} from './prototype';

function mapStateToProps(state: any) {
    return {
        article: state.article,
        kasus: state.kasus,
        questions: state.words.active
    };
}

const connector = connect(
    mapStateToProps,
    // mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
}

const NEXT_QUESTION_DELAY = 1000;

const Quiz: React.FunctionComponent<Props> = ({
    article,
    kasus,
    questions,
}: Props) => {

    const answers = getArticlesForCase(article, kasus);

    const currentQuestion = questions[0];

    return React.createElement('div', { className: 'quiz' }, [

        QuizQuestion({
            key: currentQuestion.name,
            currentQuestion,
            answers
        }),
        // ...recentQuestions,
    ]);
}

export default connector(Quiz);
