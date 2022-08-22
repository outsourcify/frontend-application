export interface CollectionResponse<T> {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': Array<T>;
  'hydra:search': any;
  'hydra:totalItems': number;
}

export interface ErrorResponse {
  '@context': string;
  '@type': string;
  'hydra:title': string;
  'hydra:description': string;
  title?: string;
  detail?: string;
  trace?: any;
}
