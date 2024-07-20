import React, { useContext } from "react";

import { Modal, Stack, TextInput } from "@mantine/core";
import { OrderContext, TypeOrderContext } from "../..";

import classes from "./styles.module.css";
import dayjs from "dayjs";



export const ModalUser: React.FC = () => {

    const {
        infoProfile,
        modalProfile,
        setModalProfile,
    } = useContext<TypeOrderContext>(OrderContext);

    return (
        <Modal
            opened={modalProfile}
            title="Thông tin người mua"
            onClose={() => setModalProfile(false)}
            centered
            classNames={{
                header: classes.header,
                title: classes.title,
            }}
        >
            <form>
                <Stack gap={12} mt={20}>
                    <TextInput
                        label="Tên người dùng"
                        readOnly
                        value={infoProfile?.name}
                    />
                    <TextInput
                        label="Số điện thoại"
                        readOnly
                        value={infoProfile?.phone}
                    />
                    <TextInput
                        label="Giới tính"
                        readOnly
                        value={infoProfile?.gender}
                    />
                    <TextInput
                        label="Địa chỉ"
                        readOnly
                        value={infoProfile?.address}
                    />
                    <TextInput
                        label="Ngày sinh"
                        readOnly
                        value={dayjs(infoProfile?.birth).format("DD/MM/YYYY")}
                    />
                </Stack>
            </form>
        </Modal>
    )
}