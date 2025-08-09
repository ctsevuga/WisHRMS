import { ATTENDACES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const attendencesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   getAttences: builder.query({
  query: ({ keyword, pageNumber, startDate, endDate }) => ({
    url: `${ATTENDACES_URL}`,
    params: {
      keyword,
      pageNumber,
      startDate,
      endDate,
    },
  }),
  keepUnusedDataFor: 5,
}),
    getTodayAttences: builder.query({
      query: () => ({
        url: `${ATTENDACES_URL}/today`,
      }),
      keepUnusedDataFor: 5,
    }),
    getDashboard: builder.query({
      query: () => ({
        url: `${ATTENDACES_URL}/dashboard`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyAttences: builder.query({
      query: (empId) => ({
        url: `${ATTENDACES_URL}/${empId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createClockIn: builder.mutation({
      query: (data) => ({
        url: `${ATTENDACES_URL}/clockin`,
        method: "POST",
        body: data,
      }),
    }),
    updateClockOut: builder.mutation({
      query: (data) => ({
        url: `${ATTENDACES_URL}/clockout`,
        method: "PUT",
        body: data,
      }),
    }),
    createAttence: builder.mutation({
      query: (data) => ({
        url: `${ATTENDACES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    declareHoliday: builder.mutation({
      query: (data) => ({
        url: `${ATTENDACES_URL}/holiday`,
        method: "PUT",
        body: data,
      }),
    }),
    getAttence: builder.query({
      query: (empId) => ({
        url: `${ATTENDACES_URL}/${empId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteAttendance: builder.mutation({
      query: (attendaceId) => ({
        url: `${ATTENDACES_URL}/${attendaceId}`,
        method: "DELETE",
      }),
    }),
        getMonth: builder.query({
      query: ({  year,month }) => ({
        url: `${ATTENDACES_URL}/month`,
        params: {  year,month },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetAttencesQuery,
  useGetTodayAttencesQuery,
  useGetMyAttencesQuery,
  useGetDashboardQuery,
  useCreateClockInMutation,
  useUpdateClockOutMutation,
  useDeclareHolidayMutation,
  useCreateAttenceMutation,
  useGetAttenceQuery,
  useDeleteAttendanceMutation,
  useGetMonthQuery
} = attendencesApiSlice;
