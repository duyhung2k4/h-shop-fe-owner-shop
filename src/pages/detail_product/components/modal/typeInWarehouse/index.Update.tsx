import React, { useContext, useEffect } from "react";
import { Button, Group, Modal, NumberInput, Stack, TextInput } from "@mantine/core";

import { useParams } from "react-router";
import { useUpdateTypeInWarehouseMutation } from "@/redux/api/product.api";
import { useForm } from "@mantine/form";
import { UpdateTypeInWarehouseReq } from "@/dto/request/typeInWarehouse";
import { useNotification } from "@/hook/notification.hook";
import { DetailProductContext, TypeDetailProductContext } from "../../..";

import classes from "./styles.module.css";



const ModalUpdateTypeInWarehouse: React.FC = () => {
    const { id } = useParams();
    const noti = useNotification();
    const { 
        defaultValueTypeInWarehouse,
        modalUpdateTypeInWarehouse,
        typeInWarehousesRefetch,
        setDefaultValueTypeInWarehouse,
        setModalUpdateTypeInWarehouse,
    } = useContext<TypeDetailProductContext>(DetailProductContext);
    const [post, { isLoading }] = useUpdateTypeInWarehouseMutation();

    const form = useForm<FormCreateTypeInWarehouse>({
        initialValues: {
            name: defaultValueTypeInWarehouse?.name || "",
            hastag: defaultValueTypeInWarehouse?.hastag || "",
            count: defaultValueTypeInWarehouse?.count || 0,
            price: defaultValueTypeInWarehouse?.price,
        }
    });

    const handle = async (values: FormCreateTypeInWarehouse) => {
        if (!id || !defaultValueTypeInWarehouse?.id) {
            return
        }
        const newTypeInWarehouse: UpdateTypeInWarehouseReq = {
            id: defaultValueTypeInWarehouse.id,
            ...values,
        };

        const result = await post(newTypeInWarehouse);
        setModalUpdateTypeInWarehouse(false);
        
        if ("error" in result) {
            noti.error("Chỉnh sửa thất bại");
            return;
        }
        
        form.reset();
        noti.success("Chỉnh sửa thành công");
        setDefaultValueTypeInWarehouse(null);
        typeInWarehousesRefetch();
    }

    useEffect(() => {
        if(!defaultValueTypeInWarehouse) return;
        form.setValues({
            name: defaultValueTypeInWarehouse.name,
            hastag: defaultValueTypeInWarehouse.hastag,
            count: defaultValueTypeInWarehouse.count,
            price: defaultValueTypeInWarehouse.price,
        })
    }, [defaultValueTypeInWarehouse]);

    return (
        <Modal
            opened={modalUpdateTypeInWarehouse}
            title="Chỉnh sửa 1 loại sản phẩm"
            onClose={() => {
                setModalUpdateTypeInWarehouse(false)
                setDefaultValueTypeInWarehouse(null);
            }}
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

export default ModalUpdateTypeInWarehouse;