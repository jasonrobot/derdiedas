import {
    always,
    append,
    drop,
    cond,
    difference,
    equals,
    T,
} from 'ramda';

import {
    Case,
    Gender,
    Article,
    DEFINITE,
    Word,
    FRAU,
    AUTO,
} from './prototype';

import {
    Action,
    ActionType,
} from './actions';

export interface Question {
    word: Word,
    answer?: Gender,
}

export const wordListLoading = (state: boolean = false, action: Action) =>
    cond<ActionType, boolean>([
        [
            equals<ActionType>(ActionType.WordListLoading),
            always(action.payload as boolean)
        ],
        [T, always(state)],
    ])(action.type);

export const wordListError = (state: boolean = false, action: Action) =>
    cond<ActionType, boolean>([
        [
            equals<ActionType>(ActionType.WordListError),
            always(action.payload as boolean)
        ],
        [T, always(state)],
    ])(action.type);

// export const wordList = (state: WordPack[] = [[]], action: Action) =>
//     cond<ActionType, WordPack[]>([
//         [
//             equals<ActionType>(ActionType.WordListLoadSuccess),
//             always(action.payload as WordPack[])
//         ],
//         [T, always(state)],
//     ])(action.type);

export const article = (state: Article = DEFINITE, action: Action): Article =>
    cond<ActionType, Article>([
        [
            equals<ActionType>(ActionType.SetArticle),
            always(action.payload as Article)
        ],
        [T, always(state)]
    ])(action.type);

export const kasus = (state: Case = Case.Nominative, action: Action): Case =>
    cond<ActionType, Case>([
        [
            equals<ActionType>(ActionType.SetCase),
            always(action.payload as Case)
        ],
        [T, always(state)]
    ])(action.type);

interface Words {
    active: Word[],
    inactive: Word[],
}

const defaultWords: Words = {
    active: [],
    inactive: [],
}
export const words = ({ active, inactive }: Words = defaultWords, { payload, type }: Action) =>
    cond<ActionType, Words>([
        [equals<ActionType>(ActionType.DeactivateWords),
        () => {
            console.log(ActionType.DeactivateWords, type);
            return {
                active: difference(active, payload),
                inactive: inactive.concat(payload)
            }
        }],
        [equals<ActionType>(ActionType.ActivateWords),
        () => {
            return {
                active: active.concat(payload),
                inactive: difference(inactive, payload),
            };
        }],
        [equals<ActionType>(ActionType.AnswerQuestion),
        () => {
            const answeredQuestion: Word = {
                ...active[0],
                answer: payload
            };
            return {
                active: append(answeredQuestion, drop(1, active)),
                inactive,
            };
        }],
        [T, always({ active: [FRAU, AUTO], inactive })]
    ])(type)

// export const question = (state: number = 0, action: Action) =>
//     cond<ActionType, number>([
//         [
//             equals<ActionType>(ActionType.AnswerQuestion),
//             always(action.payload as number)
//         ],
//         [T, always(state)]
//     ])(action.type);
