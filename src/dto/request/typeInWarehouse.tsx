export type CreateTypeInWarehouseReq = {
    productId: string
    hastag: string
    name: string
    price?: number
    count: number
}

export type UpdateTypeInWarehouseReq = {
    id: number
    hastag: string
    name: string
    price?: number
    count: number
}

export type DeleteTypeInWarehouseReq = {
    id: number
}