import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { QueryReturnType } from "@/dto/request/base.request";
import { endPoint } from "../query/endpoint";
import { CreateProductRequest, DeleteProductRequest, UpdateProductRequest } from "@/dto/request/product";
import { ProductModel } from "@/model/product";
import { CreateTypeInWarehouseReq, DeleteTypeInWarehouseReq, UpdateTypeInWarehouseReq } from "@/dto/request/typeInWarehouse";
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
        deleteProduct: builder.mutation<QueryReturnType<ProductModel>, DeleteProductRequest>({
            query: (payload) => ({
                ...endPoint.product.delete(),
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
        updateTypeInWarehouse: builder.mutation<QueryReturnType<any>, UpdateTypeInWarehouseReq>({
            query: (payload) => ({
                ...endPoint.product.updateTypeInWarehouse(),
                data: payload,
            })
        }),
        deleteTypeInWarehouse: builder.mutation<QueryReturnType<any>, DeleteTypeInWarehouseReq>({
            query: (payload) => ({
                ...endPoint.product.deleteTypeInWarehouse(),
                data: payload,
            })
        })
    })
});

export const {
    useGetAllProductQuery,
    useGetDetailProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    
    useGetTypeInWarehouseQuery,
    useCreateTypeInWarehouseMutation,
    useUpdateTypeInWarehouseMutation,
    useDeleteTypeInWarehouseMutation,
} = productApi;