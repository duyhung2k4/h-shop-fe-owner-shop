import React, { createContext, useEffect, useMemo } from "react";
import DetailProductUpdate from "./edit";

import { useGetDetailProductQuery } from "@/redux/api/product.api";
import { useNavigate, useParams } from "react-router";
import { ActionIcon, Group, Image, Tabs } from "@mantine/core";
import { DefaultField } from "@/model/product";
import { ROUTER } from "@/constants/router";
import { useGetImagesByProductIdQuery } from "@/redux/api/file.api";
import { ImageProductModel } from "@/model/imageProduct";

import IconBack from "@/assets/icon/back-svgrepo-com.svg";
import DetailProductTablist from "./components/tablist";

const DetailProduct: React.FC = () => {
    const { id } = useParams();
    const navigation = useNavigate();

    const {
        data: productData,
        refetch: productRefetch,
    } = useGetDetailProductQuery(id || "");
    const {
        data: imageProductData,
        refetch: imageProductRefetch,
    } = useGetImagesByProductIdQuery(id || "");


    useEffect(() => {
        productRefetch();
        imageProductRefetch();
    }, []);

    const {
        defaultField,
        moreField,
        images,
        avatar,
    } = useMemo(() => {
        const product = productData?.data;
        const images = imageProductData?.data?.images || ([] as ImageProductModel[]);
        const avatar = imageProductData?.data?.avatar;

        if (product === undefined) {
            return {
                defaultField: {},
                moreField: {},
                images: [],
                avatar,
            }
        };

        const defaultField: Record<string, any> = {};
        const moreField: Record<string, any> = {};

        Object.keys(product).forEach((key) => {
            if (DefaultField.filter((item) => item === key).length === 0) {
                moreField[key] = product[key];
            } else {
                defaultField[key] = product[key];
            }
        })

        return {
            defaultField,
            moreField,
            images,
            avatar,
        }
    }, [productData, imageProductData]);

    return (
        <DetailProductContext.Provider
            value={{
                defaultField,
                moreField,
                images,
                avatar,
                tabs: [
                    { key: "edit", value: "Chỉnh sửa" },
                    { key: "voucher", value: "Voucher" },
                    { key: "delete", value: "Xóa" },
                ],
            }}
        >
            <Group gap={20}>
                <ActionIcon
                    style={{
                        backgroundColor: "#FFF"
                    }}
                    onClick={() => navigation(ROUTER.PRODUCT.href)}
                    size={26}
                >
                    <Image src={IconBack} />
                </ActionIcon>
            </Group>
            <Tabs defaultValue="edit">
                <DetailProductTablist />

                <Tabs.Panel value="edit">
                    {defaultField?.["_id"] && <DetailProductUpdate />}
                </Tabs.Panel>

                <Tabs.Panel value="voucher">
                    Messages tab content
                </Tabs.Panel>

                <Tabs.Panel value="delete">
                    Settings tab content
                </Tabs.Panel>
            </Tabs>
        </DetailProductContext.Provider>
    )
}

export type TypeDetailProductContext = {
    defaultField: Record<string, any>
    moreField: Record<string, any>
    avatar?: ImageProductModel
    images: ImageProductModel[]
    tabs: { key: string, value: string }[]
}

export const DetailProductContext = createContext<TypeDetailProductContext>({
    defaultField: {},
    moreField: {},
    images: [],
    tabs: [],
})

export default DetailProduct;