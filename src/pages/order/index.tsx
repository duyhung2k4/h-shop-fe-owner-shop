import React, { createContext, useEffect, useMemo, useState } from "react";

import TableCustom from "@/components/table";
import dayjs from "dayjs";
import classes from "./style.module.css";

import { useAdminGetOrderQuery } from "@/redux/api/order.api";
import { Badge, NumberFormatter, Stack, Text } from "@mantine/core";
import { MRT_ColumnDef, MRT_RowData } from "mantine-react-table";
import { OrderModel } from "@/model/order";
import { ColumnProduct } from "./components/columns/index.Product";
import { ColumnProfile } from "./components/columns/index.Profile";
import { ProfileModel } from "@/model/profile";
import { ModalUser } from "./components/modal/index.Profile";
import { ColumnAction } from "./components/columns/index.Action";
import { ROUTER } from "@/constants/router";

const MAP_ROUTER_ORDER = {
    [ROUTER.ORDER_PENDING.href]: ROUTER.ORDER_PENDING.name,
    [ROUTER.ORDER_DESTROY.href]: ROUTER.ORDER_DESTROY.name,
    [ROUTER.ORDER_HISTORY.href]: ROUTER.ORDER_HISTORY.name,
    [ROUTER.ACCEPT_PAYMENT.href]: ROUTER.ACCEPT_PAYMENT.name,
}

const Order: React.FC = () => {
    const [modalProfile, setModalProfile] = useState<boolean>(false);
    const [infoProfile, setInfoProfile] = useState<ProfileModel | null>(null);

    const {
        data,
        refetch: refetchOrder,
    } = useAdminGetOrderQuery(null);

    const orders = useMemo(() => {
        return data?.data || [];
    }, [data?.data]);

    const columns = useMemo<MRT_ColumnDef<MRT_RowData>[]>(
        () => {
            const cols: MRT_ColumnDef<MRT_RowData>[] = [
                {
                    accessorKey: "ID",
                    header: "ID",
                },
                {
                    accessorKey: "name",
                    header: "Sản phẩm",
                    Cell: (props) => {
                        const order = props.row.original as OrderModel;
                        return <ColumnProduct id={order.productId} />
                    }
                },
                {
                    accessorKey: "createAt",
                    header: "Ngày đặt",
                    Cell: (props) => {
                        const order = props.row.original as OrderModel;
                        return (
                            <>{dayjs(order.CreatedAt).format("DD/MM/YYYY")}</>
                        )
                    }
                },
                {
                    accessorKey: "user",
                    header: "Người mua",
                    Cell: (props) => {
                        const order = props.row.original as OrderModel;
                        return <ColumnProfile id={order.profileId} />
                    }
                },
                {
                    accessorKey: "amount",
                    header: "Số lượng",
                },
                {
                    accessorKey: "total",
                    header: "Thành tiền",
                    Cell: (props) => {
                        const order = props.row.original as OrderModel;
                        return <NumberFormatter suffix=" VND" value={order.total} thousandSeparator />
                    }
                },
                {
                    accessorKey: "typePay",
                    header: "Hình thức",
                    Cell: (props) => {
                        const order = props.row.original as OrderModel;
                        return (
                            <>
                                {
                                    order.groupOrder.typePay === "online"
                                        ? <Badge color="green">Thanh toán trực tiếp</Badge>
                                        : <Badge color="yellow">Trả sau</Badge>
                                }
                            </>
                        )
                    }
                },
                {
                    accessorKey: "statusPaid",
                    header: "Trạng thái thanh toán",
                    Cell: (props) => {
                        const order = props.row.original as OrderModel;
                        return (
                            <>
                                {
                                    order.groupOrder.typePay === "online" ?
                                        (
                                            order.groupOrder.paid
                                                ? <Badge color="green">Đã thanh toán </Badge>
                                                : <Badge color="red">Chưa thanh toán</Badge>
                                        ) :
                                        (
                                            order.paid
                                                ? <Badge color="green">Đã thanh toán </Badge>
                                                : <Badge color="red">Chưa thanh toán</Badge>
                                        )
                                }
                            </>
                        )
                    }
                },
            ]

            if (
                window.location.pathname === ROUTER.ORDER_PENDING.href ||
                window.location.pathname === ROUTER.ACCEPT_PAYMENT.href
            ) {
                cols.push(
                    {
                        accessorKey: "action",
                        header: "Thao tác",
                        Cell: (props) => {
                            const order = props.row.original as OrderModel;
                            return (
                                <ColumnAction order={order} router={window.location.pathname} />
                            )
                        }
                    }
                )
            }

            return cols;
        }, [window.location.pathname]);

    const dataOrders = useMemo(() => {
        const pathname = window.location.pathname;

        if(pathname === ROUTER.ORDER_PENDING.href) {
            return orders.filter(item => item.status === "pending");
        }

        if(pathname === ROUTER.ORDER_DESTROY.href) {
            return orders.filter(item => item.status === "cancel");
        }

        if(pathname === ROUTER.ACCEPT_PAYMENT.href) {
            return orders.filter(item => item.status === "accept" && !item.paid && !item.groupOrder.paid);
        }

        if(pathname === ROUTER.ORDER_HISTORY.href) {
            return orders.filter(item => (item.paid || item.groupOrder.paid) && item.status === "accept");
        }

        return [];
    }, [window.location.pathname, orders]);

    useEffect(() => {
        refetchOrder();
    }, []);


    return (
        <OrderContext.Provider
            value={{
                modalProfile,
                infoProfile,
                setModalProfile,
                setInfoProfile,
                refetchOrder,
            }}
        >
            <Stack className={classes.root}>
                <Text classNames={{ root: classes.title }}>{MAP_ROUTER_ORDER[window.location.pathname]}</Text>
                <TableCustom
                    data={dataOrders}
                    columns={columns}
                />
            </Stack>
            <ModalUser />
        </OrderContext.Provider>
    )
}

export type TypeOrderContext = {
    modalProfile: boolean
    infoProfile: ProfileModel | null
    setModalProfile: (value: boolean) => void
    setInfoProfile: (value: ProfileModel | null) => void
    refetchOrder: () => void
}

export const OrderContext = createContext<TypeOrderContext>({
    modalProfile: false,
    infoProfile: null,
    setInfoProfile: () => { },
    setModalProfile: () => { },
    refetchOrder: () => { },
})

export default Order;