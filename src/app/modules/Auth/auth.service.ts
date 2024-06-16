import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
// import bcrypt from "bcrypt"

const logInUser = async (paylod: TLoginUser) => {
    
    // checking if the user is exist

    // const isUserExists = await User.findOne({id: paylod?.id})
    const user = await User.isUserExistsByCustomId(paylod.id)

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'user is not found')
    }

    // checking the user is deleted or not

    // const isDeleted = isUserExists?.isDeleted;
    
    // if (isDeleted === true){
    //    throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted deleted')
    // }

    // // check the status " inprogress" or " bloked"
   
    // const userStatus = isUserExists?.status;
    
    // if (userStatus === "blocked"){
    //    throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked')
    // }

    // // check the password is correct or not 
    // const isPsswordMatched = await bcrypt.compare(paylod?.password, isUserExists?.password) 

    // console.log(isPsswordMatched)
    if(!await User.isPasswordMatched(paylod?.password, user?.password)){
        throw new AppError(httpStatus.FORBIDDEN, 'wrong password')
    }

    return{};
}

export const authService = {
    logInUser
}