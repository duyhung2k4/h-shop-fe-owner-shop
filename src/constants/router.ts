import IconDashboard from "@/assets/icon/dashboard-2-svgrepo-com.svg";
import IconProduct from "@/assets/icon/product-o-svgrepo-com.svg";

export type ObjectRouter = {
  href: string
  name?: string
  hrefIcon?: string
  type: "public" | "protected"
}

export type FieldRouter = "LOGIN" | "DASHBOARD" | "PRODUCT";
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
}