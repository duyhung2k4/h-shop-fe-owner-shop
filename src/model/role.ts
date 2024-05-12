import { BaseModel } from "./base";

export type RoleModel = BaseModel & {
  code: string
  name: string
}