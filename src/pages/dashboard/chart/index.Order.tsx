import React, { useContext, useMemo, useState } from "react";
import Chart from 'chart.js/auto';
import { DatePickerInput } from '@mantine/dates';

import { Line } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { Group, Stack, Text } from "@mantine/core";
import 'dayjs/locale/vi';

import classes from "./styles.module.css";
import dayjs from "dayjs";
import { OrderModel } from "@/model/order";
import { DashboardContext, TypeDashboardContext } from "..";

Chart.register(CategoryScale);

const DashboardChartOrder: React.FC = () => {

    const { orders } = useContext<TypeDashboardContext>(DashboardContext);

    const [range, setRange] = useState<[Date | null, Date | null]>([
        dayjs().subtract(7, "day").toDate(),
        dayjs().toDate(),
    ]);

    const listDays = useMemo(() => {
        const arr: { date: Date, orders: OrderModel[] }[] = [];
        let curDate = range[0];

        if(!curDate) return [];
        
        while(dayjs(curDate).isBefore(range[1])) {
            arr.push({
                date: curDate,
                orders: orders.filter(item => dayjs(item.CreatedAt).format("DD/MM/YYYY") === dayjs(curDate).format("DD/MM/YYYY")),
            });
            curDate = dayjs(curDate).subtract(-1, "day").toDate();

            if(!dayjs(curDate).isBefore(range[1])) {
                arr.push({
                    date: dayjs(range[1]).toDate(),
                    orders: orders.filter(item => dayjs(item.CreatedAt).format("DD/MM/YYYY") === dayjs(range[1]).format("DD/MM/YYYY")),
                });
            }
        }

        return arr;
    }, [range, orders]);

    return (
        <Stack
            style={{
                backgroundColor: "#FFFFFF",
                padding: 16,
                borderRadius: 8,
                marginTop: 20,
            }}
            className={`${classes.box_shadow}`}
        >
            <Group w={"100%"} justify="space-between">
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >Thống kê đơn hàng</Text>
                <Group>
                    <Text style={{ fontWeight: 500 }}>Chọn thời gian</Text>
                    <DatePickerInput
                        type="range"
                        w={200}
                        value={range}
                        onChange={setRange}
                        locale="vi"
                        valueFormat="DD/MM/YYYY"
                        placeholder="Chọn khoảng thời gian"
                    />
                </Group>
            </Group>
            <Stack w={"100%"} align="center" h={400}>
                <Line
                    data={{
                        labels: listDays.map(item => dayjs(item.date).format("DD/MM/YYYY")),
                        datasets: [
                            {
                                label: 'Số lượng đơn hàng',
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                                hoverBorderColor: 'rgba(75,192,192,1)',
                                data: listDays.map(item => item.orders.length),
                                pointRadius: 10,
                                tension: 0.25,
                                fill: true,
                            },
                        ],
                    }}
                />
            </Stack>
        </Stack>
    );
}

export default DashboardChartOrder;