import { createApi } from '@reduxjs/toolkit/dist/query/react';
import {
  ShortUrlEntity,
  ShortUrlViewModel,
} from '../app/apiClients/ShortUrlClient';
import { shortUrlClient } from '../app/clients';
import { UserViewModel } from 'src/app/apiClients/AccountClient';

export const shortUrlApi = createApi({
  reducerPath: 'shortUrlApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['ShortUrl'],
  endpoints: (build) => ({
    createShortUrl: build.mutation<ShortUrlEntity, ShortUrlViewModel>({
      queryFn: async (model: ShortUrlViewModel) => {
        return { data: await shortUrlClient.shortUrl(model) };
      },
      invalidatesTags: ['ShortUrl'],
    }),
    getAllUrls: build.query<ShortUrlEntity[], void>({
      queryFn: async () => {
        return { data: await shortUrlClient.getAllUrls() };
      },
      providesTags: ['ShortUrl'],
    }),
    deleteUrl: build.mutation<void, number>({
      queryFn: async (id: number) => {
        return { data: await shortUrlClient.deleteUrl(id) };
      },
      invalidatesTags: ['ShortUrl'],
    }),
    getUrlById: build.query<ShortUrlEntity, number>({
      queryFn: async (urlId: number) => {
        return { data: await shortUrlClient.getUrlById(urlId) };
      },
      providesTags: ['ShortUrl'],
    }),
  }),
});

export const {
  useCreateShortUrlMutation,
  useGetAllUrlsQuery,
  useDeleteUrlMutation,
  useGetUrlByIdQuery,
} = shortUrlApi;
export default shortUrlApi;
