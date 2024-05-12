import { BaseModel } from "./base";

export type UserModel = BaseModel & {
  email: string
  username: string
  sub: string
}