import { BaseModel } from "./base"
import { TypeProductModel } from "./typeProduct"

export type ShopModel = BaseModel & {
    address: string
    name: string
    describe: string
    profileId: number
    typeProducts?: TypeProductModel[]
}