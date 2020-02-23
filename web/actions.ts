import {
    ThunkAction,
} from 'redux-thunk';

import {
    makeWord,
    Article,
    Case,
    Gender,
    Word,
} from './prototype';

import {
    WordPack,
    WordDefinition,
} from './state';

import {
    RootState,
} from './index';

export enum ActionType {
    ActivateWords = 'ActivateWords',
    AnswerQuestion = 'AnswerQuestion',
    DeactivateWords = 'DeactivateWords',
    SetArticle = 'SetArticle',
    SetCase = 'SetCase',
    WordListLoading = 'WordListLoading',
    WordListError = 'WordListError',
    WordListLoadSuccess = 'WordListLoadSuccess',
};

// FIXME NO ANY
export interface Action {
    type: ActionType,
    payload: any,
}

export function setArticle(article: Article) {
    return {
        type: ActionType.SetArticle,
        payload: article,
    };
}

export function setCase(kasus: Case) {
    return {
        type: ActionType.SetCase,
        payload: kasus,
    };
}

export function answerQuestion(answer: Gender) {
    return {
        type: ActionType.AnswerQuestion,
        payload: answer
    }
}

// export const wordListFetch: ThunkAction<void, RootState, unknown, Action> =
export const wordListFetch: any =
    () => {
        return async (dispatch: any) => {
            dispatch(wordListLoading(true));

            try {
                const response = await fetch('/nouns3.json');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                dispatch(wordListLoading(false));
                const responseJson = await response.json();
                const items = responseJson.map((wordPack: [WordDefinition]) => {
                    return wordPack.map((wordDef: WordDefinition) => makeWord(wordDef));
                });

                dispatch(wordListLoadSuccess(items));
            } catch {
                dispatch(wordListError(true));
            }
        }
    };

export function wordListError(bool: boolean) {
    return {
        type: ActionType.WordListError,
        payload: bool
    };
}

export function wordListLoading(bool: boolean) {
    return {
        type: ActionType.WordListLoading,
        payload: bool
    };
}

export function wordListLoadSuccess(items: Word[][]) {
    return {
        type: ActionType.WordListLoadSuccess,
        payload: items
    };
}

export function activateWords(words: Word[]) {
    return {
        type: ActionType.ActivateWords,
        payload: words,
    };
}

export function deactivateWords(words: Word[]) {
    return {
        type: ActionType.DeactivateWords,
        payload: words,
    };
}
