import { NextFunction, Request, Response } from "express";
import { Studentservices } from "./student.service";


// allstudentget

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Studentservices.getAllstudentsFromDb()

        res.status(200).json({
            success: true,
            message: 'Students are recive successfully',
            data: result
        })

    } catch (error) {
       
        next(error)
    }
}
//  single student get
const getSingleStudent = async (req: Request, res: Response, next: NextFunction)=> {
 try {
    const {studentId} = req.params;
    const result = await Studentservices.getSingleStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: "Student is come here",
        data: result,
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
    res.status(200).json({
        success: true,
        message: "Student is deleted successfully",
        data: result,
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