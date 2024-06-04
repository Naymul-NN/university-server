
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import { academicDepartmentService } from "./academicDepartment.service"


const createAcademicDepartment = catchAsync(async (req, res) => {

    
    const result = await academicDepartmentService.createAcademicDepartmentIntoDb(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'academic Department is created successfully',
        data: result
    })
})

// get all semester
const getAllAcademicDepartment = catchAsync( async (req, res) => {
    const result = await academicDepartmentService.getAllacademicDepartmentFromDb()
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'All Academic Department  is come successfully',
        data: result
    })

});

// get singleSemester
const getSingleAcademicDepartment = catchAsync(async (req, res)=> {

    const {departmentId} = req.params;
    const result = await academicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId);
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'department is fatch successfully',
        data: result
    })

})
// update
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { DepartmentId } = req.params;
    const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(
      DepartmentId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is retrieved succesfully',
      data: result,
    });
  });

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}
