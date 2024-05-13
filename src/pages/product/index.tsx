import { Stack } from "@mantine/core";
import React from "react";
import ProductHeader from "./components/header";
import ProductTable from "./components/table";

const Product: React.FC = () => {
    return (
        <Stack gap={0}>
            <ProductHeader/>
            <ProductTable/>
        </Stack>
    )
}

export default Product;