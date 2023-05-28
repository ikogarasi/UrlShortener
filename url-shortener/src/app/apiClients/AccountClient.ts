import axios, { AxiosResponse } from 'axios';
import { throwException } from './helpers/throwException';
import { ACCESS_TOKEN } from '../../constants/cookies';
import { getCookie } from '../../helpers/getCookie';

export class AccountClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  register(model: AuthViewModel): Promise<void> {
    const url_ = this.baseUrl + '/Auth/Register';

    const content = JSON.stringify(model);

    const options = {
      data: content,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return axios({ url: url_, ...options }).then((response) =>
      this.processRegister(response)
    );
  }

  protected processRegister(response: AxiosResponse): Promise<void> {
    const status = response.status;

    if (status === 204) {
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
  }

  login(model: AuthViewModel): Promise<string> {
    const url_ = this.baseUrl + '/Auth/Login';

    const content = JSON.stringify(model);

    const options = {
      data: content,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return axios({ url: url_, ...options }).then((response) =>
      this.processLogin(response)
    );
  }

  protected processLogin(response: AxiosResponse): Promise<string> {
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

    return Promise.resolve<string>(null as any);
  }

  getUserById = (userId: number): Promise<UserViewModel> => {
    const url_ = this.baseUrl + '/GetUserById';

    const options = {
      params: { userId: userId },
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
      validateStatus: () => true,
    };

    return axios({ url: url_, ...options }).then((response) =>
      this.processGetUserById(response)
    );
  };

  protected processGetUserById = (
    response: AxiosResponse
  ): Promise<UserViewModel> => {
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

    return Promise.resolve<UserViewModel>(null as any);
  };
}

export interface UserViewModel {
  userId: number;
  userName: string;
}

export interface AuthViewModel {
  email: string;
  userName?: string;
  password: string;
}
