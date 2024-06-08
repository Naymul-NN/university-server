import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/appErrors";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { TStudent } from "./student.interface";


const getAllstudentsFromDb = async (query: Record<string, unknown>) => {

    const queryObj = { ...query }; //copy

    let searchTerm = "";
    if (query?.searchTerm) {
        searchTerm = query?.searchTerm as string;
    }

    const studentSearchAblefield = ['email', 'name.fristName', 'presentAddress']


    const searchQuery = Student.find({
        $or: studentSearchAblefield.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        }))
    })


    // filtering
    const excludeFields = ['searchTerm', 'sort', 'limit','page','fields']

    excludeFields.forEach((el) => delete queryObj[el])
    // console.log({ query, queryObj })


    const filtering = searchQuery.find(queryObj)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFacalty',
            }
        })
    let sort = '-createdAt'

    if (query.sort) {
        sort = query.sort as string;
    }
    const sortQuey = filtering.sort(sort)

    let page = 1;
    let limit = 1;
    let skip = 0;

    if (query.limit) {
        limit = query.limit as number;
    }

    if (query.page) {
        page = Number(query.page)
        skip = (page-1)*limit
    }
    // pagination
    const paginateQuery = sortQuey.skip(skip);

    const limitQury =  paginateQuery.limit(limit)

// field limiting

let fields = '__v';

if(query.fields){
    fields = (query.fields as string).split(',').join(' ')
    console.log(fields);
}

const fieldQuery =await limitQury.select(fields)

    return fieldQuery;
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
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {

    const { name, gaurdian, localgaurdian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (gaurdian && Object.keys(gaurdian).length) {
        for (const [key, value] of Object.entries(gaurdian)) {
            modifiedUpdatedData[`gaurdian.${key}`] = value;
        }
    }
    if (localgaurdian && Object.keys(localgaurdian).length) {
        for (const [key, value] of Object.entries(localgaurdian)) {
            modifiedUpdatedData[`localgaurdian.${key}`] = value;
        }
    }


    const result = await Student.findOneAndUpdate(
        { id },
        modifiedUpdatedData,
        { new: true, runValidators: true }
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