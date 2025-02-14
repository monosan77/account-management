import { AccountDataModel } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getAllAccountApi = createApi({
  reducerPath: 'allAccountApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['Account'],
  endpoints: (builder) => ({
    // **********************
    // 全てのアカウントを取得
    // **********************
    getAllAccount: builder.query<AccountDataModel[], void>({
      query: () => 'account',
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({
                type: 'Account' as const,
                id,
              })),
              'Account',
            ]
          : ['Account'],
    }),
    //***************** */
    // アカウント削除
    //***************** */
    deleteAccount: builder.mutation<
      { status: number },
      { accountId: string; imageId: string }
    >({
      query(query) {
        return {
          url: `account?id=${query.accountId}&imageId=${query.imageId}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          getAllAccountApi.util.updateQueryData(
            'getAllAccount',
            undefined,
            (draft) => {
              return draft.filter((account) => account.id !== id.accountId);
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
    // *****************
    // アカウントを追加
    // *****************
    addAccount: builder.mutation<{ status: number }, FormData>({
      query: (formData) => ({
        url: 'account',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Account'],
    }),
    // ****************
    // アカウントを編集
    // ****************
    editAccount: builder.mutation<{ status: number }, FormData>({
      query: (formData) => ({
        url: `account`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Account'],
    }),
  }),
});

export const {
  useGetAllAccountQuery,
  useDeleteAccountMutation,
  useAddAccountMutation,
  useEditAccountMutation,
} = getAllAccountApi;
