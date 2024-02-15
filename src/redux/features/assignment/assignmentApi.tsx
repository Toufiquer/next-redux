// import { apiSlice } from "../api/apiSlice";

import {apiSlice} from '../api/apiSlice';

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // endpoints here
    getAssignments: builder.query({
      query: () => `/assignments`,
    }),
    getAssignment: builder.query({
      query: id => `/assignments/${id}`,
    }),
    updateAssignment: builder.mutation({
      query: ({id, data}) => ({
        url: `/assignments/${id}`,
        method: 'PATCH',
        body: data,
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        // optimistic cache update start

        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData('getAssignments', undefined, draft => {
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
    editAssignment: builder.mutation({
      query: ({id, data}) => ({
        url: `/assignments/${id}`,
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
                'getAssignments',
                undefined,
                draft => {
                  const newValue = draft.map(curr => {
                    if (parseInt(curr.id) === parseInt(arg.id)) {
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
    deleteAssignment: builder.mutation({
      query: id => ({
        url: `/assignments/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData('getAssignments', undefined, draft => {
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
    addAssignment: builder.mutation({
      query: data => ({
        url: `/assignments`,
        method: 'POST',
        body: data,
      }),

      /* @  Start update cache */
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        // optimistic cache update start

        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData('getAssignments', {}, draft => {
            console.log('draft: ' + draft);
            const newValue = draft.map(curr => {
              return {...curr, title: 'Change this title for dispatch'};
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
      /* End update cache */
    }),
  }),
});
export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useEditAssignmentMutation,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
