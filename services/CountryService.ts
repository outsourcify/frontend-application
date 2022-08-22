import DefaultService from '~~/services/DefaultService';
import type { Country } from '~~/types/entity/country';
import type { CollectionResponse } from '~~/types/utils/response';

export default class CountryService extends DefaultService {
  readonly endpoint: string;

  constructor() {
    super();

    this.endpoint = `/api/countries`;
  }

  async collection(params?: object) {
    const result: CollectionResponse<Country> = await this.apiFetch(
      `${this.endpoint}`,
      {
        params,
      }
    );
    return result;
  }

  async item(id: string | string[]) {
    const result: Country = await this.apiFetch(`${this.endpoint}/${id}`);
    return result;
  }

  async post(body: Country) {
    const result: Country = await this.apiFetch(`${this.endpoint}`, {
      method: 'POST',
      body: this.serialize(body),
    });
    return result;
  }

  async put(body: Country) {
    const result: Country = await this.apiFetch(`${this.endpoint}/${body.id}`, {
      method: 'PUT',
      body: this.serialize(body),
    });
    return result;
  }

  async delete(id: number) {
    const result = await this.apiFetch(`${this.endpoint}/${id}`, {
      method: 'DELETE',
    });
    return result;
  }
}
