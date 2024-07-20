import React, { useContext, useMemo, useState } from "react";

import { Group, Image, NumberFormatter, Stack, Text } from "@mantine/core";
import { DashboardContext, TypeDashboardContext } from "..";

import classes from "./styles.module.css";
import IconOrder from "@/assets/icon/order.svg";

export const DashboardOrder: React.FC = () => {
    const [time, setTime] = useState<string>("w");

    const {
        orders,
    } = useContext<TypeDashboardContext>(DashboardContext);

    const total = useMemo(() => {
        return orders.length;
    }, [orders, time]);

    return (
        <Stack
            style={{
                backgroundColor: "#FFFFFF",
                padding: 16,
                borderRadius: 8,
            }}
            className={classes.box_shadow}
        >
            <Group
                w={"100%"}
                justify="space-between"
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >Tổng đơn hàng</Text>
                <Group>
                    <Text onClick={() => setTime("w")} className={ time === "w" ? classes.option_time_active : classes.option_time }>1W</Text>
                    <Text onClick={() => setTime("m")} className={ time === "m" ? classes.option_time_active : classes.option_time }>1M</Text>
                    <Text onClick={() => setTime("y")} className={ time === "y" ? classes.option_time_active : classes.option_time }>1Y</Text>
                </Group>
            </Group>
            <Group mt={20}>
                <NumberFormatter 
                    value={total} 
                    style={{ fontSize: 24 }}
                />
                <Image height={60} width={60} src={IconOrder}/>
            </Group>
        </Stack>
    )
}