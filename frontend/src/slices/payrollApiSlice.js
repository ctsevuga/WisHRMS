import { apiSlice } from "./apiSlice";
import { PAYROLLS_URL } from "../constants";

export const payrollApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generatePayroll: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    generatePayrollAll: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLS_URL}/all`,
        method: "POST",
        body: data,
      }),
    }),
    getPayrolls: builder.query({
      query: () => ({
        url: PAYROLLS_URL,
      }),
      providesTags: ["Payroll"],
      keepUnusedDataFor: 5,
    }),
    deletePayroll: builder.mutation({
      query: (payrollId) => ({
        url: `${PAYROLLS_URL}/${payrollId}`,
        method: "DELETE",
      }),
    }),
    updatePayroll: builder.mutation({
      query: (payrollId) => ({
        url: `${PAYROLLS_URL}/${payrollId}`,
        method: "PUT",
      }),
    }),
    getPayrollDetails: builder.query({
      query: (id) => ({
        url: `${PAYROLLS_URL}/admin/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
        getPayrollView: builder.query({
      query: (id) => ({
        url: `${PAYROLLS_URL}/detail/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updatePayrollAll: builder.mutation({
      query: (data) => ({
        url: `${PAYROLLS_URL}/all`,
        method: "PUT",
        body: data,
      }),
    }),
    getMyPayslips: builder.query({
      query: (empId) => ({
        url: `${PAYROLLS_URL}/${empId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGeneratePayrollMutation,
  useGeneratePayrollAllMutation,
  useGetPayrollsQuery,
  useDeletePayrollMutation,
  useUpdatePayrollMutation,
  useUpdatePayrollAllMutation,
  useGetPayrollDetailsQuery,
  useGetPayrollViewQuery,
  useGetMyPayslipsQuery,
} = payrollApiSlice;
