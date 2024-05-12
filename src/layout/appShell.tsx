import React, { createContext } from "react";
import AppNavbar from "@/components/navbar";
import AppHeader from "@/components/header";

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ObjectRouter, ROUTER } from "@/constants/router";
import { useOutlet } from "react-router";

export type TypeAppShellContext = {
    mobileOpened: boolean
    desktopOpened: boolean
    toggleMobile: () => void
    toggleDesktop: () => void
    links: ObjectRouter[]
}

export const AppShellContext = createContext<TypeAppShellContext>({
    mobileOpened: false,
    desktopOpened: false,
    toggleMobile: () => { },
    toggleDesktop: () => { },
    links: [
        ROUTER.DASHBOARD,
        ROUTER.PRODUCT,
    ],
})

const AppshellLayout: React.FC = () => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const outlet = useOutlet();

    return (
        <AppShellContext.Provider
            value={{
                mobileOpened,
                desktopOpened,
                toggleMobile,
                toggleDesktop,
                links: [
                    ROUTER.DASHBOARD,
                    ROUTER.PRODUCT,
                ],
            }}
        >
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <AppHeader />
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <AppNavbar />
                </AppShell.Navbar>
                <AppShell.Main>{outlet}</AppShell.Main>
            </AppShell>
        </AppShellContext.Provider>
    )
}

export default AppshellLayout;