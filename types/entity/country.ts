import type { CountryTranslation } from '~~/types/entity/country-translation';
import { createCountryTranslation } from '~~/types/entity/country-translation';

export interface Country {
  '@id': string;
  '@type': string;
  id: number;
  code: string;
  active?: boolean;
  translations: CountryTranslation;
}

export function createCountry(payload: Partial<Country> = {}) {
  return {
    '@id': undefined,
    '@type': undefined,
    id: undefined,
    code: undefined,
    active: false,
    translations: createCountryTranslation(payload.translations),
    ...payload,
  };
}