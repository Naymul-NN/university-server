import { TLoginUser } from "./auth.interface";

const logInUser = async (paylod: TLoginUser) => {
    console.log(paylod);
    return{};
}

export const authService = {
    logInUser
}