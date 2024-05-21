import { Request, Response } from "express";
import { Studentservices } from "./student.service";

import studentValidationSchema from "./student.validation";


const createStudent = async (req: Request, res: Response) => {
    try {
        
        const { student: studentdata } = req.body

       const {error} = studentValidationSchema.validate(studentdata);
    //    console.log(error, value);
    if(error){
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error.details,
        })
    }

        const result = await Studentservices.createStudentIntoBb(studentdata)
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
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
        console.log(error)
    }
}


export const studentController = {
    createStudent,
    getAllStudents
}