import React, { useContext } from "react";
import { Button, Group, Stack, Image } from "@mantine/core";

import IconPlus from "@/assets/icon/plus-svgrepo-com.svg";
import { DetailProductContext, TypeDetailProductContext } from "..";

const TypeInWarehouse: React.FC = () => {
    const { setModalInsertTypeInWarehouse } = useContext<TypeDetailProductContext>(DetailProductContext);

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