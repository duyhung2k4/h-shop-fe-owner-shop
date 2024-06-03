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
        loginGoogle: () => ({
            url: "account/api/v1/public/login-google",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        refreshToken: () => ({
            url: "account/api/v1/protected/refresh-token",
            method: "POST",
            headers: HEADER.refreshTokenHeader(),
        })
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
        getAppProduct: () => ({
            url: "product/api/v1/protected/product/all",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        getDetailProduct: () => ({
            url: "product/api/v1/protected/product/detail",
            method: "GET",
            headers: HEADER.protectedHeader(),
        })
    },
    file: {
        getImagesByProductId: () => ({
            url: "file/api/v1/public/image-product/productId",
            method: "GET",
            headers: HEADER.defaultHeader(),
        })
    }
}