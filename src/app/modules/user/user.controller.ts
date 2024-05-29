import { Request, Response } from "express"
import { UserServices } from "./user.service"

const createStudent = async (req: Request, res: Response) => {
    try {
        const {password, student: studentdata } = req.body
// do validation with zod
//   const zodparsedData = studentvalidationSchema.parse(studentdata)

        const result = await UserServices.createStudentIntoBb(password,studentdata)
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

export const userController ={
       createStudent
}
