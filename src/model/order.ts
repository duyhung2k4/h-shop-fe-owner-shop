import { BaseModel } from "./base";
import { GroupOrderModel } from "./groupOrder";

export type OrderModel = BaseModel & {
    productId: string
    warehouseId: number
    typeInWarehouseId?: number
    amount: number
    profileId: number
    groupOrderId: number
    status: string
    paid: boolean
    total: number

    groupOrder: GroupOrderModel
}