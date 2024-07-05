import express from 'express';
import auth from "../../middleware/auth";
import validationRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { EnrolledCourseControllers } from "./enrolledCourse.controller";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validationRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  EnrolledCourseControllers.getMyEnrolledCourses,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validationRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;