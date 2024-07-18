import React, { useContext } from "react";
import { Button, Group, Modal, NumberInput, Stack, TextInput } from "@mantine/core";

import classes from "./styles.module.css";
import { useParams } from "react-router";
import { useCreateTypeInWarehouseMutation } from "@/redux/api/product.api";
import { useForm } from "@mantine/form";
import { CreateTypeInWarehouseReq } from "@/dto/request/typeInWarehouse";
import { useNotification } from "@/hook/notification.hook";
import { DetailProductContext, TypeDetailProductContext } from "../../..";

const ModalCreateTypeInWarehouse: React.FC = () => {
    const { id } = useParams();
    const noti = useNotification();
    const { 
        modalInsertTypeInWarehouse, 
        setModalInsertTypeInWarehouse,
        typeInWarehousesRefetch,
    } = useContext<TypeDetailProductContext>(DetailProductContext);
    const [post, { isLoading }] = useCreateTypeInWarehouseMutation();

    const form = useForm<FormCreateTypeInWarehouse>({
        initialValues: {
            name: "",
            hastag: "",
            count: 0,
            price: undefined,
        }
    });

    const handle = async (values: FormCreateTypeInWarehouse) => {
        if (!id) {
            return
        }
        const newTypeInWarehouse: CreateTypeInWarehouseReq = {
            productId: id,
            ...values,
        };

        const result = await post(newTypeInWarehouse);
        setModalInsertTypeInWarehouse(false);
        
        if ("error" in result) {
            noti.error("Thêm mới thất bại");
            return;
        }
        
        form.reset();
        noti.success("Thêm mới thành công");
        typeInWarehousesRefetch();
    }

    return (
        <Modal
            opened={modalInsertTypeInWarehouse}
            title="Thêm 1 loại sản phẩm"
            onClose={() => setModalInsertTypeInWarehouse(false)}
            centered
            classNames={{
                header: classes.header,
                title: classes.title,
            }}
        >
            <form id="create-type-in-warehouse" onSubmit={form.onSubmit(handle)}>
                <Stack gap={12} mt={20}>
                    <TextInput
                        label="Tên loại"
                        placeholder="Nhập tên loại"
                        required
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Hastag"
                        placeholder="Nhập hastag"
                        required
                        {...form.getInputProps("hastag")}
                    />
                    <NumberInput
                        label="Giá"
                        placeholder="Nhập giá"
                        {...form.getInputProps("price")}
                    />
                    <NumberInput
                        label="Số lượng"
                        placeholder="Nhập số lượng"
                        required
                        {...form.getInputProps("count")}
                    />
                </Stack>
            </form>
            <Group mt={20} justify="end">
                <Button 
                    loading={isLoading}
                    type="submit"
                    form="create-type-in-warehouse"
                >Hoàn tất</Button>
            </Group>
        </Modal>
    )
}

type FormCreateTypeInWarehouse = {
    hastag: string
    name: string
    price?: number
    count: number
}

export default ModalCreateTypeInWarehouse;