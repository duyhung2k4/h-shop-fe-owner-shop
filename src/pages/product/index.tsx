import { Box, Stack } from "@mantine/core";
import React from "react";
import ProductHeader from "./components/header";
import ProductTable from "./components/table";
import classes from "./style.module.css";

const Product: React.FC = () => {
    return (
        <Stack gap={0} h={"100%"}>
            <Box className={classes.header}>
                <ProductHeader/>
            </Box>
            <Box className={classes.table}>
                <ProductTable/>
            </Box>
        </Stack>
    )
}

export default Product;