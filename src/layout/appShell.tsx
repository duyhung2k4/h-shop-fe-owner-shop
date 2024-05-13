import React, { createContext } from "react";
import AppNavbar from "@/components/navbar";
import AppHeader from "@/components/header";

import { AppShell, Box } from '@mantine/core';
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
    links: [],
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
                    ROUTER.TYPE_PRODUCT,
                    ROUTER.ORDER,
                    ROUTER.WARE_HOUSE,
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
                <AppShell.Navbar p={0}>
                    <AppNavbar />
                </AppShell.Navbar>
                <AppShell.Main>
                    <Box
                        style={{
                            width: "100%",
                            height: "calc(100vh - 2*16px - 60px)"
                        }}
                    >
                        {outlet}
                    </Box>
                </AppShell.Main>
            </AppShell>
        </AppShellContext.Provider>
    )
}

export default AppshellLayout;