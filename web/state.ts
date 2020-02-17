import {
    Gender,
    Word,
} from './prototype';

export type WordPack = Word[];

export type WordDefinition = [string, string];

export interface Words {
    active: Word[],
    inactive: Word[],
    recent: Word[],
}


export interface Question {
    word: Word,
    answer?: Gender,
}
