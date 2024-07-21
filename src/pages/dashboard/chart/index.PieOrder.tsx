import React, { useContext, useMemo } from "react";

import { Pie } from "react-chartjs-2";
import { Grid, Group, Stack, Text } from "@mantine/core";
import { DashboardContext, TypeDashboardContext } from "..";

import 'dayjs/locale/vi';
import classes from "./styles.module.css";



export const DashboardPieOrder: React.FC = () => {

    const { orders } = useContext<TypeDashboardContext>(DashboardContext);

    const type_1 = useMemo(() => {
        return [
            orders.filter(item => item.status === "pending").length,
            orders.filter(item => item.status === "cancel").length,
            orders.filter(item => item.status === "accept" && !item.paid && !item.groupOrder.paid).length,
            orders.filter(item => (item.paid || item.groupOrder.paid) && item.status === "accept").length
        ]
    }, [orders]);

    const type_2 = useMemo(() => {
        return [
            orders.filter(item => item.groupOrder.typePay === "online").length,
            orders.filter(item => item.groupOrder.typePay === "offline").length,
        ]
    }, [orders]);

    const type_3 = useMemo(() => {
        return [
            orders.filter(item => item.status === "accept" && item.paid).length,
            orders.filter(item => item.status === "accept" && !item.paid).length,
        ]
    }, [orders]);

    

    return (
        <Grid gutter={40} mt={20}>
            <Grid.Col span={4}>
                <Stack
                    style={{
                        backgroundColor: "#FFFFFF",
                        padding: 16,
                        borderRadius: 8,
                        marginTop: 20,
                    }}
                    align="center"
                    className={classes.box_shadow}
                >
                    <Text style={{ fontWeight: 500 }}>Phân loại theo trạng thái</Text>
                    <Group w={"80%"}>
                    <Pie
                        data={{
                            labels: [
                                'Chờ xác nhận',
                                'Bị hủy',
                                'Chờ thanh toán',
                                'Đã xác nhận',
                            ],
                            datasets: [{
                                label: 'Đơn hàng',
                                data: type_1,
                                backgroundColor: [
                                    'rgb(255, 205, 86)',
                                    'rgb(250, 82, 82)',
                                    'rgb(66, 150, 255)',
                                    'rgb(64, 192, 87)',
                                ],
                                hoverOffset: 4
                            }]
                        }}
                    />
                    </Group>
                </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
                <Stack
                    style={{
                        backgroundColor: "#FFFFFF",
                        padding: 16,
                        borderRadius: 8,
                        marginTop: 20,
                    }}
                    align="center"
                    className={classes.box_shadow}
                >
                    <Text style={{ fontWeight: 500 }}>Phân loại theo hình thức thanh toán</Text>
                    <Group w={"80%"}>
                    <Pie
                        data={{
                            labels: [
                                'Thanh toán trực tuyến',
                                'Trả sau',
                            ],
                            datasets: [{
                                label: 'Đơn hàng',
                                data: type_2,
                                backgroundColor: [
                                    'rgb(64, 192, 87)',
                                    'rgb(255, 205, 86)',
                                ],
                                hoverOffset: 4
                            }]
                        }}
                    />
                    </Group>
                </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
                <Stack
                    style={{
                        backgroundColor: "#FFFFFF",
                        padding: 16,
                        borderRadius: 8,
                        marginTop: 20,
                    }}
                    align="center"
                    className={classes.box_shadow}
                >
                    <Text style={{ fontWeight: 500 }}>Phân loại theo tình trạng nhận hàng</Text>
                    <Group w={"80%"}>
                    <Pie
                        data={{
                            labels: [
                                'Đã nhận',
                                'Đang giao hàng',
                            ],
                            datasets: [{
                                label: 'Đơn hàng',
                                data: type_3,
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                ],
                                hoverOffset: 4
                            }]
                        }}
                    />
                    </Group>
                </Stack>
            </Grid.Col>
        </Grid>
    )
}