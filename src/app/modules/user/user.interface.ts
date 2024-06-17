/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface Tuser  {
    id: string;
    password: string;
    needsPsswordChange: boolean;
    role: "admin" | "student" | "faculty";
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;

}

export interface UserModel extends Model<Tuser>{
    isUserExistsByCustomId(id: string): Promise<Tuser>;
    isPasswordMatched(plainTextPassword: string , hashedPassword: string): Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE ;