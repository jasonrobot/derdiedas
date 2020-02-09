import {
    equals,
    filter,
} from 'ramda';

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
    name: string,
    gender: Gender,
    answer?: Gender,
}

function strToGender(gender: string): Gender {
    if (gender == 'm') return Gender.Masculine;
    if (gender == 'f') return Gender.Feminine;
    return Gender.Neuter;
}

export function makeWord([name, gender]: [string, string]): Word {
    return {
        gender: strToGender(gender),
        name
    };
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
    name: string
}

export type Article = ArticleConjugation[];

// interface ArticleForCase {
//     readonly [Case.Nominative]: ArticleConjugation,
//     readonly [Case.Accusative]: ArticleConjugation,
//     readonly [Case.Dative]: ArticleConjugation,
//     readonly [Case.Genative]: ArticleConjugation,
// }

// interface ArticleForCase {
//     readonly [key: Case]: string
// }

// export interface Article {
//     readonly [Gender.Masculine]: ArticleForCase
//     readonly [Gender.Feminine]: ArticleForCase,
//     readonly [Gender.Neuter]: ArticleForCase,
//     readonly [Gender.Plural]: ArticleForCase,
// }

// Given a block of article def strings, create individial article conjugation
// definitions.
// export function makeArticle([
//     [mn, ma, md, mg],
//     [fn, fa, fd, fg],
//     [nn, na, nd, ng],
//     [pn, pa, pd, pg]
// ]: ArticleDef): Article {
//     {
//         return {
//             [Gender.Masculine]: {
//                 [Case.Nominative]: {
//                     gender: Gender.Masculine,
//                     kasus: Case.Nominative,
//                     name: mn
//                 },
//                 [Case.Accusative]: {
//                     gender: Gender.Masculine,
//                     kasus: Case.Accusative,
//                     name: ma
//                 },
//                 [Case.Dative]: {
//                     gender: Gender.Masculine,
//                     kasus: Case.Dative,
//                     name: md
//                 },
//                 [Case.Genative]: {
//                     gender: Gender.Masculine,
//                     kasus: Case.Genative,
//                     name: mg
//                 },
//             },
//             [Gender.Feminine]: {
//                 [Case.Nominative]: {
//                     gender: Gender.Feminine,
//                     kasus: Case.Nominative,
//                     name: fn
//                 },
//                 [Case.Accusative]: {
//                     gender: Gender.Feminine,
//                     kasus: Case.Accusative,
//                     name: fa
//                 },
//                 [Case.Dative]: {
//                     gender: Gender.Feminine,
//                     kasus: Case.Dative,
//                     name: fd
//                 },
//                 [Case.Genative]: {
//                     gender: Gender.Feminine,
//                     kasus: Case.Genative,
//                     name: fg
//                 },
//             },
//             [Gender.Neuter]: {
//                 [Case.Nominative]: {
//                     gender: Gender.Neuter,
//                     kasus: Case.Nominative,
//                     name: nn
//                 },
//                 [Case.Accusative]: {
//                     gender: Gender.Neuter,
//                     kasus: Case.Accusative,
//                     name: na
//                 },
//                 [Case.Dative]: {
//                     gender: Gender.Neuter,
//                     kasus: Case.Dative,
//                     name: nd
//                 },
//                 [Case.Genative]: {
//                     gender: Gender.Neuter,
//                     kasus: Case.Genative,
//                     name: ng
//                 },
//             },
//             [Gender.Plural]: {
//                 [Case.Nominative]: {
//                     gender: Gender.Plural,
//                     kasus: Case.Nominative,
//                     name: pn
//                 },
//                 [Case.Accusative]: {
//                     gender: Gender.Plural,
//                     kasus: Case.Accusative,
//                     name: pa
//                 },
//                 [Case.Dative]: {
//                     gender: Gender.Plural,
//                     kasus: Case.Dative,
//                     name: pd
//                 },
//                 [Case.Genative]: {
//                     gender: Gender.Plural,
//                     kasus: Case.Genative,
//                     name: pg
//                 },
//             }
//         }
//     }
// }

export function makeArticle([
    [mn, ma, md, mg],
    [fn, fa, fd, fg],
    [nn, na, nd, ng],
    [pn, pa, pd, pg]
]: ArticleDef): Article {
    return [{
        gender: Gender.Masculine,
        kasus: Case.Nominative,
        name: mn
    }, {
        gender: Gender.Masculine,
        kasus: Case.Accusative,
        name: ma
    }, {
        gender: Gender.Masculine,
        kasus: Case.Dative,
        name: md
    }, {
        gender: Gender.Masculine,
        kasus: Case.Genative,
        name: mg
    }, {
        gender: Gender.Feminine,
        kasus: Case.Nominative,
        name: fn
    }, {
        gender: Gender.Feminine,
        kasus: Case.Accusative,
        name: fa
    }, {
        gender: Gender.Feminine,
        kasus: Case.Dative,
        name: fd
    }, {
        gender: Gender.Feminine,
        kasus: Case.Genative,
        name: fg
    }, {
        gender: Gender.Neuter,
        kasus: Case.Nominative,
        name: nn
    }, {
        gender: Gender.Neuter,
        kasus: Case.Accusative,
        name: na
    }, {
        gender: Gender.Neuter,
        kasus: Case.Dative,
        name: nd
    }, {
        gender: Gender.Neuter,
        kasus: Case.Genative,
        name: ng
    }, {
        gender: Gender.Plural,
        kasus: Case.Nominative,
        name: pn
    }, {
        gender: Gender.Plural,
        kasus: Case.Accusative,
        name: pa
    }, {
        gender: Gender.Plural,
        kasus: Case.Dative,
        name: pd
    }, {
        gender: Gender.Plural,
        kasus: Case.Genative,
        name: pg
    }];
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

// export function conjugateWord({ word, gender }: Word, kasus: Case): string {
//     const conjugatedArticle = conjugate(DEFINITE, gender, kasus);
//     return `${Case[kasus]}: ${conjugatedArticle} ${word} (${Gender[gender]})`;
//     // return conjugatedArticle;
// }

// function aconj(gender: Gender, kasus: Case, article: Article): string {
//     return article[gender][kasus];
// }


// Given a case and an article definition, return the articles for all genders in that
// case. This will be used to display multiple choice questionson a quiz.
function getArticlesForCase(article: Article, forKasus: Case): ArticleConjugation[] {
    return article.filter(({ kasus }) => kasus === forKasus);
}

function getArticlesForGender(article: Article, forGender: Gender): ArticleConjugation[] {
    return article.filter(({ gender }) => gender === forGender);
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
    // aconj,
    getArticlesForCase,
    checkGender,
    // getArticles
};

