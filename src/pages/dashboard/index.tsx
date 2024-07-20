import React, { createContext, useEffect } from "react";

import { Grid, Stack } from "@mantine/core";
import { useGetAllProductQuery } from "@/redux/api/product.api";
import { useAdminGetOrderQuery } from "@/redux/api/order.api";
import { DashboardIncome } from "./card_total/index.Income";
import { OrderModel } from "@/model/order";
import { ProductModel } from "@/model/product";
import { DashboardOrder } from "./card_total/index.Order";
import DashboardChartOrder from "./chart/index.Order";
import { DashboardPieOrder } from "./chart/index.PieOrder";
import { DashboardBarOrder } from "./chart/index.BarOrder";

const Dashboard: React.FC = () => {

    const {
        data: dataProducts,
        refetch: refetchProducts,
    } = useGetAllProductQuery(null);
    const {
        data: dataOrders,
        refetch: refetchOrders,
    } = useAdminGetOrderQuery(null);

    useEffect(() => {
        refetchProducts();
        refetchOrders();
    }, []);

    console.log({
        dataOrders,
        dataProducts,
    })

    return (
        <DashboardContext.Provider
            value={{
                orders: dataOrders?.data || [],
                products: dataProducts?.data || [],
            }}
        >
            <Stack>
                <Grid gutter={40}>
                    <Grid.Col span={6}>
                        <DashboardIncome />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <DashboardOrder />
                    </Grid.Col>
                </Grid>

                <DashboardChartOrder/>
                <DashboardPieOrder/>
                <DashboardBarOrder/>
            </Stack>
        </DashboardContext.Provider>
    )
}

export type TypeDashboardContext = {
    orders: OrderModel[],
    products: ProductModel[],
}

export const DashboardContext = createContext<TypeDashboardContext>({
    orders: [],
    products: [],
})

export default Dashboard;