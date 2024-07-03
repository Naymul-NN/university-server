/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSesmester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Tuser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/appErrors";
import httpStatus from "http-status";
import { TFaculty } from "../facalty/faculty.interface";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../facalty/faculty.model";
import { Admin } from "../Admin/admin.model";



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
    // set student email
    userData.email = payload.email;

    //    find academid semester info
    const admissionSemester = await AcademicSemesterModel.findById(payload.admissionSemester)

    const session = await mongoose.startSession()

    try {
        session.startTransaction();
        if(!admissionSemester){
          throw new Error ("admission semester is not found")
        }
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
        throw new AppError(httpStatus.NOT_FOUND,'faild to create student')
    }
}

// create faculty into Db

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<Tuser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);
  
    //set student role
    userData.role = 'faculty';
    // set faculty email
    userData.email = payload.email;
  
    // find academic department info
    const academicDepartment = await AcademicDepartmentModel.findById(
      payload.academicDepartment,
    );
  
    if (!academicDepartment) {
      throw new AppError(400, 'Academic department not found');
    }
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateFacultyId();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); // array
  
      //create a faculty
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a faculty (transaction-2)
  
      const newFaculty = await Faculty.create([payload], { session });
  
      if (!newFaculty.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };

  // create admin into db
  const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<Tuser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);
  
    //set student role
    userData.role = 'admin';
    userData.email = payload.email;
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); 
  
      //create a admin
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a admin (transaction-2)
      const newAdmin = await Admin.create([payload], { session });
  
      if (!newAdmin.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newAdmin;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };

  const getMe = async (userId: string, role: string) => {
    let result = null;
    if (role === 'student') {
      result = await Student.findOne({ id: userId }).populate('user');
    }
    if (role === 'admin') {
      result = await Admin.findOne({ id: userId }).populate('user');
    }
  
    if (role === 'faculty') {
      result = await Faculty.findOne({ id: userId }).populate('user');
    }
  
    return result;
  };
  
  const changeStatus = async (id: string, payload: { status: string }) => {
    const result = await User.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return result;
  };
  
  
  

export const UserServices = {
    createStudentIntoBb,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMe,
    changeStatus

}