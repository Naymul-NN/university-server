

import express from "express";
import validationRequest from "../../middleware/validateRequest";
import { academicDepartmentVlidation } from "./academicDepartment.validaton";
import { AcademicDepartmentController } from "./academinDepartment.controller";

const router = express.Router()

router.post('/create-academic-department',
  //  validationRequest(academicDepartmentVlidation.academicDepartmentVlidationSchema), 
   AcademicDepartmentController.createAcademicDepartment)
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:departmentId', AcademicDepartmentController.getSingleAcademicDepartment);

router.patch(
    '/:DepartmentId',
    validationRequest(
        academicDepartmentVlidation.updateacademicDepartmentVlidationSchema,
    ),
    AcademicDepartmentController.updateAcademicDepartment,
  );



export const AcademicDepartmentRoutes = router;