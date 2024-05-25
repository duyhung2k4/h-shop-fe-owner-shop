import React from "react";
import AuthLayout from "../layout/auth";
import ProtectedLayout from "../layout/protected";
import AppshellLayout from "@/layout/appShell";

import { Routes, Route } from "react-router";

import {
    PageCreateProduct,
    PageDashboard,
    PageDetailProduct,
    PageLogin,
    PageNotFound,
    PageOrder,
    PageProduct,
    PageTypeProduct,
    PageUpdateProduct,
    PageWarehouse,
} from "./lazy";
import { ROUTER } from "@/constants/router";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path={ROUTER.LOGIN.href} element={<PageLogin />} />

                <Route element={<ProtectedLayout />}>
                    <Route element={<AppshellLayout />}>
                        <Route path={"/"} element={<PageDashboard />} />
                        <Route path={ROUTER.DASHBOARD.href} element={<PageDashboard />} />
                        <Route path={ROUTER.PRODUCT.href} element={<PageProduct />} />
                        <Route path={ROUTER.TYPE_PRODUCT.href} element={<PageTypeProduct />} />
                        <Route path={ROUTER.ORDER.href} element={<PageOrder />} />
                        <Route path={ROUTER.WARE_HOUSE.href} element={<PageWarehouse />} />

                        <Route path={ROUTER.CREATE_PRODUCT.href} element={<PageCreateProduct />} />
                        <Route path={ROUTER.UPDATE_PRODUCT.href} element={<PageUpdateProduct />} />
                        <Route path={ROUTER.DETAIL_PRODUCT.href} element={<PageDetailProduct />} />
                    </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;