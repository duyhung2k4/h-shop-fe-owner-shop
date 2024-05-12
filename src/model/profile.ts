import { BaseModel } from "./base";
import { UserModel } from "./user";

export type ProfileModel = BaseModel & {
  userId: number
  name: string
  birth: Date
  givenName: string
  familyName: string
  picture: string
  locale: string

  user?: UserModel
}