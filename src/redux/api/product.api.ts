import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { QueryReturnType } from "@/dto/request/base.request";
import { endPoint } from "../query/endpoint";
import { CreateProductRequest } from "@/dto/request/product";
import { ProductModel } from "@/model/product";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        createProduct: builder.mutation<QueryReturnType<ProductModel>, CreateProductRequest>({
            query: (payload) => ({
                ...endPoint.product.createProduct(),
                data: payload,
            }),
        }),
        getAllProduct: builder.query<QueryReturnType<ProductModel[]>, null>({
            query: () => ({
                ...endPoint.product.getAppProduct(),
            }),
        }),
        getDetailProduct: builder.query<QueryReturnType<ProductModel>, string>({
            query: (payload) => ({
                ...endPoint.product.getDetailProduct(),
                params: { id: payload }
            })
        })
    })
});

export const {
    useCreateProductMutation,
    useGetAllProductQuery,
    useGetDetailProductQuery,
} = productApi;