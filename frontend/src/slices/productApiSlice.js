import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL} from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/list_All`,
      }),
      keepUnusedDataFor: 5,
    }),
    getInactiveProducts: builder.query({
  query: () => ({
    url: `${PRODUCTS_URL}/inactive`,
  }),
  keepUnusedDataFor: 5,
}),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getProductById: builder.query({
  query: (id) => ({
    url: `${PRODUCTS_URL}/products/${id}`,
  }),
  keepUnusedDataFor: 5,
}),

updateProductPrice: builder.mutation({
  query: ({ id, price, isActive }) => ({
    url: `${PRODUCTS_URL}/products/${id}/price`,
    method: "PUT",
    body: { price, isActive }, // ✅ include both fields
  }),
}),
deleteProduct: builder.mutation({
  query: (id) => ({
    url: `${PRODUCTS_URL}/products/${id}`,
    method: 'DELETE',
  }),
}),

  }),
});

export const { useGetProductsQuery, 
  useCreateProductMutation,
  useGetProductByIdQuery, 
  useUpdateProductPriceMutation,
useDeleteProductMutation,
useGetInactiveProductsQuery,} =
  productsApiSlice;
