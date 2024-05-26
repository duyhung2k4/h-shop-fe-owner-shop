import { BaseModel } from "./base";

export type ImageProductModel = BaseModel & {
    format: string
    isAvatar?: boolean
    name: string
    size: number
    data: number[]
    productId: string
}