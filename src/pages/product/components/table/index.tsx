import React from 'react';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import TableCustom from '@/components/table';

import { useMemo } from 'react';
import { MRT_ColumnDef, MRT_RowData } from 'mantine-react-table';
import { Group } from '@mantine/core';
import classes from "./style.module.css";



const ProductTable: React.FC = () => {
    const data: TableProductColumn[] = useMemo(() => {
        const data: TableProductColumn[] = Array(50).fill(0).map((_, index) => ({
            Id: `${index + 1}`,
            Name: `Name ${index + 1}`,
            CreateAt: `CreateAt ${index + 1}`,
            Href: `Href ${index + 1}`,
        }))
        return data;
    }, []);

    const columns = useMemo<MRT_ColumnDef<MRT_RowData>[]>(
        () => [
            {
                accessorKey: 'Id',
                header: 'ID',

            },
            {
                accessorKey: 'Name',
                header: 'Tên sản phẩm',
            },
            {
                accessorKey: 'Href',
                header: 'Link sản phẩm',
            },
            {
                accessorKey: 'CreateAt',
                header: 'Ngày tạo',
            },
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
    Id: string
    Name: string
    Href: string
    CreateAt?: Date | string
}

export default ProductTable;