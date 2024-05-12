import { lazy } from "react";

// auth page
export const PageLogin = lazy(() => import("@/pages/login"));

// protected page
export const PageDashboard = lazy(() => import("@/pages/dashboard"));
export const PageProduct = lazy(() => import("@/pages/product"));
export const PageTypeProduct = lazy(() => import("@/pages/type_product"));
export const PageOrder = lazy(() => import("@/pages/order"));
export const PageWarehouse = lazy(() => import("@/pages/warehouse"));

// other
export const PageNotFound = lazy(() => import("@/pages/not_found"));