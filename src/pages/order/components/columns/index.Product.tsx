import { ProductObjectDefaultField } from "@/model/product";
import { useGetDetailProductQuery } from "@/redux/api/product.api";
import React, { useEffect, useMemo } from "react";

export const ColumnProduct: React.FC<{ id: string }> = ({ id }) => {
    const {
        data,
        refetch,
    } = useGetDetailProductQuery(id)

    const product = useMemo(() => {
        return data?.data;
    }, [data]);

    useEffect(() => {
        refetch();
    }, []);

    if(!product) return <></>

    return (
        <>{product[ProductObjectDefaultField.name]}</>
    )
}