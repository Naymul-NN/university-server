

import express from "express";
import { userController } from "./user.controller";

import { studentvalidation } from "../student/student.validation";
import validationRequest from "../../middleware/validateRequest";
import { createFacultyValidationSchema } from "../facalty/faculty.validation";
import { AdminValidations } from "../Admin/admin.validation";

const router = express.Router()

router.post('/create-student', validationRequest(studentvalidation.createstudentvalidationSchema), userController.createStudent)
router.post(
    '/create-faculty',
    validationRequest(createFacultyValidationSchema),
    userController.createFaculty,
  );

  router.post(
    '/create-admin',
    validationRequest(AdminValidations.createAdminValidationSchema),
    userController.createAdmin,
  );

export const UserRoutes = router;