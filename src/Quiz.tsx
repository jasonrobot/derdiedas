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
        recentQuestions: state.words.recent,
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
    recentQuestions,
}: Props) => {

    const currentQuestion = questions[0];

    const recents = recentQuestions.map((rq, idx) => {
        const props = {
            word: rq,
            key: `recent-${idx}-${rq.name}`,
        };
        return (
            <QuizQuestion {...props} />
        );
    });

    const currentQuestionProps = {
        word: currentQuestion,
        key: 'current',
    }

    return (
        <div className="quiz">
            <QuizQuestion {...currentQuestionProps} />
            <div className="recent-questions">
                Recent Questions:
                {...recents}
            </div>
        </div>
    );

}
export default connector(Quiz);
