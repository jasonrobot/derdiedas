import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
    pick,
} from 'ramda';

import {
    Article,
    Case,
} from './types';

import Articles from './Article';

import {
    setArticle,
    setCase,
} from './actions';

import {
    RootState
} from './index';

function mapStateToProps(state: RootState) {
    return pick(['article', 'kasus'], state);
}

function mapDispatchToProps(dispatch: any) {
    return {
        setArticle: (article: Article) => dispatch(setArticle(article)),
        setCase: (kasus: Case) => dispatch(setCase(kasus)),
    };
}

const connector = connect(
    mapStateToProps,
    mapDispatchToProps,
);

type Props = ConnectedProps<typeof connector>;

const MainMenu: React.FC<Props> = ({
    article,
    kasus,
    setArticle,
    setCase,
}) => {

    const articles: { [key: string]: Article } = {
        'definite': Articles.DEFINITE,
        'indefinite': Articles.INDEFINITE,
    };

    const handleChange = (event: any) => {
        setArticle(articles[event.target.value]);
    }

    const articleOptions = Object.keys(articles).map((article: string) => {
        return (
            <option value={article}>{article}</option >
        );
    });

    let currentArticle = 'definite';
    for (let key in articles) {
        if (articles[key] === article) {
            currentArticle = key;
        }
    }

    const caseOptions = Object.entries(Case)
        .filter(([_, x]) => typeof x === 'number')
        .map(([k, v]) => {
            return ([
                <input id={`case-${k}`} name="case" type="radio" value={v} checked={kasus === v} onChange={() => setCase(v as Case)} />,
                <label htmlFor={`case-${k}`}>{k}</label>
            ]);
        });

    return (
        <div className="main-menu">
            <div className="main-menu__article-selector">
                <select id="article" value={currentArticle} onChange={handleChange}>
                    {articleOptions}
                </select>
            </div>
            <div className="main-menu__case-selector">
                {caseOptions}
            </div>
            <div className="main-menu__word-pack-selector">
            </div>
        </div>
    );
}

export default connector(MainMenu);
