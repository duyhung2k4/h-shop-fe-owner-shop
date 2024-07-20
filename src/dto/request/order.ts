export type OrderReq = {
    productId: string
    warehouseId: number
    typeWarehouseId?: number
    groupOrderId?: number
    shopId: number
    amount: number
}

export type GroupOrderReq = {
    address: string
    typePay: string
    orderDescription: string
    orderType: string
    orders: OrderReq[]
}

export type GroupOrderChangeStatusReq = {
    orderId: string
    status: string
}

export type OrderChangeStatusV2Req = {
    id: number
    status: string
    paid: boolean
    amount: number
    warehouseId: number
    typeWarehouseId?: number
}