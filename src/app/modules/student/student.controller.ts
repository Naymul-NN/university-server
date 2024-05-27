import { Request, Response } from "express";
import { Studentservices } from "./student.service";
import studentvalidationSchema from "./student.validation";





const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentdata } = req.body
// do validation with zod
  const zodparsedData = studentvalidationSchema.parse(studentdata)


        const result = await Studentservices.createStudentIntoBb(zodparsedData)
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        })
    
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        })
    }
}
// allstudentget
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await Studentservices.getAllstudentsFromDb()

        res.status(200).json({
            success: true,
            message: 'Students are recive successfully',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        })
    }
}
//  single student get
const getSingleStudent = async (req: Request, res: Response)=> {
 try {
    const {studentId} = req.params;
    const result = await Studentservices.getSingleStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: "Student is come here",
        data: result,
    })
 }catch(err: any){
    res.status(500).json({
        success: false,
        message: 'there is something wrong',
        error: err,

    })
 }
}
// delete
const deleteSingleStudent = async (req: Request, res: Response)=> {
 try {
    const {studentId} = req.params;
    const result = await Studentservices.deleteSingleStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: "Student is deleted successfully",
        data: result,
    })
 }catch(err: any){
    res.status(500).json({
        success: false,
        message: 'there is something wrong',
        error: err,

    })
 }
}

export const studentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent
}