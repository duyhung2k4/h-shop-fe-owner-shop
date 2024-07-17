import React, { useContext, useEffect } from "react";
import { Button, Group, Stack, Image } from "@mantine/core";

import IconPlus from "@/assets/icon/plus-svgrepo-com.svg";
import { DetailProductContext, TypeDetailProductContext } from "..";
import { useGetTypeInWarehouseQuery } from "@/redux/api/product.api";
import { useParams } from "react-router";


const TypeInWarehouse: React.FC = () => {
    const { setModalInsertTypeInWarehouse } = useContext<TypeDetailProductContext>(DetailProductContext);

    const { id }  = useParams();
    const {
        data,
        refetch,
    } = useGetTypeInWarehouseQuery(id || "");

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Stack>
            <Group justify="end">
                <Button
                    leftSection={<Image height={24} width={24} src={IconPlus} />}
                    onClick={() => setModalInsertTypeInWarehouse(true)}
                >Thêm</Button>
            </Group>
        </Stack>
    )
}

export default TypeInWarehouse;