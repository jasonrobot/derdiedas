import {
    always,
    cond,
    difference,
    equals,
    move,
    T,
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
        [equals<ActionType>(ActionType.WordListLoadSuccess),
        () => {
            return {
                active: payload[0],
                inactive,
                recent,
            };
        }],
        [equals<ActionType>(ActionType.AnswerQuestion),
        () => {
            const answeredQuestion: Word = {
                ...active[0],
                answer: payload,
            };
            const halfLength = Math.floor(active.length / 2);
            const next = Math.floor((Math.random() * halfLength)) + halfLength;
            return {
                // active: append(answeredQuestion, drop(1, active)),
                active: move(next, 0, active),
                // recent: take(5, append({ ...answeredQuestion }, recent)),
                recent: [{ ...answeredQuestion }, ...recent].slice(0, 10),
                inactive,
            };
        }],
        [T, always({ active, inactive, recent })]
    ])(type)
