import { BaseModel } from "./base";

export type CategoryModel = BaseModel & {
    name: string
    code: string
}