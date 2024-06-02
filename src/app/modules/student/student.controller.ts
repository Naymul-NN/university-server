// import {  NextFunction, Request, RequestHandler, Response } from "express";
import { Studentservices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



// allstudentget

const getAllStudents = catchAsync( async (req, res) => {
        const result = await Studentservices.getAllstudentsFromDb()
        sendResponse(res,{
            statusCode: httpStatus.OK ,
            success: true,
            message: 'Student is come successfully',
            data: result
        })

})
//  single student get
const getSingleStudent = catchAsync(async (req, res)=> {

    const {studentId} = req.params;
    const result = await Studentservices.getSingleStudentFromDB(studentId);
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'Student is fatch successfully',
        data: result
    })

})
// delete
const deleteSingleStudent =catchAsync( async (req, res)=> {
 
    const {studentId} = req.params;
    const result = await Studentservices.deleteSingleStudentFromDB(studentId);
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'Student is deleted successfully',
        data: result
    })
 
})

export const studentController = {
    // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent
}