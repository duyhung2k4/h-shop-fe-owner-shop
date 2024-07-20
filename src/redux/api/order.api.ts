import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { QueryReturnType } from "@/dto/request/base.request";
import { endPoint } from "../query/endpoint";
import { GroupOrderRes } from "@/dto/response/order.response";
import { GroupOrderChangeStatusReq, GroupOrderReq, OrderChangeStatusV2Req } from "@/dto/request/order";
import { GroupOrderModel } from "@/model/groupOrder";
import { OrderModel } from "@/model/order";


export const orderApi = createApi({
    reducerPath: "order",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        order: builder.mutation<QueryReturnType<GroupOrderRes>, GroupOrderReq>({
            query: (payload) => ({
                ...endPoint.order.order(),
                data: payload,
            }),
        }),

        changeStatus: builder.mutation<QueryReturnType<null>, GroupOrderChangeStatusReq>({
            query: (payload) => ({
                ...endPoint.order.changeStatus(),
                data: payload,
            }),
        }),

        changeStatusV2: builder.mutation<QueryReturnType<null>, OrderChangeStatusV2Req>({
            query: (payload) => ({
                ...endPoint.order.changeStatusV2(),
                data: payload,
            }),
        }),

        getPurchaseOrder: builder.query<QueryReturnType<GroupOrderModel[]>, null>({
            query: () => ({
                ...endPoint.order.getPurchaseOrder(),
            }),
        }),

        adminGetOrder: builder.query<QueryReturnType<OrderModel[]>, null>({
            query: () => ({
                ...endPoint.order.adminGetOrder(),
            }),
        }),
    })
})

export const {
    useOrderMutation,
    useChangeStatusMutation,
    useChangeStatusV2Mutation,
    useGetPurchaseOrderQuery,
    useAdminGetOrderQuery,
} = orderApi;