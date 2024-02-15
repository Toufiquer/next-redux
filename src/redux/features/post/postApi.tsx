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
      query: ({id, data}) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: {...data},
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const query = await queryFulfilled;
          // pessimistic cache update start
          if (query?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                'getPosts',
                undefined,
                (draft: initSinglePostDataType[]) => {
                  const newValue = draft.map(curr => {
                    if (+curr.id === arg.id) {
                      return {...query?.data};
                    } else {
                      return curr;
                    }
                  });
                  Object.assign(draft, newValue);
                },
              ),
            );
          }
          // pessimistic cache update end
        } catch {}
      },
    }),
    deletePost: builder.mutation({
      query: id => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),

      /** ! Working on it start ****/
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, draft => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const post = draft.data.find(
              post => parseInt(post.id) === parseInt(arg),
            );
            Object.assign(draft, post);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      /** ! Working on it end  ****/

      // async onQueryStarted(arg, {queryFulfilled, dispatch}) {
      //   // optimistic cache update start
      //   console.log('inside delet mutation');
      //   console.log('arg: ', arg);
      //   const patchResult1 = dispatch(
      //     apiSlice.util.updateQueryData('getPosts', undefined, draft => {
      //       const newValue = draft.filter(
      //         curr => parseInt(curr.id + '') !== parseInt(arg + ''),
      //       );
      //       return Object.assign(draft, {
      //         data: [{title: 'nothing is left', id: 9}],
      //       });
      //     }),
      //   );
      //   // optimistic cache update end
      //   console.log('outside :', patchResult1);

      //   try {
      //     const {data} = await queryFulfilled;
      //     dispatch(
      //       apiSlice.util.updateQueryData('getPosts', undefined, draft =>
      //         draft.push({title: 'asynd', id: 500}),
      //       ),
      //     );
      //   } catch {
      //     console.log('error happen :', patchResult1);
      //     patchResult1.undo();
      //   }
      // },
    }),

    addPost: builder.mutation({
      query: data => ({
        url: `/posts`,
        method: 'POST',
        body: data,
      }),

      /* Start */

      async onCacheEntryAdded(
        arg,
        {updateCachedData, cacheDataLoaded, cacheEntryRemoved},
      ) {
        updateCachedData(draft => {
          draft.push({title: 'from cache update', id: 1212});
        });
      },

      /* second part*/
      // async onQueryStarted(arg, {queryFulfilled, dispatch}) {
      //   // debugger;
      //   try {
      //     const query = await queryFulfilled;
      //     console.log('post add : ', query);
      //     console.log('post arg : ', arg);
      //     // pessimistic cache update start
      //     if (query?.data?.id) {
      //       dispatch(
      //         apiSlice.util.updateQueryData('getPosts', undefined, draft =>
      //           draft.push({title: arg.name, id: 120}),
      //         ),
      //       );
      //     }
      //     // pessimistic cache update end
      //   } catch {}
      // },

      /* End */
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
