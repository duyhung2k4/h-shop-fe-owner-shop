import React from "react";
import { Button, Group, Image, Text } from "@mantine/core";
import IconRing from "@/assets/icon/ring-ringing-alert-bell-svgrepo-com.svg";
import IconPlus from "@/assets/icon/plus-svgrepo-com.svg";
import classes from "./style.module.css";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";

const ProductHeader: React.FC = () => {
    const navigation = useNavigate();

    return (
        <Group classNames={{ root: classes.root }}>
            <Text classNames={{ root: classes.title }}>Quản lí sản phẩm</Text>
            <Group>
                <Button
                    leftSection={<Image src={IconPlus} height={24} width={24} />}
                    onClick={() => navigation(ROUTER.CREATE_PRODUCT.href)}
                >Thêm mới</Button>
                <Image src={IconRing} height={24} width={24} />
            </Group>
        </Group>
    )
}

export default ProductHeader;