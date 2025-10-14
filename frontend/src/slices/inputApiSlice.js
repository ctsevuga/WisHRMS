import { apiSlice } from "./apiSlice";
import { INPUTS_URL } from "../constants";

export const inputApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInput: builder.mutation({
      query: (data) => ({
        url: `${INPUTS_URL}/input_create`,
        method: "POST",
        body: data,
      }),
    }),
    getBasicInputs: builder.query({
      query: () => ({
        url: `${INPUTS_URL}/basic`,
      }),
      keepUnusedDataFor: 5,
    }),

    getInputs: builder.query({
      query: (filters = {}) => {
        const queryString = new URLSearchParams(filters).toString();
        return {
          url: `${INPUTS_URL}?${queryString}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 5,
    }),

    getInput: builder.query({
      query: (inputId) => ({
        url: `${INPUTS_URL}/input/${inputId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    deleteInput: builder.mutation({
      query: (inputId) => ({
        url: `${INPUTS_URL}/${inputId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateInputMutation,
  useGetInputsQuery,
  useGetBasicInputsQuery,
  useGetInputQuery,

  useDeleteInputMutation,
} = inputApiSlice;
