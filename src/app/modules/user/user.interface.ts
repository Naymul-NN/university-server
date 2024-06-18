/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface Tuser  {
    id: string;
    password: string;
    needsPsswordChange: boolean;
    passwordChangedAt?: Date;
    role: "admin" | "student" | "faculty";
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;

}

export interface UserModel extends Model<Tuser> {
    //instance methods for checking if the user exist
    isUserExistsByCustomId(id: string): Promise<Tuser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
      passwordChangedTimestamp: Date,
      jwtIssuedTimestamp: number,
    ): boolean;
  }
  
  export type TUserRole = keyof typeof USER_ROLE;