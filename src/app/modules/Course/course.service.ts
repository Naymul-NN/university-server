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
if(preRequisiteCourses && preRequisiteCourses.length > 0){
    const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map((el)=> el.course)
    
    const deletedPreRequisitesCourse = await Course.findByIdAndUpdate(id,

      {
        $pull: {preRequisiteCourses: {course: {$in : deletedPreRequisites}}}
      }  
    );
    // filter out the new course fields

    const newPreRequisites = preRequisiteCourses?.filter(el=> el.course && !el.isDeleted,);

const newPreRequisitesCourse = await Course.findByIdAndUpdate(id,{
    $addToSet: {preRequisiteCourses: {$each: newPreRequisites}}
})
}

const result = await Course.findById(id).populate('preRequisiteCourses.course')

    return result;
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