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


// Given a case and an article definition, return the articles for all genders in that
// case. This will be used to display multiple choice questionson a quiz.
function getArticlesForCase(article: Article, forKasus: Case): ArticleConjugation[] {
    return article.filter(({ kasus }) => kasus === forKasus);
}

// This is literally just the === operator.
// Used to check whether an answer is correct or not.
// Maybe instead of just taking in (gender, gender), this should do some type
// interfacing or something
function checkGender({ gender: wordGender }: Word, articleGender: Gender): boolean {
    return wordGender === articleGender;
}

export {
    // aconj,
    getArticlesForCase,
    checkGender,
    // getArticles
};

