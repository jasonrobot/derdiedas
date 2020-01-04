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

// type Article = Record<Gender, Record<Case, string>>;

export type ArticleDef = [
    [string, string, string, string],
    [string, string, string, string],
    [string, string, string, string],
    [string, string, string, string],
];

export interface ArticleConjugation {
    gender: Gender,
    kasus: Case,
    word: string
}

// export type Article = ArticleConjugation[];

interface ArticleForCase {
    readonly [Case.Nominative]: string,
    readonly [Case.Accusative]: string,
    readonly [Case.Dative]: string,
    readonly [Case.Genative]: string,
}

// interface ArticleForCase {
//     readonly [key: Case]: string
// }

export interface Article {
    readonly [Gender.Masculine]: ArticleForCase
    readonly [Gender.Feminine]: ArticleForCase,
    readonly [Gender.Neuter]: ArticleForCase,
    readonly [Gender.Plural]: ArticleForCase,
}

// Given a block of article def strings, create individial article conjugation
// definitions.
export function makeArticle([
    [mn, ma, md, mg],
    [fn, fa, fd, fg],
    [nn, na, nd, ng],
    [pn, pa, pd, pg]
]: ArticleDef): Article {
    {
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
}

export const DEFINITE: Article = makeArticle([
    ['der', 'den', 'dem', 'des'],
    ['die', 'die', 'der', 'der'],
    ['das', 'das', 'dem', 'des'],
    ['die', 'die', 'den', 'der'],
]);

export const INDEFINITE: Article = makeArticle([
    ['ein', 'einen', 'einem', 'eines'],
    ['eine', 'eine', 'einer', 'einer'],
    ['ein', 'ein', 'einem', 'eines'],
    ['-eine', '-eine', '-einen', '-einer']
]);

// function conjugate(word: Article, gender: Gender, c: Case): string {
//     return word[gender][c];
// }

// conjugate(INDEFINITE, Gender.Neuter, Case.Dative);

export const AUTO: Word = {
    word: 'Auto',
    gender: Gender.Neuter,
}

export const FRAU: Word = {
    word: 'Frau',
    gender: Gender.Feminine,
}

// export function conjugateWord({ word, gender }: Word, kasus: Case): string {
//     const conjugatedArticle = conjugate(DEFINITE, gender, kasus);
//     return `${Case[kasus]}: ${conjugatedArticle} ${word} (${Gender[gender]})`;
//     // return conjugatedArticle;
// }

// console.log(conjugateWord(frau, Case.Dative));

function aconj(gender: Gender, kasus: Case, article: Article): string {
    return article[gender][kasus];
}


// Given a case and an article definition, return the articles for all genders in that
// case. This will be used to display multiple choice questionson a quiz.
function getArticlesForCase(kasus: Case, article: Article): ArticleConjugation[] {
    return Object.values(article).map(({ [kasus]: kasusOfGender }) => kasusOfGender);
}

// This is literally just the === operator.
// Used to check whether an answer is correct or not.
// Maybe instead of just taking in (gender, gender), this should do some type
// interfacing or something
function checkGender({ gender: wordGender }: Word, articleGender: Gender): boolean {
    return wordGender === articleGender;
}

// Given a word('s gender) and a case, get the article for it. This is used to show
// what the correct answer was in case you were wrong.
// function getArticles(article: ArticleDef, kasus: Case, { gender }: Word): string {
//     return aconj(gender, kasus, article); // It's just aconj...
// }

export {
    aconj,
    getArticlesForCase,
    checkGender,
    // getArticles
};

