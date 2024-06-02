
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import { academicFacaltyService } from "./academicFacalty.service"


const createAcademicFacalty = catchAsync(async (req, res) => {

    // const {password, student: studentdata } = req.body
    const result = await academicFacaltyService.createAcademicFacaltyIntoDb(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'academic facalty is created successfully',
        data: result
    })
})

// get all semester
const getAllAcademicFacalty = catchAsync( async (req, res) => {
    const result = await academicFacaltyService.getAllacademicFacaltyFromDb()
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'All Academic Facalty  is come successfully',
        data: result
    })

});

// get singleSemester
const getSingleAcademicFacalty = catchAsync(async (req, res)=> {

    const {FacaltyId} = req.params;
    const result = await academicFacaltyService.getSingleAcademicFacaltyFromDB(FacaltyId);
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success: true,
        message: 'Facalty is fatch successfully',
        data: result
    })

})
// update
const updateAcademicSemester = catchAsync(async (req, res) => {
    const { FacaltyId } = req.params;
    const result = await academicFacaltyService.updateAcademicFacaltyIntoDB(
      FacaltyId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Facalty is retrieved succesfully',
      data: result,
    });
  });

export const AcademicFacaltyController = {
    createAcademicFacalty,
    getAllAcademicFacalty,
    getSingleAcademicFacalty,
    updateAcademicSemester
}
