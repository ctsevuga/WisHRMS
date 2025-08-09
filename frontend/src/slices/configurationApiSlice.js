import { CONFIGURATIONS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const configurationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allocateLeaves: builder.mutation({
      query: (data) => ({
        url: `${CONFIGURATIONS_URL}`,
        method: "PUT",
        body: data,
      }),
    }),
    getYears: builder.query({
      query: () => ({
        url: `${CONFIGURATIONS_URL}/year`,
      }),
      keepUnusedDataFor: 5,
    }),
      getConfigurations: builder.query({
         query: () => ({
           url: CONFIGURATIONS_URL,
         }),
         providesTags: ["Configurations"],
         keepUnusedDataFor: 5,
       }),
  }),
});

export const { useAllocateLeavesMutation,useGetConfigurationsQuery, useGetYearsQuery } =
  configurationApiSlice;
