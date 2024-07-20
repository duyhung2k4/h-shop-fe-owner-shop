import React, { createContext, useEffect, useMemo, useState } from "react";

import DetailProductUpdate from "./edit";
import IconBack from "@/assets/icon/back-svgrepo-com.svg";
import DetailProductTablist from "./components/tablist";
import TypeInWarehouse from "./typeInWarehouse";
import ModalUpdateTypeInWarehouse from "./components/modal/typeInWarehouse/index.Update";
import ModalDeleteTypeInWarehouse from "./components/modal/typeInWarehouse/index.Delete";
import ModalCreateTypeInWarehouse from "./components/modal/typeInWarehouse/index.Create";

import { ROUTER } from "@/constants/router";
import { DefaultField } from "@/model/product";
import { useNavigate, useParams } from "react-router";
import { ImageProductModel } from "@/model/imageProduct";
import { ActionIcon, Group, Image, Tabs, Text } from "@mantine/core";
import { useGetImagesByProductIdQuery } from "@/redux/api/file.api";
import { TypeInWarehouseRes } from "@/dto/response/typeInWarehouse.response";
import { useGetDetailProductQuery, useGetTypeInWarehouseQuery } from "@/redux/api/product.api";
import DetailProductDelete from "./delete";
import ModalDeleteProduct from "./components/modal/product/index.Delete";



const DetailProduct: React.FC = () => {
    const { id } = useParams();
    const navigation = useNavigate();

    const [idDeleteTypeInWarehouse, setIdDeleteTypeInWarehouse] = useState<number | null>(null);
    const [defaultValueTypeInWarehouse, setDefaultValueTypeInWarehouse] = useState<TypeInWarehouseRes | null>(null);

    const [modalInsertTypeInWarehouse, setModalInsertTypeInWarehouse] = useState<boolean>(false);
    const [modalUpdateTypeInWarehouse, setModalUpdateTypeInWarehouse] = useState<boolean>(false);
    const [modalDeleteTypeInWarehouse, setModalDeleteTypeInWarehouse] = useState<boolean>(false);

    const [modalDeleteProduct, setModalDeleteProduct] = useState<boolean>(false);

    const {
        data: productData,
        refetch: productRefetch,
    } = useGetDetailProductQuery(id || "");
    const {
        data: imageProductData,
        refetch: imageProductRefetch,
    } = useGetImagesByProductIdQuery(id || "");
    const {
        data: typeInWarehousesData,
        refetch: typeInWarehousesRefetch,
    } = useGetTypeInWarehouseQuery(id || "");


    useEffect(() => {
        productRefetch();
        imageProductRefetch();
        typeInWarehousesRefetch();
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
                id: id || "",
                defaultField,
                moreField,
                images,
                avatar,
                tabs: [
                    { key: "edit", value: "Chỉnh sửa" },
                    { key: "typeInWarehouse", value: "Loại sản phẩm" },
                    { key: "delete", value: "Xóa" },
                ],
                idDeleteTypeInWarehouse,
                defaultValueTypeInWarehouse,
                typeInWarehouses: typeInWarehousesData?.data || [],
                modalInsertTypeInWarehouse,
                modalUpdateTypeInWarehouse,
                modalDeleteTypeInWarehouse,
                modalDeleteProduct,
                setIdDeleteTypeInWarehouse,
                setDefaultValueTypeInWarehouse,
                setModalInsertTypeInWarehouse,
                setModalUpdateTypeInWarehouse,
                setModalDeleteTypeInWarehouse,
                setModalDeleteProduct,
                typeInWarehousesRefetch,
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
                <Text style={{ fontSize: 22, fontWeight: 600 }}>Chỉnh sửa sản phẩm</Text>
            </Group>
            <Tabs defaultValue="edit">
                <DetailProductTablist />

                <Tabs.Panel value="edit">
                    {defaultField?.["_id"] && <DetailProductUpdate />}
                </Tabs.Panel>

                <Tabs.Panel value="typeInWarehouse">
                    <TypeInWarehouse/>
                </Tabs.Panel>

                <Tabs.Panel value="delete">
                    <DetailProductDelete/>
                </Tabs.Panel>
            </Tabs>

            <ModalCreateTypeInWarehouse/>
            <ModalUpdateTypeInWarehouse/>
            <ModalDeleteTypeInWarehouse/>
            <ModalDeleteProduct/>
        </DetailProductContext.Provider>
    )
}

export type TypeDetailProductContext = {
    id: string
    defaultField: Record<string, any>
    moreField: Record<string, any>
    avatar?: ImageProductModel
    images: ImageProductModel[]
    tabs: { key: string, value: string }[]
    defaultValueTypeInWarehouse: TypeInWarehouseRes | null
    idDeleteTypeInWarehouse: number | null
    typeInWarehouses: TypeInWarehouseRes[]
    modalInsertTypeInWarehouse: boolean
    modalUpdateTypeInWarehouse: boolean
    modalDeleteTypeInWarehouse: boolean
    modalDeleteProduct: boolean,
    setIdDeleteTypeInWarehouse: React.Dispatch<React.SetStateAction<number | null>>
    setDefaultValueTypeInWarehouse: React.Dispatch<React.SetStateAction<TypeInWarehouseRes | null>>
    setModalInsertTypeInWarehouse: React.Dispatch<React.SetStateAction<boolean>>
    setModalUpdateTypeInWarehouse: React.Dispatch<React.SetStateAction<boolean>>
    setModalDeleteTypeInWarehouse: React.Dispatch<React.SetStateAction<boolean>>
    setModalDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>
    typeInWarehousesRefetch: () => void
}

export const DetailProductContext = createContext<TypeDetailProductContext>({
    id: "",
    defaultField: {},
    moreField: {},
    images: [],
    tabs: [],
    typeInWarehouses: [],
    idDeleteTypeInWarehouse: null,
    defaultValueTypeInWarehouse: null,
    modalInsertTypeInWarehouse: false,
    modalUpdateTypeInWarehouse: false,
    modalDeleteTypeInWarehouse: false,
    modalDeleteProduct: false,
    setIdDeleteTypeInWarehouse: () => {},
    setDefaultValueTypeInWarehouse: () => {},
    setModalInsertTypeInWarehouse: () => {},
    setModalUpdateTypeInWarehouse: () => {},
    setModalDeleteTypeInWarehouse: () => {},
    setModalDeleteProduct: () => {},
    typeInWarehousesRefetch: () => {},
})

export default DetailProduct;