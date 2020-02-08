import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import QuizQuestion from './QuizQuestion';

import {
    getArticlesForCase,
} from './prototype';

import {
    RootState
} from './index';

function mapStateToProps(state: RootState) {
    return {
        article: state.article,
        kasus: state.kasus,
        questions: state.words.active,
    };
}

const connector = connect(
    mapStateToProps,
    // mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux { }

const NEXT_QUESTION_DELAY = 1000;

const Quiz: React.FunctionComponent<Props> = ({
    article,
    kasus,
    questions,
}: Props) => {

    const answers = getArticlesForCase(article, kasus);

    const currentQuestion = questions[0];

    // return React.createElement('div', { className: 'quiz' }, [
    //     QuizQuestion({
    //         key: currentQuestion.name,
    //     }),
    //     // ...recentQuestions,
    // ]);

    return (
        <div className="quiz">
            <QuizQuestion key={currentQuestion.name} />
        </div>
    );
}

export default connector(Quiz);
