import express from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import validationRequest from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
// import validateRequest from '../../middlewares/validateRequest';
// import { OfferedCourseControllers } from './OfferedCourse.controller';
// import { OfferedCourseValidations } from './OfferedCourse.validation';

const router = express.Router();

// router.get('/', OfferedCourseControllers.getAllOfferedCourses);

// router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  validationRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validationRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;