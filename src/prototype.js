"use strict";
exports.__esModule = true;
var Gender;
(function (Gender) {
    Gender[Gender["Masculine"] = 0] = "Masculine";
    Gender[Gender["Feminine"] = 1] = "Feminine";
    Gender[Gender["Neuter"] = 2] = "Neuter";
    Gender[Gender["Plural"] = 3] = "Plural";
})(Gender = exports.Gender || (exports.Gender = {}));
;
var Case;
(function (Case) {
    Case[Case["Nominative"] = 0] = "Nominative";
    Case[Case["Accusative"] = 1] = "Accusative";
    Case[Case["Dative"] = 2] = "Dative";
    Case[Case["Genative"] = 3] = "Genative";
})(Case = exports.Case || (exports.Case = {}));
function makeArticle(_a) {
    var _b, _c, _d, _e, _f;
    var _g = _a[0], mn = _g[0], ma = _g[1], md = _g[2], mg = _g[3], _h = _a[1], fn = _h[0], fa = _h[1], fd = _h[2], fg = _h[3], _j = _a[2], nn = _j[0], na = _j[1], nd = _j[2], ng = _j[3], _k = _a[3], pn = _k[0], pa = _k[1], pd = _k[2], pg = _k[3];
    return _b = {},
        _b[Gender.Masculine] = (_c = {},
            _c[Case.Nominative] = mn,
            _c[Case.Accusative] = ma,
            _c[Case.Dative] = md,
            _c[Case.Genative] = mg,
            _c),
        _b[Gender.Feminine] = (_d = {},
            _d[Case.Nominative] = fn,
            _d[Case.Accusative] = fa,
            _d[Case.Dative] = fd,
            _d[Case.Genative] = fg,
            _d),
        _b[Gender.Neuter] = (_e = {},
            _e[Case.Nominative] = nn,
            _e[Case.Accusative] = na,
            _e[Case.Dative] = nd,
            _e[Case.Genative] = ng,
            _e),
        _b[Gender.Plural] = (_f = {},
            _f[Case.Nominative] = pn,
            _f[Case.Accusative] = pa,
            _f[Case.Dative] = pd,
            _f[Case.Genative] = pg,
            _f),
        _b;
}
var DEFINITE = makeArticle([
    ['der', 'den', 'dem', 'des'],
    ['die', 'die', 'der', 'der'],
    ['das', 'das', 'dem', 'des'],
    ['die', 'die', 'den', 'der'],
]);
var INDEFINITE = makeArticle([
    ['ein', 'einen', 'einem', 'eines'],
    ['eine', 'eine', 'einer', 'einer'],
    ['ein', 'ein', 'einem', 'eines'],
    ['-eine', '-eine', '-einen', '-einer']
]);
function conjugate(word, gender, c) {
    return word[gender][c];
}
// conjugate(INDEFINITE, Gender.Neuter, Case.Dative);
exports.car = {
    word: 'Auto',
    gender: Gender.Neuter
};
exports.frau = {
    word: 'Frau',
    gender: Gender.Feminine
};
function conjugateWord(_a, kasus) {
    var word = _a.word, gender = _a.gender;
    var conjugatedArticle = conjugate(DEFINITE, gender, kasus);
    return Case[kasus] + ": " + conjugatedArticle + " " + word + " (" + Gender[gender] + ")";
}
exports.conjugateWord = conjugateWord;
// console.log(conjugateWord(frau, Case.Dative));
