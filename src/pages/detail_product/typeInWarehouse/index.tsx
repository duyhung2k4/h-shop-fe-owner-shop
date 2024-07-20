import React, { useContext, useMemo } from "react";
import IconPlus from "@/assets/icon/plus-svgrepo-com.svg";
import TableCustom from "@/components/table";

import { Button, Group, Stack, Image, Tooltip, ActionIcon } from "@mantine/core";
import { DetailProductContext, TypeDetailProductContext } from "..";
import { MRT_ColumnDef, MRT_RowData } from "mantine-react-table";

import classes from "./style.module.css";
import IconEdit from "@/assets/icon/edit-svgrepo-com.svg";
import IconTrash from "@/assets/icon/trash.svg";
import { TypeInWarehouseRes } from "@/dto/response/typeInWarehouse.response";



const TypeInWarehouse: React.FC = () => {
    const {
        typeInWarehouses,
        setModalInsertTypeInWarehouse,
        setModalUpdateTypeInWarehouse,
        setModalDeleteTypeInWarehouse,
        setDefaultValueTypeInWarehouse,
        setIdDeleteTypeInWarehouse,
    } = useContext<TypeDetailProductContext>(DetailProductContext);

    const columns = useMemo<MRT_ColumnDef<MRT_RowData>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Tên loại',
            },
            {
                accessorKey: 'hastag',
                header: 'Hastag',
            },
            {
                accessorKey: 'price',
                header: 'Giá',
            },
            {
                accessorKey: 'count',
                header: 'Số lượng',
            },
            {
                accessorKey: "action",
                header: "Thao tác",
                Cell: (props) => {
                    return (
                        <Group>
                            <Tooltip label="Chỉnh sửa">
                                <ActionIcon
                                    bg={"#FFFFFF"}
                                    onClick={() => {
                                        const typeInWarehouse = props.row.original as TypeInWarehouseRes;
                                        setModalUpdateTypeInWarehouse(true);
                                        setDefaultValueTypeInWarehouse(typeInWarehouse);
                                    }}
                                >
                                    <Image src={IconEdit} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Xóa">
                                <ActionIcon
                                    bg={"#FFFFFF"}
                                    onClick={() => {
                                        const typeInWarehouse = props.row.original as TypeInWarehouseRes;
                                        setModalDeleteTypeInWarehouse(true);
                                        setIdDeleteTypeInWarehouse(typeInWarehouse.id);
                                    }}
                                >
                                    <Image src={IconTrash} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    )
                }
            }
        ],
        [],
    );

    return (
        <>
            <Stack>
                <Group justify="end">
                    <Button
                        leftSection={<Image height={24} width={24} src={IconPlus} />}
                        onClick={() => setModalInsertTypeInWarehouse(true)}
                    >Thêm</Button>
                </Group>
            </Stack>
            <Group classNames={{ root: classes.root }} mt={8}>
                <TableCustom columns={columns} data={typeInWarehouses} />
            </Group>
        </>
    );
}

export default TypeInWarehouse;