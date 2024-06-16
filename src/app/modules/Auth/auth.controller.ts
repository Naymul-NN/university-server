import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const  LoginUser = catchAsync(async (req, res) => {

    // const {password, student: studentdata } = req.body
    const result = await authService.logInUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user login  successfull',
        data: result
    })
})

export const  authControllers = {
    LoginUser
}