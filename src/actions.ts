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
    ActivateWords,
    AnswerQuestion,
    DeactivateWords,
    SetArticle,
    SetCase,
    WordListLoading,
    WordListError,
    WordListLoadSuccess,
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

// export function itemsFetchData(url) {
//     return (dispatch) => {
//         dispatch(itemsIsLoading(true));
//         fetch(url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }
//                 dispatch(itemsIsLoading(false));
//                 return response;
//             })
//             .then((response) => response.json())
//             .then((items) => dispatch(itemsFetchDataSuccess(items)))
//             .catch(() => dispatch(itemsHasErrored(true)));
//     };
// }

export async function fetchWordData(): Promise<WordPack[]> {
    const response = await fetch('http://localhost:8080/nouns3.json');
    if (!response.ok) {
        //TODO Should set state to some sort of error condition
        throw new Error(response.statusText);
    }
    const responseJson = await response.json();
    return responseJson.map((wordPack: [WordDefinition]) => {
        return wordPack.map((wordDef: WordDefinition) => makeWord(wordDef));
    });
}

// export const wordListFetch: ThunkAction<void, RootState, unknown, Action> =
export const wordListFetch: any =
    () => {
        return async (dispatch: any) => {
            dispatch(wordListLoading(true));

            try {
                const response = await fetch('http://localhost:8080/nouns3.json');
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
