import { SALARIES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const salaryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSalary: builder.mutation({
      query: (data) => ({
        url: `${SALARIES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getSalaries: builder.query({
      query: () => ({
        url: SALARIES_URL,
      }),
      providesTags: ["Salary"],
      keepUnusedDataFor: 5,
    }),
    deleteSalary: builder.mutation({
      query: (salaryId) => ({
        url: `${SALARIES_URL}/${salaryId}`,
        method: "DELETE",
      }),
    }),
    getSalaryDetails: builder.query({
      query: (id) => ({
        url: `${SALARIES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateSalary: builder.mutation({
      query: (data) => ({
        url: `${SALARIES_URL}/${data.salaryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Salary"],
    }),
     getMySalary: builder.query({
          query: (empId) => ({
            url: `${SALARIES_URL}/${empId}`,
          }),
          keepUnusedDataFor: 5,
        }),
  }),
});

export const { useCreateSalaryMutation,
  useGetSalariesQuery,
  useDeleteSalaryMutation,
  useUpdateSalaryMutation,
  useGetSalaryDetailsQuery,
  useGetMySalaryQuery,
 } = salaryApiSlice;
