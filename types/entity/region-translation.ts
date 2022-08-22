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

export interface RegionTranslation {
  en: Translation;
  fr: Translation;
}

export function createRegionTranslation(
  payload: Partial<RegionTranslation> = {}
) {
  return {
    en: createTranslation(payload.en),
    fr: createTranslation(payload.fr),
    ...payload,
  };
}
