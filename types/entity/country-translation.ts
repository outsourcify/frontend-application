interface Translation {
  '@id': string;
  '@type': string;
  name: string;
}

function createTranslation(payload: Partial<Translation> = {}) {
  return {
    '@id': undefined,
    '@type': undefined,
    name: undefined,
    ...payload,
  };
}

export interface CountryTranslation {
  en: Translation;
  fr: Translation;
}

export function createCountryTranslation(
  payload: Partial<CountryTranslation> = {}
) {
  return {
    en: createTranslation(payload.en),
    fr: createTranslation(payload.fr),
    ...payload,
  };
}
