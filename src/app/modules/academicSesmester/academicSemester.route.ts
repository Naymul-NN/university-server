

import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validationRequest from "../../middleware/validateRequest";
import { academicSemesterVlidation } from "./academicValidationSemester";

const router = express.Router()

router.post('/create-academic-semester', validationRequest(academicSemesterVlidation.academicSemesterVlidationSchema), AcademicSemesterController.createAcademicSemester)



export const AcademicSemesterRoutes = router;