import React, { useContext } from "react";
import { Burger, Group, Image } from "@mantine/core";
import { AppShellContext, TypeAppShellContext } from "@/layout/appShell";
import Logo from "@/assets/icon/app_icon.svg";

const AppHeader: React.FC = () => {
    const {
        mobileOpened,
        desktopOpened,
        toggleMobile,
        toggleDesktop,
    } = useContext<TypeAppShellContext>(AppShellContext);

    return (
        <Group h="100%" px={0} align="start">
            <Group h="100%" px="md">
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                <Image height={30} width={30} src={Logo} />
            </Group>
        </Group>
    )
}

export default AppHeader;