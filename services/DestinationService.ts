import DefaultService from '~~/services/DefaultService';
import type { Destination } from '~~/types/entity/destination';
import type { CollectionResponse } from '~~/types/utils/response';

export default class DestinationsService extends DefaultService {
  readonly endpoint: string;

  constructor() {
    super();

    this.endpoint = `/api/destinations`;
  }

  async collection(params?: object) {
    const result: CollectionResponse<Destination> = await this.apiFetch(
      `${this.endpoint}`,
      {
        params,
      }
    );

    return result;
  }

  async item(id: string | string[]) {
    const result: Destination = await this.apiFetch(`${this.endpoint}/${id}`);
    return result;
  }

  async post(body: Destination) {
    const result: Destination = await this.apiFetch(`${this.endpoint}`, {
      method: 'POST',
      body: this.serialize(body),
    });
    return result;
  }

  async put(body: Destination) {
    const result: Destination = await this.apiFetch(`${this.endpoint}/${body.id}`, {
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
