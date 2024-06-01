// import {  RequestHandler} from "express"
import { UserServices } from "./user.service"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"

const createStudent = catchAsync( async (req, res) => {
   
        const {password, student: studentdata } = req.body
// do validation with zod
//   const zodparsedData = studentvalidationSchema.parse(studentdata)

        const result = await UserServices.createStudentIntoBb(password,studentdata)
        // res.status(200).json({
        //     success: true,
        //     message: 'Student is created successfully',
        //     data: result
        // })

        sendResponse(res,{
            statusCode: httpStatus.OK ,
            success: true,
            message: 'Student is created successfully',
            data: result
        })
})

export const userController ={
       createStudent
}
