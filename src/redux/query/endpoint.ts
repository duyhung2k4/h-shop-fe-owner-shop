import { TOKEN_TYPE } from "@/model/variable";
import Cookies from "js-cookie";

export const HEADER = {
    defaultHeader: () => ({
        accept: 'application/json',
    }),
    refreshTokenHeader: () => {
        const token = Cookies.get(TOKEN_TYPE.REFRESH_TOKEN);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    },
    protectedHeader: () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
}

export const endPoint = {
    auth: {
        getProfile: () => ({
            url: "account/api/v1/public/profile",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
        loginGoogle: () => ({
            url: "account/api/v1/public/login-google",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        refreshToken: () => ({
            url: "account/api/v1/protected/refresh-token",
            method: "POST",
            headers: HEADER.refreshTokenHeader(),
        }),
    },
    shop: {
        getShop: () => ({
            url: "shop/api/v1/protected/shop",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        getDetailShop: () => ({
            url: "shop/api/v1/protected/shop/get-detail-shop",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        createShop: () => ({
            url: "shop/api/v1/protected/shop",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        checkDuplicate: () => ({
            url: "shop/api/v1/protected/shop/check-duplicate",
            method: "GET",
            headers: HEADER.protectedHeader(),
        })
    },
    typeProduct: {
        getTypeProduct: () => ({
            url: "shop/api/v1/protected/type-product",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        getCategory: () => ({
            url: "shop/api/v1/public/category",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
        createTypeProduct: () => ({
            url: "shop/api/v1/protected/type-product",
            method: "POST",
            headers: HEADER.protectedHeader(),
        })
    },
    product: {
        createProduct: () => ({
            url: "product/api/v1/protected/product",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        update: () => ({
            url: "product/api/v1/protected/product",
            method: "PUT",
            headers: HEADER.protectedHeader(),
        }),
        delete: () => ({
            url: "product/api/v1/protected/product",
            method: "DELETE",
            headers: HEADER.protectedHeader(),
        }),
        getAppProduct: () => ({
            url: "product/api/v1/protected/product/all",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        getDetailProduct: () => ({
            url: "product/api/v1/protected/product/detail",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),

        getTypeInWarehouse: () => ({
            url: "product/api/v1/protected/type-in-warehouse",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        createTypeInWarehouse: () => ({
            url: "product/api/v1/protected/type-in-warehouse/",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        updateTypeInWarehouse: () => ({
            url: "product/api/v1/protected/type-in-warehouse/",
            method: "PUT",
            headers: HEADER.protectedHeader(),
        }),
        deleteTypeInWarehouse: () => ({
            url: "product/api/v1/protected/type-in-warehouse/",
            method: "DELETE",
            headers: HEADER.protectedHeader(),
        })
    },
    file: {
        getImagesByProductId: () => ({
            url: "file/api/v1/public/image-product/productId",
            method: "GET",
            headers: HEADER.defaultHeader(),
        })
    },
    order: {
        order: () => ({
            url: "order/api/v1/protected/order",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        changeStatus: () => ({
            url: "order/api/v1/protected/order/change-status",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        changeStatusV2: () => ({
            url: "order/api/v1/protected/order/change-status-v2",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        getPurchaseOrder: () => ({
            url: "order/api/v1/protected/order/purchase-order",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        adminGetOrder: () => ({
            url: "order/api/v1/protected/order/admin-get-order",
            method: "GET",
            headers: HEADER.protectedHeader(),
        })
    }
}