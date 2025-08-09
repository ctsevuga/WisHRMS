import { EMPLOYEES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: `${EMPLOYEES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getEmployees: builder.query({
      query: () => ({
        url: EMPLOYEES_URL,
      }),
      providesTags: ["Employee"],
      keepUnusedDataFor: 5,
    }),
    getEmployee: builder.query({
      query: (empId) => ({
        url: `${EMPLOYEES_URL}/${empId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAdminEmployees: builder.query({
      query: (empId) => ({
        url: `${EMPLOYEES_URL}/admin/${empId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useGetEmployeeQuery,
  useGetAdminEmployeesQuery,
} = employeesApiSlice;
