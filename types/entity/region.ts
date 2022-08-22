import type { Country } from '~~/types/entity/country';
import type { RegionTranslation } from '~~/types/entity/region-translation';
import { createRegionTranslation } from '~~/types/entity/region-translation';

export interface Region {
  '@id': string;
  '@type': string;
  id: number;
  code: string;
  active: boolean;
  country: Country | string;
  translations: RegionTranslation;
}

export function createRegion(payload: Partial<Region> = {}) {
  return {
    '@id': undefined,
    '@type': undefined,
    id: undefined,
    code: undefined,
    active: false,
    country: undefined,
    translations: createRegionTranslation(payload.translations),
    ...payload,
  };
}
