import _ from 'lodash';
import { $fetch } from 'ohmyfetch';

export default class DefaultService {
  protected apiFetch;

  constructor() {
    const config = useRuntimeConfig();
    const userToken = useCookie('auth.user_token', {
      maxAge: 7200,
      sameSite: 'lax',
    });

    this.apiFetch = $fetch.create({
      baseURL: config.public.apiBase || 'http://127.0.0.1:8000',
      retry: 2,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en',
      },
      async onRequest({ request, options }) {
        if (userToken.value) {
          options.headers['Authorization'] = `Bearer ${userToken.value}`;
        }
      },
    });
  }

  public serialize(body: any) {
    const data = {
      ...body,
      translations: body.translations
        ? _.forIn(body.translations, (value, key) => {
            value.locale = key;
          })
        : undefined,

      // TODO: should auto added by backend with logged in user
      agency: '/api/agencies/1',
    };

    return data;
  }
}
