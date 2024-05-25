import { lazy } from "react";

// auth page
export const PageLogin = lazy(() => import("@/pages/login"));

// protected page
export const PageDashboard = lazy(() => import("@/pages/dashboard"));
export const PageProduct = lazy(() => import("@/pages/product"));
export const PageTypeProduct = lazy(() => import("@/pages/type_product"));
export const PageOrder = lazy(() => import("@/pages/order"));
export const PageWarehouse = lazy(() => import("@/pages/warehouse"));
export const PageCreateProduct = lazy(() => import("@/pages/create_product"));
export const PageUpdateProduct = lazy(() => import("@/pages/update_product"));
export const PageDetailProduct = lazy(() => import("@/pages/detail_product"));

// other
export const PageNotFound = lazy(() => import("@/pages/not_found"));