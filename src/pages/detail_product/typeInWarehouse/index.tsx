import React from "react";
import { Button, Group, Stack, Image } from "@mantine/core";

import IconPlus from "@/assets/icon/plus-svgrepo-com.svg";

const TypeInWarehouse: React.FC = () => {
    return (
        <Stack>
            <Group justify="end">
                <Button
                    leftSection={<Image height={24} width={24} src={IconPlus} />}
                >Thêm</Button>
            </Group>
        </Stack>
    )
}

export default TypeInWarehouse;