import { PARAMETERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const parameterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParameters: builder.query({
      query: () => ({
        url: PARAMETERS_URL,
      }),
      providesTags: ["Parameters"],
      keepUnusedDataFor: 5,
    }),

    getParameterById: builder.query({
      query: (id) => ({
        url: `${PARAMETERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createParameter: builder.mutation({
      query: (data) => ({
        url: PARAMETERS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Parameters"],
    }),

    updateParameter: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${PARAMETERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Parameters"],
    }),

    deleteParameter: builder.mutation({
      query: (id) => ({
        url: `${PARAMETERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Parameters"],
    }),
  }),
});

export const {
  useGetParametersQuery,
  useGetParameterByIdQuery,
  useCreateParameterMutation,
  useUpdateParameterMutation,
  useDeleteParameterMutation,
} = parameterApiSlice;
