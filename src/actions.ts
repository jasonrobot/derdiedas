import {
    Article,
    Case,
    Gender,
    Word,
} from './prototype';

import {
    WordPack,
} from './state';

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

export function wordListFetch(url: string) {
    return async (dispatch: any) => {
        dispatch(wordListLoading(true))

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(wordListLoading(false));
            const items = await response.json();
            dispatch(wordListLoadSuccess(items));
        } catch {
            dispatch(wordListError(true));
        }
    }
}

export function wordListError(bool: boolean) {
    return {
        type: ActionType.WordListError,
        hasErrored: bool
    };
}

export function wordListLoading(bool: boolean) {
    return {
        type: ActionType.WordListLoading,
        isLoading: bool
    };
}

export function wordListLoadSuccess(items: Word[][]) {
    return {
        type: ActionType.WordListLoadSuccess,
        items
    };
}

export function activateWords(words: Word[]) {
    return {
        type: ActionType.ActivateWords,
        words,
    };
}

export function deactivateWords(words: Word[]) {
    return {
        type: ActionType.DeactivateWords,
        words,
    };
}
