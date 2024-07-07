

import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validationRequest from "../../middleware/validateRequest";
import { academicSemesterVlidation } from "./academicValidationSemester";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router()

router.post('/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(academicSemesterVlidation.academicSemesterVlidationSchema),
  AcademicSemesterController.createAcademicSemester)

router.get('/', 
  auth(USER_ROLE.superAdmin, USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  AcademicSemesterController.getAllSemester);

router.get('/:semesterId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin,USER_ROLE.student,USER_ROLE.faculty),
   AcademicSemesterController.getSingleSemester);

router.patch(
  '/:semesterId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(
    academicSemesterVlidation.UpdateacademicSemesterVlidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);



export const AcademicSemesterRoutes = router;