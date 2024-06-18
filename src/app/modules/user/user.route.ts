

import express from "express";
import { userController } from "./user.controller";

import { studentvalidation } from "../student/student.validation";
import validationRequest from "../../middleware/validateRequest";
import { createFacultyValidationSchema } from "../facalty/faculty.validation";
import { AdminValidations } from "../Admin/admin.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router()

router.post('/create-student',auth(USER_ROLE.admin)
 , validationRequest(studentvalidation.createstudentvalidationSchema), userController.createStudent)
router.post(
    '/create-faculty',
    auth(USER_ROLE.admin),
    validationRequest(createFacultyValidationSchema),
    userController.createFaculty,
  );

  router.post(
    '/create-admin',
    // auth(USER_ROLE.admin),
    validationRequest(AdminValidations.createAdminValidationSchema),
    userController.createAdmin,
  );

export const UserRoutes = router;