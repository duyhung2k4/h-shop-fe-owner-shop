import React from "react";
import AuthLayout from "../layout/auth";
import ProtectedLayout from "../layout/protected";
import AppshellLayout from "@/layout/appShell";

import { Routes, Route } from "react-router";

import {
    PageDashboard,
    PageLogin,
    PageNotFound,
    PageProduct,
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
                    </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;