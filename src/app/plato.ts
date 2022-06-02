export interface Plato {
    item:        string;
    description: string;
    type:        Type;
    allergens:   Allergen[];
    tpv:         Tpv | null;
}

export interface Tpv {
    codigo:      string;
    descripcion: string;
}

export interface Allergen {
    alergenoEs: AlergenoEs;
    alergenoEn: AlergenoEn;
    alergenoDe: AlergenoDe;
}

export enum AlergenoDe {
    Eier = "Eier",
    Erdnüsse = "Erdnüsse",
    Fisch = "Fisch",
    Gluten = "Gluten",
    Lupinenkerne = "Lupinenkerne",
    Milch = "Milch",
    Schalenfrüchte = "Schalenfrüchte",
    Schalentiere = "Schalentiere",
    SchwefelhaltigesAnhydrid = "Schwefelhaltiges Anhydrid",
    Sellerie = "Sellerie",
    Senf = "Senf",
    Sesam = "Sesam",
    Soja = "Soja",
    Weichtiere = "Weichtiere",
}

export enum AlergenoEn {
    Celery = "Celery",
    Crustaceans = "Crustaceans",
    Eggs = "Eggs",
    Fish = "Fish",
    Gluten = "Gluten",
    Lupins = "Lupins",
    Milk = "Milk",
    Molluscs = "Molluscs",
    Mustard = "Mustard",
    Nuts = "Nuts",
    Peanuts = "Peanuts",
    Sesame = "Sesame",
    Soya = "Soya",
    SulphurDioxide = "Sulphur dioxide",
}


export enum AlergenoEs {
  Altramuces = "Altramuces",
  AnhídridoSulfuroso = "Anhídrido sulfuroso",
  Apio = "Apio",
  Cacahuetes = "Cacahuetes",
  Crustáceos = "Crustáceos",
  FrutosDeCáscara = "Frutos de cáscara",
  Gluten = "Gluten",
  Huevos = "Huevos",
  Leche = "Leche",
  Moluscos = "Moluscos",
  Mostaza = "Mostaza",
  Pescado = "Pescado",
  Soja = "Soja",
  Sésamo = "Sésamo",
}

export enum Type {
    Carta = "CARTA",
    Menu = "MENU",
}
