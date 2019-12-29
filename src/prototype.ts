export enum Gender {
    Masculine,
    Feminine,
    Neuter,
    Plural,
};

export enum Case {
    Nominative,
    Accusative,
    Dative,
    Genative,
}

export interface Word {
    word: string,
    gender: Gender,
}

type Article = Record<Gender, Record<Case, string>>;

type ArticleDef = [
    [string, string, string, string],
    [string, string, string, string],
    [string, string, string, string],
    [string, string, string, string],
];

function makeArticle([
    [mn, ma, md, mg],
    [fn, fa, fd, fg],
    [nn, na, nd, ng],
    [pn, pa, pd, pg]
]: ArticleDef): Article {
    return {
        [Gender.Masculine]: {
            [Case.Nominative]: mn,
            [Case.Accusative]: ma,
            [Case.Dative]: md,
            [Case.Genative]: mg,
        },
        [Gender.Feminine]: {
            [Case.Nominative]: fn,
            [Case.Accusative]: fa,
            [Case.Dative]: fd,
            [Case.Genative]: fg,
        },
        [Gender.Neuter]: {
            [Case.Nominative]: nn,
            [Case.Accusative]: na,
            [Case.Dative]: nd,
            [Case.Genative]: ng,
        },
        [Gender.Plural]: {
            [Case.Nominative]: pn,
            [Case.Accusative]: pa,
            [Case.Dative]: pd,
            [Case.Genative]: pg,
        }
    }
}

const DEFINITE: Article = makeArticle([
    ['der', 'den', 'dem', 'des'],
    ['die', 'die', 'der', 'der'],
    ['das', 'das', 'dem', 'des'],
    ['die', 'die', 'den', 'der'],
]);

const INDEFINITE: Article = makeArticle([
    ['ein', 'einen', 'einem', 'eines'],
    ['eine', 'eine', 'einer', 'einer'],
    ['ein', 'ein', 'einem', 'eines'],
    ['-eine', '-eine', '-einen', '-einer']
]);

function conjugate(word: Article, gender: Gender, c: Case): string {
    return word[gender][c];
}

// conjugate(INDEFINITE, Gender.Neuter, Case.Dative);

export const car: Word = {
    word: 'Auto',
    gender: Gender.Neuter,
}

export const frau: Word = {
    word: 'Frau',
    gender: Gender.Feminine,
}

export function conjugateWord({ word, gender }: Word, kasus: Case): string {
    const conjugatedArticle = conjugate(DEFINITE, gender, kasus);
    return `${Case[kasus]}: ${conjugatedArticle} ${word} (${Gender[gender]})`;
    // return conjugatedArticle;
}

// console.log(conjugateWord(frau, Case.Dative));
