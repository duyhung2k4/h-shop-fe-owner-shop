import { BaseModel } from "./base";
import { ShopModel } from "./shop";

export type TypeProductModel = BaseModel & {
    shopId: number
    hastag: string
    name: string
    shop?: ShopModel
}