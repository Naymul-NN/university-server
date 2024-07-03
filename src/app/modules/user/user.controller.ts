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

// create faculty
const createFaculty = catchAsync(async (req, res) => {
        const { password, faculty: facultyData } = req.body;
        if (!facultyData.role) {
                facultyData.role = 'faculty';
              }
        const result = await UserServices.createFacultyIntoDB(password, facultyData);
      
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Faculty is created succesfully',
          data: result,
        });
      });

//    create admin
const createAdmin = catchAsync(async (req, res) => {
        const { password, admin: adminData } = req.body;
      
        const result = await UserServices.createAdminIntoDB(password, adminData);
      
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Admin is created succesfully',
          data: result,
        });
      });

      const getMe = catchAsync(async (req, res) => {
        const { userId, role } = req.user;
        const result = await UserServices.getMe(userId, role);
      
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User is retrieved succesfully',
          data: result,
        });
      });
      
      const changeStatus = catchAsync(async (req, res) => {
        const id = req.params.id;
      
        const result = await UserServices.changeStatus(id, req.body);
      
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Status is updated succesfully',
          data: result,
        });
      });

export const userController ={
       createStudent,
       createFaculty,
       createAdmin,
       getMe,
       changeStatus
}
