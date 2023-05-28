import axios, { AxiosResponse } from 'axios';
import { ACCESS_TOKEN } from '../../constants/cookies';
import { getCookie } from '../../helpers/getCookie';
import { throwException } from './helpers/throwException';

export class ShortUrlClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  shortUrl = (model: ShortUrlViewModel): Promise<ShortUrlEntity> => {
    const url_ = this.baseUrl + '/ShortUrl';

    const content = JSON.stringify(model);

    const options = {
      data: content,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
      validateStatus: () => true,
    };

    return axios({ url: url_, ...options }).then((response) =>
      this.processShortUrl(response)
    );
  };

  protected processShortUrl(response: AxiosResponse): Promise<ShortUrlEntity> {
    const status = response.status;

    if (status === 200) {
      return response.data;
    }

    if (status !== 200 && status !== 204) {
      const headers = response.headers;

      return throwException(
        'An unexpected server error occurred.',
        status,
        response.data,
        headers
      );
    }

    return Promise.resolve<ShortUrlEntity>(null as any);
  }

  getAllUrls = (): Promise<ShortUrlEntity[]> => {
    const url_ = this.baseUrl + '/GetAllUrls';

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    };

    return axios({ url: url_, ...options }).then((response) =>
      this.processGetAllUrls(response)
    );
  };

  protected processGetAllUrls = (
    response: AxiosResponse
  ): Promise<ShortUrlEntity[]> => {
    const status = response.status;

    if (status === 200) {
      return response.data;
    }

    if (status !== 200 && status !== 204) {
      const headers = response.headers;

      return throwException(
        'An unexpected server error occurred.',
        status,
        response.data,
        headers
      );
    }

    return Promise.resolve<ShortUrlEntity[]>(null as any);
  };

  getUrlById = (urlId: number): Promise<ShortUrlEntity> => {
    const url_ = this.baseUrl + '/GetUrlById';

    const options = {
      params: { urlId: urlId },
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
      validateStatus: () => true,
    };

    return axios({ url: url_, ...options }).then((response) =>
      this.processGetUrlById(response)
    );
  };

  protected processGetUrlById = (
    response: AxiosResponse
  ): Promise<ShortUrlEntity> => {
    const status = response.status;

    if (status === 200) {
      return response.data;
    }

    if (status !== 200 && status !== 204) {
      const headers = response.headers;

      return throwException(
        'An unexpected server error occurred.',
        status,
        response.data,
        headers
      );
    }

    return Promise.resolve<ShortUrlEntity>(null as any);
  };

  deleteUrl = (id: number): Promise<void> => {
    const url_ = this.baseUrl + '/DeleteUrl';

    const options = {
      params: { id: id },
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
      validateStatus: () => true,
    };

    return axios({ url: url_, ...options, data: id }).then((response) => {
      this.processDeleteUrl(response);
    });
  };

  protected processDeleteUrl = (response: AxiosResponse): Promise<void> => {
    const status = response.status;

    if (status === 200) {
      return response.data;
    }

    if (status !== 200 && status !== 204) {
      const headers = response.headers;

      return throwException(
        'An unexpected server error occurred.',
        status,
        response.data,
        headers
      );
    }

    return Promise.resolve<void>(null as any);
  };
}

export interface ShortUrlViewModel {
  url: string;
}

export interface ShortUrlEntity {
  urlId: number;
  createdById: number;
  url: string;
  shortedUrl: string;
  createdDate: Date;
}
