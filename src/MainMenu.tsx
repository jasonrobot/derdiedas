import React from 'react';

const MainMenu: React.FC = () => {
    return (
        <div className="main-menu">
            <div className="main-menu__article-selector">
                <select id="article" name="article">
                    <option value="definite">Definite (der)</option>
                    <option value="indefinite">Indefinite (ein)</option>
                </select>
            </div>
            <div className="main-menu__case-selector">
                <input name="case" type="radio" value="nominative" />
                Nom
                <input name="case" type="radio" value="accusative" />
                Acc
                <input name="case" type="radio" value="dative" />
                Dat
                <input name="case" type="radio" value="genative" />
                Gen
            </div>
            <div className="main-menu__word-pack-selector">

            </div>
            <div className="main-menu__start-test-button">
                <button id="start">Start</button>
            </div>
        </div>
    );
}

export default MainMenu;
