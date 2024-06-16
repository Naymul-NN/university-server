import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

import jwt from "jsonwebtoken"
import config from "../../config";

const logInUser = async (paylod: TLoginUser) => {
    
    // checking if the user is exist

    // const isUserExists = await User.findOne({id: paylod?.id})
    const user = await User.isUserExistsByCustomId(paylod.id)

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'user is not found')
    }

    // checking the user is deleted or not

    const isDeleted = user?.isDeleted;
    
    if (isDeleted === true){
       throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted deleted')
    }

    // check the status " inprogress" or " bloked"
   
    const userStatus = user?.status;
    
    if (userStatus === "blocked"){
       throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked')
    }

    // // check the password is correct or not 

    if(!await User.isPasswordMatched(paylod?.password, user?.password)){
        throw new AppError(httpStatus.FORBIDDEN, 'wrong password')
    }

    // create jwt token and send to the user
const jwtPayload = {
    Userid: user.id,
    role: user.role

}


    const accessToken =  jwt.sign(
       jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

    return{
        accessToken,
        needsPasswordChange: user?.needsPsswordChange,
    };
}

export const authService = {
    logInUser
}