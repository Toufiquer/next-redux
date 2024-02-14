// import { apiSlice } from "../api/apiSlice";

import {apiSlice} from '../api/apiSlice';

export const videosApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // endpoints here
    getVideos: builder.query({
      query: () => `/videos`,
    }),
    getVideo: builder.query({
      query: id => `/videos/${id}`,
    }),
    updateVideo: builder.mutation({
      query: ({id, data}) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData('getVideos', undefined, draft => {
            const newValue = draft.map(curr => {
              if (parseInt(curr.id) === parseInt(arg.id)) {
                return {...curr, ...arg.data};
              } else {
                return curr;
              }
            });
            Object.assign(draft, newValue);
          }),
        );
        // optimistic cache update end
        try {
          const query = await queryFulfilled;
        } catch {
          patchResult1.undo();
        }
      },
    }),
    editVideo: builder.mutation({
      query: ({id, data}) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: {...data},
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const query = await queryFulfilled;
          // pessimistic cache update start
          if (query?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData('getVideos', undefined, draft => {
                const newValue = draft.map(curr => {
                  if (+curr.id === arg.id) {
                    return {...query?.data};
                  } else {
                    return curr;
                  }
                });
                Object.assign(draft, newValue);
              }),
            );
          }
          // pessimistic cache update end
        } catch {}
      },
    }),
    deleteVideo: builder.mutation({
      query: id => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData('getVideos', undefined, draft => {
            const index = draft.findIndex(
              i => parseInt(i.id) === parseInt(arg),
            );
            draft.splice(index, 1);
          }),
        );
        // optimistic cache update end
        try {
          const query = await queryFulfilled;
        } catch {
          patchResult1.undo();
        }
      },
    }),
    addVideo: builder.mutation({
      query: data => ({
        url: `/videos`,
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
              apiSlice.util.updateQueryData('getVideos', undefined, draft => {
                draft.push(query.data);
              }),
            );
          }
          // pessimistic cache update end
        } catch {}
      },
    }),
  }),
});
export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useEditVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useAddVideoMutation,
} = videosApi;
