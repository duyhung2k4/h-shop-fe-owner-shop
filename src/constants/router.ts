import IconDashboard from "@/assets/icon/dashboard-2-svgrepo-com.svg";
import IconProduct from "@/assets/icon/product-o-svgrepo-com.svg";
import iconOption from "@/assets/icon/option-a-svgrepo-com.svg";
import IconCart from "@/assets/icon/cart-check-svgrepo-com.svg";
import IconWarehouse from "@/assets/icon/warehouse-svgrepo-com.svg";
import IconPayment from "@/assets/icon/payment.svg";
import IconCancelOrder from "@/assets/icon/cancel_order.svg";
import IconOrderHistory from "@/assets/icon/order_history.svg";

export type ObjectRouter = {
    href: string
    name?: string
    hrefIcon?: string
    type: "public" | "protected"
}

export type FieldRouter =
    | "LOGIN"
    | "DASHBOARD"
    | "PRODUCT"
    | "TYPE_PRODUCT"
    | "ORDER_PENDING"
    | "ORDER_HISTORY"
    | "ORDER_DESTROY"
    | "ACCEPT_PAYMENT"
    | "WARE_HOUSE"
    | "CREATE_PRODUCT"
    | "DETAIL_PRODUCT"
    | "UPDATE_PRODUCT";
export const ROUTER: Record<FieldRouter, ObjectRouter> = {
    LOGIN: {
        href: "/login",
        type: "public",
    },
    DASHBOARD: {
        href: "/dashboard",
        type: "protected",
        name: "Tổng quan",
        hrefIcon: IconDashboard,
    },
    PRODUCT: {
        href: "/product",
        type: "protected",
        name: "Sản phẩm",
        hrefIcon: IconProduct,
    },
    TYPE_PRODUCT: {
        href: "/type-product",
        type: "protected",
        name: "Loại sản phẩm",
        hrefIcon: iconOption,
    },
    ORDER_PENDING: {
        href: "/order-pending",
        type: "protected",
        name: "Đơn hàng chờ xác nhận",
        hrefIcon: IconCart,
    },
    WARE_HOUSE: {
        href: "/warehouse",
        type: "protected",
        name: "Kho",
        hrefIcon: IconWarehouse,
    },
    CREATE_PRODUCT: {
        href: "/create-product",
        type: "protected",
    },
    UPDATE_PRODUCT: {
        href: "/update-product",
        type: "protected",
    },
    DETAIL_PRODUCT: {
        href: "/product/:id",
        type: "protected",
    },
    ORDER_HISTORY: {
        href: "/order-history",
        type: "protected",
        name: "Lịch sử đơn hàng",
        hrefIcon: IconOrderHistory,
    },
    ORDER_DESTROY: {
        href: "/order-destroy",
        type: "protected",
        name: "Đơn hủy",
        hrefIcon: IconCancelOrder,
    },
    ACCEPT_PAYMENT: {
        href: "/accept-payment",
        type: "protected",
        name: "Xác nhận thanh toán",
        hrefIcon: IconPayment,
    },
}