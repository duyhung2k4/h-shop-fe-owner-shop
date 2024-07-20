import { useGetProfileQuery } from "@/redux/api/auth.api";
import { Group, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React, { useContext, useEffect, useMemo } from "react";
import { OrderContext, TypeOrderContext } from "../..";

export const ColumnProfile: React.FC<{ id: number }> = ({ id }) => {
    const { hovered, ref } = useHover();

    const {
        setModalProfile,
        setInfoProfile,
    } = useContext<TypeOrderContext>(OrderContext);

    const {
        data,
        refetch,
    } = useGetProfileQuery(id);

    const profile = useMemo(() => {
        return data?.data
    }, [data]);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Group>
            <Text
                ref={ref}
                style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    textDecoration: hovered ? "underline" : undefined
                }}
                onClick={() => {
                    setModalProfile(true);
                    if(profile) {
                        setInfoProfile(profile);
                    }
                }}
            >{profile?.name}</Text>
        </Group>
    )
}