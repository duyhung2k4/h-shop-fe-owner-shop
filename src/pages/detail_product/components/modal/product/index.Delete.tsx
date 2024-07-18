import React, { useContext } from "react";

import { Button, Group, Modal, Text } from "@mantine/core";
import { useNotification } from "@/hook/notification.hook";
import { useDeleteProductMutation } from "@/redux/api/product.api";
import { DetailProductContext, TypeDetailProductContext } from "../../..";

import classes from "./styles.module.css";
import { DeleteProductRequest } from "@/dto/request/product";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";



const ModalDeleteProduct: React.FC = () => {

    const {
        id,
        modalDeleteProduct,
        setModalDeleteProduct,
    } = useContext<TypeDetailProductContext>(DetailProductContext);

    const navigation = useNavigate();
    const noti = useNotification();

    const [post, { isLoading }] = useDeleteProductMutation();

    const handle = async () => {
        if (!id) {
            return
        }
        const deleteProduct: DeleteProductRequest = {
            productId: id || "",
        };

        const result = await post(deleteProduct);
        setModalDeleteProduct(false);

        if ("error" in result) {
            noti.error("Xóa thất bại");
            return;
        }

        noti.success("Xóa thành công");
        navigation(ROUTER.PRODUCT.href);
    }

    return (
        <Modal
            opened={modalDeleteProduct}
            title="Xác nhận xóa sản phẩm"
            onClose={() => setModalDeleteProduct(false)}
            centered
            classNames={{
                header: classes.header,
                title: classes.title,
            }}
        >
            <Text mt={20}>Bạn có chắc chắn muốn <span style={{ fontWeight: 600, color: "red" }}>xóa</span> sản phẩm này không ?</Text>
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

export default ModalDeleteProduct;