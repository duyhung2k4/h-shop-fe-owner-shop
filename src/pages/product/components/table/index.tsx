import React, { useContext } from 'react';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import TableCustom from '@/components/table';
import dayjs from "dayjs";

import { useMemo } from 'react';
import { MRT_ColumnDef, MRT_RowData } from 'mantine-react-table';
import { ActionIcon, Group, Image, Tooltip } from '@mantine/core';
import { ProductContext, TypeProductContext } from '../..';
import { useNavigate } from 'react-router';

import IconEdit from "@/assets/icon/edit-svgrepo-com.svg";

import classes from "./style.module.css";
import { ROUTER } from '@/constants/router';



const ProductTable: React.FC = () => {
    const { products } = useContext<TypeProductContext>(ProductContext);
    const navigation = useNavigate();

    const data: TableProductColumn[] = useMemo(() => {
        const data: TableProductColumn[] = products.map((item) => {
            const createAt = dayjs(item.createAt);
            return {
                id: item["_id"],
                name: item["name"],
                createAt: createAt.format("DD-MM-YYYY"),
                price: item["price"],
            }
        });

        return data;
    }, [products]);

    const columns = useMemo<MRT_ColumnDef<MRT_RowData>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'name',
                header: 'Tên sản phẩm',
            },
            {
                accessorKey: 'price',
                header: 'Giá',
            },
            {
                accessorKey: 'createAt',
                header: 'Ngày tạo',
            },
            {
                accessorKey: "action",
                header: "Thao tác",
                Cell: (props) => {
                    return (
                        <Tooltip label="Chi tiết sản phẩm">
                            <ActionIcon
                                bg={"#FFFFFF"}
                                onClick={() =>
                                    navigation(ROUTER.DETAIL_PRODUCT.href.replace(":id",
                                        (props.row.original as TableProductColumn).id
                                    ))}
                            >
                                <Image src={IconEdit} />
                            </ActionIcon>
                        </Tooltip>
                    )
                }
            }
        ],
        [],
    );

    return (
        <Group classNames={{ root: classes.root }}>
            <TableCustom columns={columns} data={data} />
        </Group>
    );
};

export type TableProductColumn = {
    id: string
    name: string
    price: number
    createAt?: Date | string
}

export default ProductTable;