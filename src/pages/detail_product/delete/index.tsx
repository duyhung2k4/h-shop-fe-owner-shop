import React, { useContext } from "react";
import { DetailProductContext, TypeDetailProductContext } from "..";
import { Button, Stack } from "@mantine/core";

const DetailProductDelete: React.FC = () => {
    const {
        setModalDeleteProduct
    } = useContext<TypeDetailProductContext>(DetailProductContext);

    return (
        <Stack>
            <Button
                onClick={() => setModalDeleteProduct(true)}
            >Xóa sản phẩm</Button>
        </Stack>
    )
}

export default DetailProductDelete;