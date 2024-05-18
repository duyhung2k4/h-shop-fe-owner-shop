import React, { createContext, useEffect, useRef, useState } from "react";
import AppNavbar from "@/components/navbar";
import AppHeader from "@/components/header";

import { AppShell, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ObjectRouter, ROUTER } from "@/constants/router";
import { useOutlet } from "react-router";
import useWindowDimensions from "@/hook/screen.hook";

export type TypeAppShellContext = {
    mobileOpened: boolean
    desktopOpened: boolean
    widthMain: number
    toggleMobile: () => void
    toggleDesktop: () => void
    setWidthMain: React.Dispatch<React.SetStateAction<number>>
    links: ObjectRouter[]
}

export const AppShellContext = createContext<TypeAppShellContext>({
    mobileOpened: false,
    desktopOpened: false,
    widthMain: 0,
    toggleMobile: () => { },
    toggleDesktop: () => { },
    setWidthMain: () => {},
    links: [],
})

const AppshellLayout: React.FC = () => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const [widthMain, setWidthMain] = useState<number>(0)
    const outlet = useOutlet();
    const refMain = useRef<HTMLDivElement | null>(null);

    const { width } = useWindowDimensions();

    useEffect(() => {
        setWidthMain(refMain.current?.offsetWidth || 0);
    }, [width]);

    return (
        <AppShellContext.Provider
            value={{
                mobileOpened,
                desktopOpened,
                widthMain,
                toggleMobile,
                toggleDesktop,
                setWidthMain,
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
                        ref={refMain}
                    >
                        {outlet}
                    </Box>
                </AppShell.Main>
            </AppShell>
        </AppShellContext.Provider>
    )
}

export default AppshellLayout;