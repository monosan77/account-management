import { AccountDataModel } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type PostAccount = {
  name: string;
  email: string;
  tel: string;
};
export const getAllAccountApi = createApi({
  reducerPath: 'allAccountApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['Account'],
  endpoints: (builder) => ({
    getAllAccount: builder.query<AccountDataModel[], void>({
      query: () => 'account',
      providesTags: (result) =>
        result
          ? [
              ...(result || []).map(({ id }) => ({
                type: 'Account' as const,
                id,
              })),
              'Account',
            ]
          : ['Account'],
    }),
    deleteAccount: builder.mutation<{ status: number }, string>({
      query(id) {
        return {
          url: `account?id=${id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          getAllAccountApi.util.updateQueryData(
            'getAllAccount',
            undefined,
            (draft) => {
              return draft.filter((account) => account.id !== id);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    addAccount: builder.mutation<{ status: number }, PostAccount>({
      query: (body) => ({
        url: 'account',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Account'],
    }),
  }),
});

export const {
  useGetAllAccountQuery,
  useDeleteAccountMutation,
  useAddAccountMutation,
} = getAllAccountApi;
