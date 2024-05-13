import React, { useContext } from "react";
import { Image, NavLink, Stack } from "@mantine/core";
import { useNavigate } from "react-router";
import { AppShellContext, TypeAppShellContext } from "@/layout/appShell";
import classes from "./style.module.css";

const AppNavbar: React.FC = () => {
    const navigation = useNavigate();
    const path = window.location.pathname;
    const { links } = useContext<TypeAppShellContext>(AppShellContext);

    return (
        <Stack
            classNames={{
                root: classes.root
            }}
        >
            <Stack gap={10}>
                {
                    links.map((item, i) =>
                        <NavLink
                            key={i}
                            onClick={() => navigation(item.href)}
                            active={path === item.href}
                            label={item.name}
                            classNames={{
                                root: classes.link,
                                label: classes.label,
                            }}
                            leftSection={<Image src={item.hrefIcon} height={30} width={30} />}
                        />
                    )
                }
            </Stack>
        </Stack>
    )
}

export default AppNavbar;