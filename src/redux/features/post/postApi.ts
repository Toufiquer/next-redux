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

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData(
            'getPosts',
            undefined,
            (draft: initSinglePostDataType[]) => {
              const newValue = draft.filter(curr => curr.id !== arg.id);
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
    addPost: builder.mutation({
      query: data => ({
        url: `/posts`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        // debugger;
        try {
          const query = await queryFulfilled;
          // pessimistic cache update start
          if (query?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                'getPosts',
                undefined,
                (draft: initSinglePostDataType[]) => {
                  draft.push(query.data);
                },
              ),
            );
          }
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
