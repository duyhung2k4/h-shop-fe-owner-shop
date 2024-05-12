import IconDashboard from "@/assets/icon/dashboard-2-svgrepo-com.svg";
import IconProduct from "@/assets/icon/product-o-svgrepo-com.svg";
import iconOption  from "@/assets/icon/option-a-svgrepo-com.svg";
import IconCart from "@/assets/icon/cart-check-svgrepo-com.svg";
import IconWarehouse from "@/assets/icon/warehouse-svgrepo-com.svg";

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
    | "ORDER"
    | "WARE_HOUSE";
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
  ORDER: {
    href: "/order",
    type: "protected",
    name: "Đơn hàng",
    hrefIcon: IconCart,
  },
  WARE_HOUSE: {
    href: "/warehouse",
    type: "protected",
    name: "Kho",
    hrefIcon: IconWarehouse,
  }
}