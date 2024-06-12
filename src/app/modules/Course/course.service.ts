import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}
const getAllCourseFromDB = async (query: Record<string,unknown>) => {
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

const updateCourseFromDb = async(id: string, payload:Partial<TCourse>) => {

    const { preRequisiteCourses , ...courseRemainingData} = payload;
    // basic course info update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
        id,
        courseRemainingData,
        {
            new: true,
            runValidators: true
        }
    );
    return updateBasicCourseInfo;
}

const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id,{isDeleted: true},
        {
            new: true,
        },
    );
    return result;
}

// update


export const CourseService = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseFromDb
}