export interface Alergeno {
    ID:               string;
    AlergenosXIdioma: AlergenosXIdioma[];
}

export interface AlergenosXIdioma {
    IdIdioma:          number;
    DescipcionXIdioma: string;
}