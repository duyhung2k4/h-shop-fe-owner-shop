import React, { useContext, useEffect, useMemo } from "react";
import {
    ActionIcon,
    Button,
    Grid,
    Group,
    Image,
    NumberInput,
    Select,
    Stack,
    Text,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { AppShellContext, TypeAppShellContext } from "@/layout/appShell";
import { fileToBytes } from "@/utils/file";
import { useCreateProductMutation } from "@/redux/api/product.api";
import { useNotification } from "@/hook/notification.hook";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";

import classes from "./style.module.css";

import IconBack from "@/assets/icon/back-svgrepo-com.svg";
import IconImage from "@/assets/icon/image-square-svgrepo-com.svg";
import IconCloseCircle from "@/assets/icon/close-circle-svgrepo-com.svg";
import IconTrash from "@/assets/icon/trash-alt-svgrepo-com.svg";
import { useGetCategoryQuery } from "@/redux/api/typeProduct.api";

const CreateProduct: React.FC = () => {
    const { widthMain } = useContext<TypeAppShellContext>(AppShellContext)
    const formProduct = useForm<FormCreateProduct>({
        initialValues: {
            name: "",
            categoryId: 0,
            price: 0,
            fields: [],
            files: [],
        }
    });

    const [post, { isLoading }] = useCreateProductMutation();
    const {
        data,
        refetch,
    } = useGetCategoryQuery(null);

    const navigation = useNavigate();
    const noti = useNotification();

    const match_875px = widthMain > 875 ? true : false;

    const categorys = useMemo(() => {
        return data?.data || [];
    }, [data]);

    useEffect(() => {
        refetch();
    }, []);

    const handleSubmit = async (value: FormCreateProduct) => {
        const infoProduct: Record<string, any> = {};
        const files = (await fileToBytes(value.files)).dataReturn;
        const avatar = value.avatar ? (await fileToBytes([value.avatar])).dataReturn[0] : undefined;
        Object.keys(value).forEach((key) => {
            if (filedTemporary.filter((item) => item === key).length === 0) {
                infoProduct[key] = (value as any)[key];
            }
        });
        
        infoProduct["categoryId"] = Number(infoProduct["categoryId"]);
        value.fields.forEach((item) => infoProduct[item.name] = item.value);

        const result = await post({
            infoProduct,
            files,
            avatar,
        });

        if ("data" in result) {
            navigation(ROUTER.PRODUCT.href);
            noti.success("Tạo sản phẩm thành công");
        } else {
            noti.error("Tạo sản phẩm thất bại");
        }
    }

    return (
        <Stack pb={20}>
            <Group gap={20}>
                <ActionIcon
                    style={{
                        backgroundColor: "#FFF"
                    }}
                    onClick={() => navigation(ROUTER.PRODUCT.href)}
                >
                    <Image src={IconBack} height={26} width={26} />
                </ActionIcon>
                <Text size="20px" fw={600}>Thêm mới sản phẩm</Text>
            </Group>

            <form id="create-product" onSubmit={formProduct.onSubmit(handleSubmit)}>
                <Grid gutter={10}>
                    <Grid.Col span={match_875px ? 6 : 12}>
                        <Stack classNames={{ root: classes.base_info }}>
                            <Text className={classes.title}>Thông tin cơ bản</Text>
                            <TextInput
                                placeholder="Nhập tên sản phẩm"
                                label="Tên sản phẩm"
                                {...formProduct.getInputProps("name")}
                            />
                            <Select
                                label="Danh mục"
                                data={categorys.map((item) => ({
                                    value: `${item.ID}`,
                                    label: item.name,
                                }))}
                                {...formProduct.getInputProps("categoryId")}
                            />
                            <NumberInput
                                placeholder="Nhập giá sản phẩm"
                                label="Giá sản phẩm"
                                {...formProduct.getInputProps("price")}
                            />
                        </Stack>

                        <Stack classNames={{ root: classes.group_image_product }}>
                            <Text className={classes.title}>Ảnh đại diện sản phẩm</Text>
                            {
                                formProduct.values.avatar ?
                                    <Group w={"100%"} justify="center">
                                        <Stack
                                            gap={0}
                                            align="end"
                                            w={"50%"}
                                        >
                                            <ActionIcon
                                                size={24}
                                                mb={-12}
                                                mr={-12}
                                                radius={24}
                                                bg={"#FFFFFF"}
                                                onClick={() => {
                                                    formProduct.setFieldValue("avatar", undefined);
                                                }}
                                            >
                                                <Image src={IconCloseCircle} />
                                            </ActionIcon>
                                            <Image
                                                classNames={{ root: classes.image_product }}
                                                src={URL.createObjectURL(formProduct.values.avatar)}
                                            />
                                        </Stack>
                                    </Group>
                                    :
                                    <Dropzone
                                        onDrop={(files) => formProduct.setFieldValue("avatar", files[0])}
                                        onReject={(files) => { console.log(files) }}
                                        accept={IMAGE_MIME_TYPE}
                                        maxFiles={1}
                                        multiple={false}
                                    >
                                        <Group classNames={{ root: classes.dropzone }}>
                                            <Image src={IconImage} height={40} />
                                            <Text>Thêm ảnh của sản phẩm vào đây</Text>
                                        </Group>
                                    </Dropzone>
                            }
                        </Stack>

                        <Stack classNames={{ root: classes.group_image_product }}>
                            <Text className={classes.title}>Hình ảnh sản phẩm</Text>
                            <Dropzone
                                onDrop={(files) => {
                                    const data = [
                                        ...files,
                                        ...formProduct.values.files,
                                    ]
                                    formProduct.setFieldValue("files", data)
                                }}
                                onReject={(files) => { console.log(files) }}
                                accept={IMAGE_MIME_TYPE}
                            >
                                <Group classNames={{ root: classes.dropzone }}>
                                    <Image src={IconImage} height={40} />
                                    <Text>Thêm ảnh của sản phẩm vào đây</Text>
                                </Group>
                            </Dropzone>
                            <Grid>
                                {
                                    formProduct.values.files.map((item, index) =>
                                        <Grid.Col span={4} key={index}>
                                            <Stack
                                                gap={0}
                                                align="end"
                                            >
                                                <ActionIcon
                                                    size={24}
                                                    mb={-12}
                                                    mr={-12}
                                                    radius={24}
                                                    bg={"#FFFFFF"}
                                                    onClick={() => {
                                                        const newImages = formProduct.values.files.filter((item, i) => i !== index);
                                                        formProduct.setFieldValue("files", newImages);
                                                    }}
                                                >
                                                    <Image src={IconCloseCircle} />
                                                </ActionIcon>
                                                <Image
                                                    classNames={{ root: classes.image_product }}
                                                    src={URL.createObjectURL(item)}
                                                />
                                            </Stack>
                                        </Grid.Col>
                                    )
                                }
                            </Grid>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={match_875px ? 6 : 12}>
                        <Stack classNames={{ root: classes.more_info }}>
                            <Text className={classes.title}>Thông tin thêm</Text>
                            {
                                formProduct.values.fields.map((item, i) =>
                                    <Grid key={i} columns={13}>
                                        <Grid.Col span={6}>
                                            <TextInput
                                                placeholder="Nhập tên trường"
                                                value={item.name}
                                                onChange={(e) => {
                                                    const listNewValues = formProduct.values.fields.map((field, index) =>
                                                        i === index ? { name: e.target.value, value: field.value } : field
                                                    )
                                                    formProduct.setFieldValue("fields", listNewValues);
                                                }}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <TextInput
                                                placeholder="Nhập giá trị"
                                                value={item.value}
                                                onChange={(e) => {
                                                    const listNewValues = formProduct.values.fields.map((field, index) =>
                                                        i === index ? { name: field.name, value: e.target.value } : field
                                                    )
                                                    formProduct.setFieldValue("fields", listNewValues);
                                                }}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={1}>
                                            <Group h={"100%"} w={"100%"} justify="center">
                                                <Tooltip label="Xóa thông tin">
                                                    <ActionIcon
                                                        size={24}
                                                        bg={"#FFFFFF"}
                                                        onClick={() => {
                                                            const listNewValues = formProduct.values.fields.filter((_, index) => index !== i);
                                                            formProduct.setFieldValue("fields", listNewValues);
                                                        }}
                                                    >
                                                        <Image src={IconTrash} />
                                                    </ActionIcon>
                                                </Tooltip>
                                            </Group>
                                        </Grid.Col>
                                    </Grid>
                                )
                            }
                            <Group justify="end">
                                <Button
                                    onClick={() => formProduct.setFieldValue(
                                        "fields",
                                        [...formProduct.values.fields, { name: "", value: "" }],
                                    )}
                                >Thêm 1 trường thông tin</Button>
                            </Group>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </form>

            <Group>
                <Button
                    type="submit"
                    form="create-product"
                    loading={isLoading}
                >Hoàn tất</Button>
            </Group>
        </Stack>
    )
}

type FormCreateProduct = {
    name: string
    categoryId: number
    price: number
    fields: Field[]
    avatar?: FileWithPath
    files: FileWithPath[]
}

type Field = {
    name: string
    value: string
}

const filedTemporary = ["fields", "files", "avatar"]

export default CreateProduct;