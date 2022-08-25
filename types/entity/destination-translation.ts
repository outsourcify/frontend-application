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
  
  export interface DestinationTranslation {
    en: Translation;
    fr: Translation;
  }
  
  export function createDestinationTranslation(
    payload: Partial<DestinationTranslation> = {}
  ) {
    return {
      en: createTranslation(payload.en),
      fr: createTranslation(payload.fr),
      ...payload,
    };
  }
  