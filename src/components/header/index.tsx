import React, { useContext } from "react";
import { Burger, Group, Image } from "@mantine/core";
import { AppShellContext, TypeAppShellContext } from "@/layout/appShell";
import Logo from "@/assets/icon/app_icon.svg";
import classes from "./style.module.css";

const AppHeader: React.FC = () => {
    const {
        mobileOpened,
        desktopOpened,
        toggleMobile,
        toggleDesktop,
    } = useContext<TypeAppShellContext>(AppShellContext);

    return (
        <Group classNames={{ root: classes.root }}>
            <Group h="100%" px="md">
                <Burger opened={mobileOpened} color={"#FFFFFF"} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Burger opened={desktopOpened} color={"#FFFFFF"} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                <Image height={30} width={30} src={Logo} />
            </Group>
        </Group>
    )
}

export default AppHeader;