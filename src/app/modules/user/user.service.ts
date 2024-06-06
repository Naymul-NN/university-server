
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSesmester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Tuser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/appErrors";
import httpStatus from "http-status";


const createStudentIntoBb = async (password: string, payload: TStudent) => {

    const userData: Partial<Tuser> = {};

    // if password is not given , use deafult password
    if (!password) {
        userData.password = config.default_pass as string;
    } else {
        userData.password = password
    }

    // set student role
    userData.role = 'student';

    //    find academid semester info
    const admissionSemester = await AcademicSemesterModel.findById(payload.admissionSemester)

    const session = await mongoose.startSession()

    try {
        session.startTransaction();
        userData.id = await generateStudentId(admissionSemester);
        //  create a user (transaction-1)
        const newUser = await User.create([userData], { session });


        // create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, ' failed to create user')
        }
        // set id, _id as user
        payload.id = newUser[0].id;

        payload.user = newUser[0]._id; //refarence id

        // create a student (transaction-2)
        const newStudent = await Student.create([payload], { session });
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
        }

        await session.commitTransaction();
        await session.endSession();
        return newStudent;

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        // throw new AppError(httpStatus.NOT_FOUND,'faild to create student')
    }
}

export const UserServices = {
    createStudentIntoBb
}