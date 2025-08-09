import { MONTHS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const monthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
 

      getMonths: builder.query({
         query: () => ({
           url: MONTHS_URL,
         }),
         providesTags: ["Months"],
         keepUnusedDataFor: 5,
       }),
  }),
});

export const { useGetMonthsQuery,  } =
  monthApiSlice;
