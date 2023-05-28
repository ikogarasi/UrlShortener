import { AccountClient } from './apiClients/AccountClient';
import { ShortUrlClient } from './apiClients/ShortUrlClient';

export const accountApiUrl = 'https://localhost:44331';
export const shortUrlApiUrl = 'https://localhost:44344';

export const accountClient = new AccountClient(accountApiUrl);
export const shortUrlClient = new ShortUrlClient(shortUrlApiUrl);
