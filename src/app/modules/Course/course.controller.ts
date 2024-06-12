
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import { CourseService } from "./course.service"



const createCourse = catchAsync(async (req, res) => {

    // const {password, student: studentdata } = req.body
    const result = await CourseService.createCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'course is created successfully',
        data: result
    })
})

// get all semester
const getAllCourse = catchAsync( async (req, res) => {
    const result = await CourseService.getAllCourseFromDB(req.query)
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'All course  is come successfully',
        data: result
    })

});

// get singleSemester
const getSingleCourse = catchAsync(async (req, res)=> {

    const {id} = req.params;
    const result = await CourseService.getSingleCourseFromDB(id);
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'course is fatch successfully',
        data: result
    })

})
// update
const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseService.updateCourseFromDb(
      id,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is update succesfully',
      data: result,
    });
  });

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseService.deleteCourseFromDB(
      id
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is deleted succesfully',
      data: result,
    });
  });

const assignFaculties = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body;
    const result = await CourseService.assignFacultiesIntoDB(
      courseId,
      faculties
        );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty assign  succesfully',
      data: result,
    });
  });
const removeCourseFaculties = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body;
    const result = await CourseService.removeFacultiesIntoDB(
      courseId,
      faculties
        );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty remove  succesfully',
      data: result,
    });
  });

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFaculties,
  removeCourseFaculties
}
