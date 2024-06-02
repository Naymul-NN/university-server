
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import { academicSemesterService } from "./academicSemister.service"

const createAcademicSemester = catchAsync(async (req, res) => {

    // const {password, student: studentdata } = req.body
    const result = await academicSemesterService.createAcademicSemesterIntoDb(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'academic semester is created successfully',
        data: result
    })
})

// get all semester
const getAllSemester = catchAsync( async (req, res) => {
    const result = await academicSemesterService.getAllSemesterFromDb()
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'AllSemester is come successfully',
        data: result
    })

});

// get singleSemester
const getSingleSemester = catchAsync(async (req, res)=> {

    const {semesterId} = req.params;
    const result = await academicSemesterService.getSingleAcademicSemesterFromDB(semesterId);
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'semester is fatch successfully',
        data: result
    })

})
// update
const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await academicSemesterService.updateAcademicSemesterIntoDB(
      semesterId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved succesfully',
      data: result,
    });
  });

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllSemester,
    getSingleSemester,
    updateAcademicSemester
}
