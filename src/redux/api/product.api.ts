import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { QueryReturnType } from "@/dto/request/base.request";
import { endPoint } from "../query/endpoint";
import { CreateProductRequest, UpdateProductRequest } from "@/dto/request/product";
import { ProductModel } from "@/model/product";
import { CreateTypeInWarehouseReq } from "@/dto/request/typeInWarehouse";
import { TypeInWarehouseRes } from "@/dto/response/typeInWarehouse.response";

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
        updateProduct: builder.mutation<QueryReturnType<ProductModel>, UpdateProductRequest>({
            query: (payload) => ({
                ...endPoint.product.update(),
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
        }),

        getTypeInWarehouse: builder.query<QueryReturnType<TypeInWarehouseRes[]>, string>({
            query: (payload) => ({
                ...endPoint.product.getTypeInWarehouse(),
                params: { id: payload },
            })
        }),

        createTypeInWarehouse: builder.mutation<QueryReturnType<any>, CreateTypeInWarehouseReq>({
            query: (payload) => ({
                ...endPoint.product.createTypeInWarehouse(),
                data: payload,
            })
        }),
    })
});

export const {
    useCreateProductMutation,
    useUpdateProductMutation,
    useGetAllProductQuery,
    useGetDetailProductQuery,
    useGetTypeInWarehouseQuery,

    useCreateTypeInWarehouseMutation,
} = productApi;