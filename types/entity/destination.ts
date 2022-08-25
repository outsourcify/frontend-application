import type { Country } from '~~/types/entity/country';
import type { DestinationTranslation } from '~~/types/entity/destination-translation';
import { createDestinationTranslation } from '~~/types/entity/destination-translation';

export interface Destination {
  '@id': string;
  '@type': string;
  id: number;
  code: string;
  active: boolean;
  country: Country | string;
  translations: DestinationTranslation;
}

export function createDestination(payload: Partial<Destination> = {}) {
  return {
    '@id': undefined,
    '@type': undefined,
    id: undefined,
    code: undefined,
    active: false,
    country: undefined,
    translations: createDestinationTranslation(payload.translations),
    ...payload,
  };
}