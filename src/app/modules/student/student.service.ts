import { StudentModel } from "./student.model";
import { Student } from "./student.interface";

const createStudentIntoBb = async(student: Student)=>{

   const result = await StudentModel.create(student)
   return result
}

const getAllstudentsFromDb = async()=>{
    const result = await StudentModel.find()
    return result
}

export const Studentservices = {
    createStudentIntoBb,
    getAllstudentsFromDb,
}