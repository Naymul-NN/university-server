
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

export const AcademicSemesterController = {
    createAcademicSemester
}
