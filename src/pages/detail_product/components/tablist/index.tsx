import React, { useContext } from "react";
import { Group, Tabs } from "@mantine/core";

import classes from "./style.module.css";
import { DetailProductContext, TypeDetailProductContext } from "../..";

const DetailProductTablist: React.FC = () => {
    const { tabs } = useContext<TypeDetailProductContext>(DetailProductContext);

    return (
        <Tabs.List className={classes.tab__list}>
            <Group gap={8}>
                {
                    tabs.map((item) =>
                        <Tabs.Tab
                            key={item.key}
                            value={item.key}
                            className={classes.tab}
                            classNames={{
                                tabLabel: classes.tab__label
                            }}
                        >
                            {item.value}
                        </Tabs.Tab>
                    )
                }
            </Group>
        </Tabs.List>
    )
}

export default DetailProductTablist;