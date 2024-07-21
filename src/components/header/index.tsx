import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

import { ActionIcon, Burger, Group, Image, Menu } from "@mantine/core";
import { AppShellContext, TypeAppShellContext } from "@/layout/appShell";
import { useNavigate } from "react-router";
import { TOKEN_TYPE } from "@/model/variable";
import { ROUTER } from "@/constants/router";

import Logo from "@/assets/icon/app_icon.svg";
import IconUser from "@/assets/icon/user-svgrepo-com.svg";
import IconLogin from "@/assets/icon/login.svg";
import IconLogout from "@/assets/icon/logout.svg";
import classes from "./style.module.css";
import { ModalUser } from "./components/modal";



const AppHeader: React.FC = () => {
    const {
        mobileOpened,
        desktopOpened,
        toggleMobile,
        toggleDesktop,
    } = useContext<TypeAppShellContext>(AppShellContext);

    const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
    const navigate = useNavigate();
    const [modalInfo, setModalInfo] = useState<boolean>(false);

    const handleLogout = () => {
        Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
        Cookies.remove(TOKEN_TYPE.REFRESH_TOKEN);
        navigate(ROUTER.LOGIN.href);
    }

    return (
        <HeaderContext.Provider
            value={{
                modalInfo,
                setModalInfo,
            }}
        >
            <Group justify="space-between" classNames={{ root: classes.root }}>
                <Group h="100%" px="md">
                    <Burger opened={mobileOpened} color={"#FFFFFF"} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} color={"#FFFFFF"} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    <Image height={30} width={30} src={Logo} />
                </Group>

                <Menu>
                    <Menu.Target>
                        <ActionIcon size={24}>
                            <Image src={IconUser} />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown
                        style={{
                            border: "1px solid black",
                            minWidth: 200,
                        }}>
                        {
                            token ?
                                <>
                                    <Menu.Item
                                        onClick={() => setModalInfo(true)}
                                        className={classes.menu_item}
                                        leftSection={<Image src={IconUser} width="20px" height="20px" />}
                                    >
                                        Thông tin người dùng
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={handleLogout}
                                        className={classes.menu_item}
                                        leftSection={<Image src={IconLogout} width="20px" height="20px" />}
                                    >
                                        Đăng xuất
                                    </Menu.Item>
                                </>
                                :
                                <Menu.Item
                                    onClick={() => navigate(ROUTER.LOGIN.href)}
                                    className={classes.menu_item}
                                    leftSection={<Image src={IconLogin} width="20px" height="20px" />}
                                >
                                    Đăng nhập
                                </Menu.Item>
                        }
                    </Menu.Dropdown>
                </Menu>
            </Group>

            <ModalUser/>
        </HeaderContext.Provider>
    )
}

export type TypeHeaderContext = {
    modalInfo: boolean
    setModalInfo: (value: boolean) => void
}

export const HeaderContext = createContext<TypeHeaderContext>({
    modalInfo: false,
    setModalInfo: (_: boolean) => { },
})


export default AppHeader;