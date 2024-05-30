import { NextFunction, Request, Response } from "express";
import { Studentservices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


// allstudentget

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Studentservices.getAllstudentsFromDb()

        sendResponse(res,{
            statusCode: httpStatus.OK ,
            success: true,
            message: 'Student is come successfully',
            data: result
        })

    } catch (err) {
       
        next(err)
    }
}
//  single student get
const getSingleStudent = async (req: Request, res: Response, next: NextFunction)=> {
 try {
    const {studentId} = req.params;
    const result = await Studentservices.getSingleStudentFromDB(studentId);
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'Student is fatch successfully',
        data: result
    })
 }catch(err){
   next(err)
 }
}
// delete
const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction)=> {
 try {
    const {studentId} = req.params;
    const result = await Studentservices.deleteSingleStudentFromDB(studentId);
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'Student is deleted successfully',
        data: result
    })
 }catch(err){
    next(err)
 }
}

export const studentController = {
    // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent
}