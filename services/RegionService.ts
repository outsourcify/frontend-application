import DefaultService from '~~/services/DefaultService';
import type { Region } from '~~/types/entity/region';
import type { CollectionResponse } from '~~/types/utils/response';

export default class RegionService extends DefaultService {
  readonly endpoint: string;

  constructor() {
    super();

    this.endpoint = `/api/regions`;
  }

  async collection(params?: object) {
    const result: CollectionResponse<Region> = await this.apiFetch(
      `${this.endpoint}`,
      {
        params,
      }
    );
    return result;
  }

  async item(id: string | string[]) {
    const result: Region = await this.apiFetch(`${this.endpoint}/${id}`);
    return result;
  }

  async post(body: Region) {
    const result: Region = await this.apiFetch(`${this.endpoint}`, {
      method: 'POST',
      body: this.serialize(body),
    });
    return result;
  }

  async put(body: Region) {
    const result: Region = await this.apiFetch(`${this.endpoint}/${body.id}`, {
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
