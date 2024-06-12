import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model"
import AppError from "../../errors/appErrors";
import httpStatus from "http-status";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    // console.log('Query:', query);
    const courseQuery = new QueryBuilder(Course.find()
        .populate('preRequisiteCourses.course'),
        query)
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await courseQuery.modelQuery;
    return result;
}
const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
}

const updateCourseFromDb = async (id: string, payload: Partial<TCourse>) => {

    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        // basic course info update
        const updateBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            courseRemainingData,
            {
                new: true,
                runValidators: true,
                session,
            }
        );
        if (!updateBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'there is no coure to update')
        }

        // check if there is any pre requisitie to update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map((el) => el.course)

            const deletedPreRequisitesCourse = await Course.findByIdAndUpdate(id,
                {
                    $pull: {
                        preRequisiteCourses: {
                            course: {
                                $in: deletedPreRequisites
                            }
                        }
                    }
                }, {
                new: true,
                runValidators: true,
                session
            }
            );

            if (!deletedPreRequisitesCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, 'there is no coure to delet')
            }
            // filter out the new course fields

            const newPreRequisites = preRequisiteCourses?.filter(el => el.course && !el.isDeleted,);

            const newPreRequisitesCourse = await Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequisites } }
            }, {
                new: true,
                runValidators: true,
                session
            }
            );

            if (!newPreRequisitesCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, 'no course to delete')
            }
            const result = await Course.findById(id)
                .populate('preRequisiteCourses.course')
            return result;
        }
        await session.commitTransaction();
        await session.endSession()
    } catch (err) {
        await session.abortTransaction();
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, "update failed")
    }
}

const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
}

// assigncoursefaculty
const assignFacultiesIntoDB = async (id: string, payload: Partial<TCourseFaculty>)=>{
  
const  result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
        course: id,
        $addToSet: {faculties: {$each: payload}}
    },
    {
        upsert: true,
        new: true,
    }
);
return result;

};
// removeCourseFaculty
const removeFacultiesIntoDB = async (id: string, payload: Partial<TCourseFaculty>)=>{
  
const  result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
       $pull: {faculties: {$in: payload} }
    },
    {
        upsert: true,
        new: true,
    }
);
return result;

};


export const CourseService = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseFromDb,
    assignFacultiesIntoDB,
    removeFacultiesIntoDB
}