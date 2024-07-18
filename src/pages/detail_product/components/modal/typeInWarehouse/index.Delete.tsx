import React, { useContext } from "react";

import { Button, Group, Modal, Text } from "@mantine/core";
import { DetailProductContext, TypeDetailProductContext } from "../../..";
import { useDeleteTypeInWarehouseMutation } from "@/redux/api/product.api";

import classes from "./styles.module.css";
import { useNotification } from "@/hook/notification.hook";
import { DeleteTypeInWarehouseReq } from "@/dto/request/typeInWarehouse";



const ModalDeleteTypeInWarehouse: React.FC = () => {

    const {
        modalDeleteTypeInWarehouse,
        idDeleteTypeInWarehouse,
        setModalDeleteTypeInWarehouse,
        typeInWarehousesRefetch,
    } = useContext<TypeDetailProductContext>(DetailProductContext);

    const noti = useNotification();

    const [post, { isLoading }] = useDeleteTypeInWarehouseMutation();

    const handle = async () => {
        if (!idDeleteTypeInWarehouse) {
            return
        }
        const deleteTypeInWarehouse: DeleteTypeInWarehouseReq = {
            id: idDeleteTypeInWarehouse,
        };

        const result = await post(deleteTypeInWarehouse);
        setModalDeleteTypeInWarehouse(false);

        if ("error" in result) {
            noti.error("Xóa thất bại");
            return;
        }

        noti.success("Xóa thành công");
        typeInWarehousesRefetch();
    }

    return (
        <Modal
            opened={modalDeleteTypeInWarehouse}
            title="Xác nhận xóa loại sản phẩm"
            onClose={() => setModalDeleteTypeInWarehouse(false)}
            centered
            classNames={{
                header: classes.header,
                title: classes.title,
            }}
        >
            <Text mt={20}>Bạn có chắc chắn muốn <span style={{ fontWeight: 600, color: "red" }}>xóa</span> loại sản phẩm này không ?</Text>
            <Group mt={20} justify="end">
                <Button
                    loading={isLoading}
                    type="submit"
                    form="create-type-in-warehouse"
                    onClick={handle}
                >Xác nhận</Button>
            </Group>
        </Modal>
    )
}

export default ModalDeleteTypeInWarehouse;