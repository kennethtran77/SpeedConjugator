export const tenses = {
    // Indicatif
    'PRESENT': { displayName: 'Présent Indicatif' },
    'PASSE_COMPOSE': { displayName: 'Passé Composé' },
    'IMPARFAIT': { displayName: 'Imparfait Indicatif' },
    'PASSE_SIMPLE': { displayName: 'Passé Simple' },
    'PLUS_QUE_PARFAIT': { displayName: 'Plus-Que-Parfait' },
    // Conditionnel
    'CONDITIONNEL_PRESENT': { displayName: 'Conditionnel Présent' },
    // Subjonctif
    'SUBJONCTIF_PRESENT': { displayName: 'Présent Subjonctif' },
    'SUBJONCTIF_IMPARFAIT': { displayName: 'Imparfait Subjonctif' },
    // Imperatif
    'IMPERATIF_PRESENT': { displayName: 'Présent Imperatif' },
};
  
// gender: 'A' - any, 'M' - male, 'F' - female
// number: 'A' - any, 'S' - single, 'P' - plural 
export const pronouns = {
    'je': {
        index: 0,
        gender: 'A',
        number: 'S'
    },
    'tu': {
        index: 1,
        gender: 'A',
        number: 'S'
    },
    'il': {
        index: 2,
        gender: 'M',
        number: 'S'
    },
    'elle': {
        index: 2,
        gender: 'F',
        number: 'S'
    },
    'on': {
        index: 2,
        gender: 'A',
        number: 'P'
    },
    'nous': {
        index: 3,
        gender: 'A',
        number: 'P'
    },
    'vous': {
        index: 4,
        gender: 'A',
        number: 'A'
    },
    'ils': {
        index: 5,
        gender: 'M',
        number: 'P'
    },
    'elles': {
        index: 5,
        gender: 'F',
        number: 'P'
    }
};

export const genders = ['M', 'F'];
export const numbers = ['S', 'P'];