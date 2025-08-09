import { LEAVES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: () => ({
        url: LEAVES_URL,
      }),
      providesTags: ["Leaves"],
      keepUnusedDataFor: 5,
    }),
    getMyLeaves: builder.query({
      query: (empId) => ({
        url: `${LEAVES_URL}/${empId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createLeave: builder.mutation({
      query: (data) => ({
        url: `${LEAVES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getLeave: builder.query({
      query: (id) => ({
        url: `${LEAVES_URL}/status/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteLeave: builder.mutation({
      query: (Id) => ({
        url: `${LEAVES_URL}/${Id}`,
        method: "DELETE",
      }),
    }),
    //     leaveStatus: builder.mutation({
    //   query: (leaveId) => ({
    //     url: `${LEAVES_URL}/${leaveId}/status`,
    //     method: 'PUT',
    //   }),
    // }),
    leaveStatus: builder.mutation({
      query: (data) => ({
        url: `${LEAVES_URL}/${data.leaveId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getConfig: builder.query({
      query: ({ empId, year }) => ({
        url: `${LEAVES_URL}/myconfiguration/leave`,
        params: { empId, year },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useGetMyLeavesQuery,
  useCreateLeaveMutation,
  useGetLeaveQuery,
  useDeleteLeaveMutation,
  useLeaveStatusMutation,
  useGetConfigQuery,
} = leaveApiSlice;
