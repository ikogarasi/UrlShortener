import { createApi } from '@reduxjs/toolkit/query/react';
import { AuthViewModel, UserViewModel } from '../app/apiClients/AccountClient';
import { accountClient } from '../app/clients';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Auth', 'User'],
  endpoints: (build) => ({
    authorizeUser: build.mutation<void, AuthViewModel>({
      queryFn: async (model: AuthViewModel) => {
        return { data: await accountClient.register(model) };
      },
      invalidatesTags: ['Auth'],
    }),
    authenticateUser: build.mutation<string, AuthViewModel>({
      queryFn: async (model: AuthViewModel) => {
        return { data: await accountClient.login(model) };
      },
      invalidatesTags: ['Auth'],
    }),
    getUserById: build.query<UserViewModel, number>({
      queryFn: async (id: number) => {
        return { data: await accountClient.getUserById(id) };
      },
      providesTags: ['User'],
    }),
  }),
});

export const {
  useAuthorizeUserMutation,
  useAuthenticateUserMutation,
  useGetUserByIdQuery,
} = accountApi;
export default accountApi;
