import React, { useContext, useMemo, useState } from "react";

import { Group, Image, NumberFormatter, Stack, Text } from "@mantine/core";
import { DashboardContext, TypeDashboardContext } from "..";

import IconMoney from "@/assets/icon/money.svg";
import classes from "./styles.module.css";

export const DashboardIncome: React.FC = () => {
    const [time, setTime] = useState<string>("w");

    const {
        orders,
    } = useContext<TypeDashboardContext>(DashboardContext);

    const total = useMemo(() => {
        let sum = 0;
        orders.forEach(item => {
            if(
                item.status === "accept" &&
                (item.paid || item.groupOrder.paid)
            ) {
                sum += item.total;
            }
        })
        return sum;
    }, [orders, time]);

    return (
        <Stack
            className={classes.box_shadow}
            style={{
                backgroundColor: "#FFFFFF",
                padding: 16,
                borderRadius: 8,
            }}
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
                >Tổng thu nhập</Text>
                <Group>
                    <Text onClick={() => setTime("w")} className={ time === "w" ? classes.option_time_active : classes.option_time }>1W</Text>
                    <Text onClick={() => setTime("m")} className={ time === "m" ? classes.option_time_active : classes.option_time }>1M</Text>
                    <Text onClick={() => setTime("y")} className={ time === "y" ? classes.option_time_active : classes.option_time }>1Y</Text>
                </Group>
            </Group>
            <Group mt={20}>
                <NumberFormatter 
                    suffix=" VND" 
                    thousandSeparator 
                    value={total} 
                    style={{ fontSize: 24 }}
                />
                <Image height={60} width={60} src={IconMoney}/>
            </Group>
        </Stack>
    )
}