import { apiSlice } from './apiSlice';
import { OUTPUTS_URL } from '../constants';

export const outputApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createOutput: builder.mutation({
      query: (data) => ({
        url: `${OUTPUTS_URL}/output_create`,
        method: 'POST',
        body: data,
      }),
    }),

      getOutputs: builder.query({
        query: () => ({
          url: OUTPUTS_URL,
        }),
        providesTags: ['Outputs'],
        keepUnusedDataFor: 5,
      }),
 
         getOutput: builder.query({
         query: (outputId) => ({
           url: `${OUTPUTS_URL}/output/${outputId}`,
         }),
         keepUnusedDataFor: 5,
       }),   
  
     deleteOutput: builder.mutation({
      query: (inputId) => ({
        url: `${OUTPUTS_URL}/${inputId}`,
        method: "DELETE",
      }),
    }),
 
 
  
  }),
});

export const {
  
  useCreateOutputMutation,
  useGetOutputsQuery,
  
  useGetOutputQuery,
  
  useDeleteOutputMutation,
  
} = outputApiSlice;
