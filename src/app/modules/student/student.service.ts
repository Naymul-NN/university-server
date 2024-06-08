import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { TStudent } from "./student.interface";


const getAllstudentsFromDb = async (query: Record<string, unknown>) => {
  let searchTerm = "";
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }


    const result = await Student.find({
        $or: ['email', 'name.fristName','presentAddress'].map((field)=>({
            [field]: {$regex: searchTerm, $options:'i'},
        }))
    }).populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFacalty',
            }
        })
    return result
}

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({ id }).populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFacalty',
            }
        });
    return result;
}
// update
const updateStudentFromDB = async (id: string,payload: Partial<TStudent>) => {

const {name, gaurdian,localgaurdian, ...remainingStudentData} = payload; 

const modifiedUpdatedData : Record<string, unknown> = {
    ...remainingStudentData,
}

if(name && Object.keys(name).length){
 for(const [key , value ] of Object.entries(name)){
    modifiedUpdatedData[`name.${key}`] = value;
 }
}

if(gaurdian && Object.keys(gaurdian).length){
 for(const [key , value ] of Object.entries(gaurdian)){
    modifiedUpdatedData[`gaurdian.${key}`] = value;
 }
}
if(localgaurdian && Object.keys(localgaurdian).length){
 for(const [key , value ] of Object.entries(localgaurdian)){
    modifiedUpdatedData[`localgaurdian.${key}`] = value;
 }
}


    const result = await Student.findOneAndUpdate(
        { id }, 
        modifiedUpdatedData,
        {new: true , runValidators: true}
    )
    return result;
}

const deleteSingleStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedStudent = await Student.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { nre: true, session }
        );
        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to delete student')
        }
        const deletedUser = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { nre: true, session }
        )
        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to delete user')
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err)
    }


}

export const Studentservices = {
    // createStudentIntoBb,
    getAllstudentsFromDb,
    getSingleStudentFromDB,
    deleteSingleStudentFromDB,
    updateStudentFromDB

}