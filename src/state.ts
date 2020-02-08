import {
    makeWord,
    Case,
    Word,
    Article,
    DEFINITE
} from './prototype';

export type WordPack = Word[];

type WordDefinition = [string, string];

export async function fetchWordData(): Promise<WordPack[]> {
    const response = await fetch('http://localhost:8080/nouns3.json');
    if (!response.ok) {
        //TODO Should set state to some sort of error condition
        throw new Error(response.statusText);
    }
    const responseJson = await response.json();
    return responseJson.map((wordPack: [WordDefinition]) => {
        return wordPack.map((wordDef: WordDefinition) => makeWord(wordDef));
    });
}
