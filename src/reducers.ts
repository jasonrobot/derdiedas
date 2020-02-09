import {
    always,
    append,
    drop,
    cond,
    difference,
    equals,
    T,
    take,
} from 'ramda';

import {
    Case,
    Article,
    DEFINITE,
    Word,
} from './prototype';

import {
    Action,
    ActionType,
} from './actions';

import {
    Words,
} from './state';

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

const defaultWords: Words = {
    active: [],
    inactive: [],
    recent: [],
}

export const words = (
    {
        active,
        inactive,
        recent,
    }: Words = defaultWords,
    {
        payload,
        type
    }: Action
) =>
    cond<ActionType, Words>([
        [equals<ActionType>(ActionType.DeactivateWords),
        () => {
            return {
                active: difference(active, payload),
                inactive: inactive.concat(payload),
                recent,
            }
        }],
        [equals<ActionType>(ActionType.ActivateWords),
        () => {
            return {
                active: active.concat(payload),
                inactive: difference(inactive, payload),
                recent,
            };
        }],
        [equals<ActionType>(ActionType.AnswerQuestion),
        () => {
            const answeredQuestion: Word = {
                ...active[0],
                answer: payload,
            };
            return {
                active: append(answeredQuestion, drop(1, active)),
                inactive,
                // recent: take(5, append({ ...answeredQuestion }, recent)),
                recent: [{ ...answeredQuestion }, ...recent].slice(0, 5)
            };
        }],
        [T, always({ active, inactive, recent })]
    ])(type)
