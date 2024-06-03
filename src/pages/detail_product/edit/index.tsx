import React, { useContext, useEffect, useMemo, useState } from "react";

import { ActionIcon, Button, Grid, Group, Image, NumberInput, Select, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { DetailProductContext, TypeDetailProductContext } from "..";
import { AppShellContext, TypeAppShellContext } from "@/layout/appShell";
import { fileToBytes } from "@/utils/file";
import { ImageProductModel } from "@/model/imageProduct";
import { useUpdateProductMutation } from "@/redux/api/product.api";

import IconCloseCircle from "@/assets/icon/close-circle-svgrepo-com.svg";
import IconImage from "@/assets/icon/image-square-svgrepo-com.svg";
import IconTrash from "@/assets/icon/trash-alt-svgrepo-com.svg";

import classes from "./style.module.css";
import { useGetCategoryQuery } from "@/redux/api/typeProduct.api";
import { useNotification } from "@/hook/notification.hook";


const DetailProductUpdate: React.FC = () => {
    const {
        defaultField,
        moreField,
        images,
        avatar,
    } = useContext<TypeDetailProductContext>(DetailProductContext);
    const { widthMain } = useContext<TypeAppShellContext>(AppShellContext);
    const noti = useNotification();

    const [post, { isLoading }] = useUpdateProductMutation();
    const {
        data,
        refetch,
    } = useGetCategoryQuery(null);

    const [avatarField, setAvatarField] = useState<ImageProductModel | undefined>(avatar);
    const [imagesField, setImageFields] = useState<ImageProductModel[]>(images);

    const categorys = useMemo(() => {
        return data?.data || [];
    }, [data]);

    
    const formProduct = useForm<FormUpdateProduct>({
        initialValues: {
            name: defaultField["name"],
            categoryId: defaultField["categoryId"],
            price: defaultField["price"],
            files: [],
            fields: Object.keys(moreField).map((key) => ({ name: key, value: moreField[key] })),
        },
    });
    
    useEffect(() => {
        setAvatarField(avatar);
        setImageFields(images);
    }, [images, avatar]);

    useEffect(() => {
        refetch();
    }, []);

    const match_875px = widthMain > 875 ? true : false;

    const handleSubmit = async (value: FormUpdateProduct) => {
        const infoProduct: Record<string, any> = {};
        const files = (await fileToBytes(value.files)).dataReturn;
        const imageAvatar = value.avatar ? (await fileToBytes([value.avatar])).dataReturn[0] : undefined;

        Object.keys(value).forEach((key) => {
            if (filedTemporary.filter((item) => item === key).length === 0) {
                infoProduct[key] = (value as any)[key];
            }
        })
        
        infoProduct["_id"] = defaultField["_id"]
        infoProduct["categoryId"] = Number(infoProduct["categoryId"]);
        value.fields.forEach((item) => infoProduct[item.name] = item.value);

        const listFileIdDeletes = images.
            filter(item => imagesField.filter(img => img.ID === item.ID).length === 0).
            map(item => item.ID);
        if(!imageAvatar && !avatarField && avatar) {
            listFileIdDeletes.push(avatar.ID);
        }

        const result = await post({
            infoProduct,
            listFieldDelete: [],
            files,
            avatar: imageAvatar,
            listFileIdDeletes,
        });

        if ("data" in result) {
            noti.success("Chỉnh sửa sản phẩm thành công");
        } else {
            noti.error("Chỉnh sửa sản phẩm thất bại");
        }
    }

    return (
        <Stack pb={20} mt={20}>
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
                                (avatarField && formProduct.values.avatar === undefined ?
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
                                                onClick={() => setAvatarField(undefined)}
                                            >
                                                <Image src={IconCloseCircle} />
                                            </ActionIcon>
                                            <Image
                                                classNames={{ root: classes.image_product }}
                                                src={`data:${avatarField.format};base64,${avatarField.data}`}
                                            />
                                        </Stack>
                                    </Group>
                                    :
                                    (
                                        (formProduct.values.avatar) ?
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
                                    )
                                )
                            }
                        </Stack>

                        <Stack classNames={{ root: classes.group_image_product }}>
                            <Text className={classes.title}>Hình ảnh sản phẩm</Text>
                            <Dropzone
                                onDrop={(files) => formProduct.setFieldValue("files", files)}
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
                                    imagesField.map((item) =>
                                        <Grid.Col span={4} key={item.ID}>
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
                                                        const newData = imagesField.filter((image) => image.ID !== item.ID);
                                                        setImageFields(newData);
                                                    }}
                                                >
                                                    <Image src={IconCloseCircle} />
                                                </ActionIcon>
                                                <Image
                                                    classNames={{ root: classes.image_product }}
                                                    src={`data:${item.format};base64,${item.data}`}
                                                />
                                            </Stack>
                                        </Grid.Col>
                                    )
                                }
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

type FormUpdateProduct = {
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

export default DetailProductUpdate;