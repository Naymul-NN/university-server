

import express from "express";
// import { AcademicFacaltyController } from "./academicFacalty.controller";
import validationRequest from "../../middleware/validateRequest";
import { CourseVlidation } from "./course.validation";
import { courseController } from "./course.controller";
// import { academicFacaltyVlidation } from "./academicFacalty.validation";

const router = express.Router()

router.post('/create-course', validationRequest(CourseVlidation.createCourseValidationSchema),courseController.createCourse)
router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);
router.delete('/:id', courseController.deleteCourse);

router.patch(
    '/:id',
    validationRequest(
        CourseVlidation.updateCourseValidationSchema,
    ),
        courseController.updateCourse,
  );

  router.put('/:courseId/assign-courseFaculties',
    validationRequest(CourseVlidation.assignCourseValidationSchema)
    ,courseController.assignFaculties);

  router.delete('/:courseId/remove-courseFaculties',
    validationRequest(CourseVlidation.assignCourseValidationSchema)
    ,courseController.removeCourseFaculties);



export const courseRoute = router;