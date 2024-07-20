import React, { useContext } from "react";

import IconAccept from "@/assets/icon/accept.svg";
import IconCancel from "@/assets/icon/cancel.svg";

import { useNotification } from "@/hook/notification.hook";
import { OrderModel } from "@/model/order";
import { useChangeStatusV2Mutation } from "@/redux/api/order.api";
import { ActionIcon, Group, Image, Tooltip } from "@mantine/core";
import { OrderContext, TypeOrderContext } from "../..";
import { ROUTER } from "@/constants/router";



export const ColumnAction: React.FC<{ order: OrderModel, router: string }> = ({ order, router }) => {
    const noti = useNotification();
    const { refetchOrder } = useContext<TypeOrderContext>(OrderContext);
    const [changeStatusV2, { isLoading: loadingChangeStatusV2 }] = useChangeStatusV2Mutation();

    const handleChangeStatusV2 = async (order: OrderModel, status: string) => {
        const result = await changeStatusV2({
            id: order.ID,
            warehouseId: order.warehouseId,
            typeWarehouseId: order.typeInWarehouseId,
            paid: order.paid,
            amount: order.amount,
            status,
        });

        if ("error" in result) {
            noti.error(`${status === "accept" ? "Duyệt" : "Hủy"} đơn hàng thất bại`);
            return;
        }

        noti.success(`${status === "accept" ? "Duyệt" : "Hủy"} đơn hàng thành công`);
        refetchOrder();
    }

    if (router === ROUTER.ACCEPT_PAYMENT.href) {
        return (
            <Group gap={8}>
                <Tooltip label="Xác nhận">
                    <ActionIcon
                        loading={loadingChangeStatusV2}
                        onClick={() => {
                            let newOrder = {...order};
                            newOrder.paid = true;
                            handleChangeStatusV2(newOrder, "accept");
                        }}
                    >
                        <Image height={24} width={24} src={IconAccept} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        )
    }

    if (router === ROUTER.ORDER_PENDING.href) {
        return (
            <Group gap={8}>
                <Tooltip label="Duyệt đơn">
                    <ActionIcon
                        loading={loadingChangeStatusV2}
                        onClick={() => {
                            handleChangeStatusV2(order, "accept");
                        }}
                    >
                        <Image height={24} width={24} src={IconAccept} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Hủy đơn">
                    <ActionIcon
                        loading={loadingChangeStatusV2}
                        onClick={() => {
                            handleChangeStatusV2(order, "cancel");
                        }}
                    >
                        <Image height={28} width={28} src={IconCancel} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        )
    }

    return (
        <></>
    )

}