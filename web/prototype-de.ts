export enum Genus {
    Maskulin,
    Feminin,
    Neutrum,
    Plural,
}

export enum Kasus {
    Nominativ,
    Akkusativ,
    Dativ,
    Genitiv,
}

export interface Wort {
    wort: string,
    genus: Genus,
}
