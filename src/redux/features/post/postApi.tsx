import {current} from '@reduxjs/toolkit';
import {apiSlice} from '../api/apiSlice';
import {initSinglePostDataType} from '@/app/post/page';

export const postsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // endpoints here
    getPosts: builder.query({
      query: () => `/posts`,
    }),
    getPost: builder.query({
      query: id => `/posts/${id}`,
    }),
    updatePost: builder.mutation({
      query: ({id, data}) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: data,
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData(
            'getPosts',
            undefined,
            (draft: initSinglePostDataType[]) => {
              const newValue = draft.map(curr => {
                if (curr.id === parseInt(arg.id)) {
                  return {...curr, ...arg.data};
                } else {
                  return curr;
                }
              });
              Object.assign(draft, newValue);
            },
          ),
        );
        // optimistic cache update end
        try {
          const query = await queryFulfilled;
        } catch {
          patchResult1.undo();
        }
      },
    }),
    editPost: builder.mutation({
      query: arg => ({
        url: `/posts/${arg.id}`,
        method: 'PATCH',
        body: arg,
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        console.log(' patch query started', arg);
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', {}, draft => {
            console.log('post draft : ', JSON.stringify(draft));
            const others = draft.map(curr => {
              let result = {...curr};
              if (parseInt(curr.id) === parseInt(arg.id)) {
                result.title = arg.title;
              }
              return result;
            });
            Object.assign(draft, others);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }

        try {
          const query = await queryFulfilled;
          // pessimistic cache update start
          // if (query?.data?.id) {
          //   dispatch(
          //     apiSlice.util.updateQueryData(
          //       'getPosts',
          //       {},
          //       (draft: initSinglePostDataType[]) => {
          //         const newValue = draft.map(curr => {
          //           if (+curr.id === +arg.id) {
          //             return {...query?.data};
          //           } else {
          //             return curr;
          //           }
          //         });
          //         Object.assign(draft, newValue);
          //       },
          //     ),
          //   );
          // }
          // pessimistic cache update end
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletePost: builder.mutation({
      query: id => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', {}, draft => {
            console.log('post draft : ', JSON.stringify(draft));
            const others = draft.filter(curr => {
              return parseInt(curr.id) !== parseInt(arg);
            });
            Object.assign(draft, others);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    addPost: builder.mutation({
      query: data => ({
        url: `/posts`,
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        dispatch(
          apiSlice.util.updateQueryData('getPosts', {}, draft => {
            draft.push({title: arg.title, id: 120});
          }),
        );
        try {
          await queryFulfilled;
          // pessimistic cache update end
        } catch {}
      },
    }),
  }),
});
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useEditPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddPostMutation,
} = postsApi;
