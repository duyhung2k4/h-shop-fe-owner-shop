import React from "react";
import { MantineReactTable, MRT_ColumnDef, MRT_RowData } from "mantine-react-table";
import { Box } from "@mantine/core";
import classes from "./style.module.css";


const TableCustom: React.FC<TableCustomType> = (props) => {

    return (
        <Box className={classes.root}>
            <MantineReactTable
                columns={props.columns}
                data={props.data}
                localization={{
                    rowsPerPage: "Số phần tử",
                    showHideFilters: "Lọc",
                    showHideColumns: "Hiển thị dòng",
                    showHideSearch: "Tìm kiếm",
                    toggleDensity: "Độ cao dòng",
                    toggleFullScreen: "Toàn màn hình",
                    noRecordsToDisplay: "Không có sản phẩm nào",
                    showAll: "Hiển thị tất cả",
                    hideAll: "Ẩn tất cả",
                }}
            />
        </Box>
    );
};

export type TableCustomType = {
    columns: MRT_ColumnDef<MRT_RowData>[];
    data: MRT_RowData[];
};

export default TableCustom;
