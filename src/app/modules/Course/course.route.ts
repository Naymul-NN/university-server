

import express from "express";
// import { AcademicFacaltyController } from "./academicFacalty.controller";
import validationRequest from "../../middleware/validateRequest";
import { CourseVlidation } from "./course.validation";
import { courseController } from "./course.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
// import { academicFacaltyVlidation } from "./academicFacalty.validation";

const router = express.Router()

router.post('/create-course',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty),
  validationRequest(CourseVlidation.createCourseValidationSchema),
  courseController.createCourse)

router.get('/', 
  auth(USER_ROLE.superAdmin, USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);
router.delete('/:id', courseController.deleteCourse);

router.patch(
    '/:id',
    auth(USER_ROLE.admin,USER_ROLE.superAdmin),
    validationRequest(
        CourseVlidation.updateCourseValidationSchema,
    ),
        courseController.updateCourse,
  );

  router.put('/:courseId/assign-courseFaculties',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validationRequest(CourseVlidation.assignCourseValidationSchema)
    ,courseController.assignFaculties);

    router.get(
      '/:courseId/get-faculties',
      auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
      ),
      courseController.getFacultiesWithCourse,
    );

  router.delete('/:courseId/remove-courseFaculties',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validationRequest(CourseVlidation.assignCourseValidationSchema)
    ,courseController.removeCourseFaculties);



export const courseRoute = router;