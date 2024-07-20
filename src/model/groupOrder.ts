import { BaseModel } from "./base";
import { OrderModel } from "./order";

export type GroupOrderModel = BaseModel & {
    address: string
    typePay: string
    paid: boolean
    total: number
    vnp_TxnRef?: string

    orders: OrderModel[]
}