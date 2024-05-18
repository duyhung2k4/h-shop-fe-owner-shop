import React, { useContext } from "react";
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { AppShellContext, TypeAppShellContext } from "@/layout/appShell";

import IconBack from "@/assets/icon/back-svgrepo-com.svg";
import IconImage from "@/assets/icon/image-square-svgrepo-com.svg";
import IconCloseCircle from "@/assets/icon/close-circle-svgrepo-com.svg";

import classes from "./style.module.css";
import { fileToBytes } from "@/utils/file";
import { useCreateProductMutation } from "@/redux/api/product.api";

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
    })
    const match_875px = widthMain > 875 ? true : false;

    const [post, { isLoading }] = useCreateProductMutation();

    const handleSubmit = async (value: FormCreateProduct) => {
        const infoProduct: Record<string, any> = {};
        const files = (await fileToBytes(value.files)).dataReturn;
        Object.keys(value).forEach((key) => {
            if (key !== "fields" && key !== "files") {
                infoProduct[key] = (value as any)[key];
            }
        })
        value.fields.forEach((item) => infoProduct[item.name] = item.value);

        const result = await post({
            infoProduct,
            files,
        });

        console.log(result);
    }

    return (
        <Stack pb={20}>
            <Group gap={20}>
                <ActionIcon
                    style={{
                        backgroundColor: "#FFF"
                    }}
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
                                data={[]}
                                {...formProduct.getInputProps("categoryId")}
                            />
                            <NumberInput
                                placeholder="Nhập giá sản phẩm"
                                label="Giá sản phẩm"
                                {...formProduct.getInputProps("price")}
                            />
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
                                                    <Image src={IconCloseCircle}/>
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
                                    <Grid key={i}>
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
                <Button type="submit" form="create-product">Hoàn tất</Button>
            </Group>
        </Stack>
    )
}

export type FormCreateProduct = {
    name: string
    categoryId: number
    price: number
    fields: Field[]
    files: FileWithPath[]
}

type Field = {
    name: string
    value: string
}

export default CreateProduct;