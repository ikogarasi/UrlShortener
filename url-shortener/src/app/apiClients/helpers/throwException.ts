import { ApiException } from '../exceptions/ApiException';

export const throwException = (
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any }
): any => {
  const exceptionMessage = response.toString();
  throw new ApiException(exceptionMessage, status, response, headers);
};
