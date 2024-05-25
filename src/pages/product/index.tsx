import { Box, Stack } from "@mantine/core";
import React, { createContext, useEffect } from "react";
import ProductHeader from "./components/header";
import ProductTable from "./components/table";
import classes from "./style.module.css";
import { useGetAllProductQuery } from "@/redux/api/product.api";
import { ProductModel } from "@/model/product";

const Product: React.FC = () => {
    const {
        data,
        refetch,
    } = useGetAllProductQuery(null);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <ProductContext.Provider value={{ products: data?.data || [] }}>
            <Stack gap={0} h={"100%"}>
                <Box className={classes.header}>
                    <ProductHeader />
                </Box>
                <Box className={classes.table}>
                    <ProductTable />
                </Box>
            </Stack>
        </ProductContext.Provider>
    )
}

export type TypeProductContext = {
    products: ProductModel[]
}

export const ProductContext = createContext<TypeProductContext>({
    products: [],
})

export default Product;