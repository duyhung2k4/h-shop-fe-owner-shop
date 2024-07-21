import React, { useContext, useEffect, useMemo } from "react";
import classes from "./styles.module.css";
import dayjs from "dayjs";
import 'dayjs/locale/vi';

import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { HeaderContext, TypeHeaderContext } from "../..";
import { DateInput } from "@mantine/dates";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/api/auth.api";
import { useAppSelector } from "@/redux/hook";
import { ProfileModel } from "@/model/profile";
import { useNotification } from "@/hook/notification.hook";



export const ModalUser: React.FC = () => {

    const id = useAppSelector(state => state.authSlice.profile?.ID);

    const {
        modalInfo,
        setModalInfo,
    } = useContext<TypeHeaderContext>(HeaderContext);

    const noti = useNotification();

    const form = useForm<TypeUpdateProfile>({
        initialValues: {
            name: "",
            phone: "",
            gender: "Nam",
            address: "",
            birth: null,
        },
        validate: {
            name: (e) => e.length === 0 ? "Không được bỏ trống" : null,
            phone: (e) => e.length === 0 ? "Không được bỏ trống" : null,
            gender: (e) => e.length === 0 ? "Không được bỏ trống" : null,
            address: (e) => e.length === 0 ? "Không được bỏ trống" : null,
            birth: (e) => e === null ? "Không được bỏ trống" : null,
        },
    })

    const {
        data: dataProfile,
        refetch: refetchProfile,
    } = useGetProfileQuery(id || 0);
    const [post, { isLoading }] = useUpdateProfileMutation();

    const profile = useMemo(() => {
        return dataProfile?.data;
    }, [dataProfile]);

    useEffect(() => {
        if(modalInfo) {
            refetchProfile();
        }
    }, [modalInfo]);

    useEffect(() => {
        form.setValues({
            name: profile?.name,
            phone: profile?.phone,
            gender: profile?.gender,
            address: profile?.address,
            birth: dayjs(profile?.birth).format("YYYY") === "0001" ? null : dayjs(profile?.birth).toDate(),
        })
    }, [profile]);

    const handleUpdate = async (values: TypeUpdateProfile) => {
        if(!profile?.ID) {
            return;
        }
        const newProfile = {
            ...profile,
            ...values,
        } as ProfileModel

        const result = await post(newProfile);
        if("error" in result) {
            noti.error("Chỉnh sửa thất bại");
            return;
        }

        noti.success("Chỉnh sửa thành công");
    }

    return (
        <Modal
            opened={modalInfo}
            title="Thông tin người dùng"
            onClose={() => setModalInfo(false)}
            centered
            classNames={{
                header: classes.header,
                title: classes.title,
            }}
        >
            <form id="update-profile" onSubmit={form.onSubmit(handleUpdate)}>
                <Stack gap={12} w={"100%"} mt={20}>
                    <TextInput
                        label="Tên người dùng"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Số điện thoại"
                        {...form.getInputProps("phone")}
                    />
                    <Select
                        label="Giới tính"
                        {...form.getInputProps("gender")}
                        data={[
                            { label: "Nam", value: "Nam" },
                            { label: "Nữ", value: "Nữ" },
                        ]}
                    />
                    <TextInput
                        label="Địa chỉ"
                        {...form.getInputProps("address")}
                    />
                    <DateInput
                        label="Ngày sinh"
                        {...form.getInputProps("birth")}
                        locale="vi"
                        valueFormat="DD/MM/YYYY"
                    />
                </Stack>
            </form>

            <Group w={"100%"} mt={20} justify="end">
                <Button
                    type="submit"
                    loading={isLoading}
                    form="update-profile"
                >Chỉnh sửa</Button>
            </Group>
        </Modal>
    )
}

type TypeUpdateProfile = {
    name: string
    phone: string
    gender: string
    address: string
    birth: Date | null
}