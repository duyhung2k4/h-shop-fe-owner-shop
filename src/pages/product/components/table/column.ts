import { MRT_RowData } from "mantine-react-table";

export const productColumn: MRT_RowData[] = [
    {
        accessorKey: 'name.firstName',
        header: 'First Name',
    },
    {
        accessorKey: 'name.lastName',
        header: 'Last Name',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'city',
        header: 'City',
    },
    {
        accessorKey: 'state',
        header: 'State',
    },
]