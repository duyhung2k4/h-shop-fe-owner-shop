import React, { useContext, useEffect, useMemo } from "react";

import { Bar } from "react-chartjs-2";
import { Group, Stack, Text } from "@mantine/core";
import { DashboardContext, TypeDashboardContext } from "..";
import { useGetCategoryQuery } from "@/redux/api/typeProduct.api";
import { useGetAllProductQuery } from "@/redux/api/product.api";
import { ProductObjectDefaultField } from "@/model/product";
import 'dayjs/locale/vi';

import classes from "./styles.module.css";



export const DashboardBarOrder: React.FC = () => {

    const { orders } = useContext<TypeDashboardContext>(DashboardContext);
    const {
        data: categoryData,
        refetch: refetchCategory,
    } = useGetCategoryQuery(null);
    const {
        data: productData,
        refetch: refetchProductData,
    } = useGetAllProductQuery(null);

    useEffect(() => {
        refetchCategory();
        refetchProductData();
    }, []);
    
    const categorys = useMemo(() => {
        const products = productData?.data || [];

        const mapData = (categoryData?.data || []).map(item => ({
            label: item.name,
            orders: orders.filter(
                o => item.ID === (products.find(p => p[ProductObjectDefaultField._id] === o.productId))?.[ProductObjectDefaultField.categoryId]
            ).length,
            color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        }));
        
        return mapData;
    }, [categoryData, productData]);


    return (
        <Stack
            style={{
                backgroundColor: "#FFFFFF",
                padding: 16,
                borderRadius: 8,
                marginTop: 20,
                marginBottom: 20,
            }}
            className={`${classes.box_shadow}`}
        >
            <Group w={"100%"}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >Thống kê đơn hàng theo danh mục</Text>
            </Group>

            <Stack w={"100%"} align="center">
                <Bar
                    data={{
                        labels: categorys.map(item => item.label),
                        datasets: [{
                            label: 'Đơn hàng',
                            data: categorys.map(item => item.orders),
                            backgroundColor: categorys.map(item => item.color),
                            borderColor: categorys.map(item => item.color),
                            borderWidth: 1,
                        }]
                    }}
                />
            </Stack>
        </Stack>
    )
}