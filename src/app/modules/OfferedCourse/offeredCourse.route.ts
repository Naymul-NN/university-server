import express from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import validationRequest from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

router.get('/', 
  auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty),
  OfferedCourseControllers.getAllOfferedCourses);

router.get('/:id',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty, USER_ROLE.student),
  OfferedCourseControllers.getSingleOfferedCourses);

  router.get(
    '/my-offered-courses',
    auth(USER_ROLE.student),
    OfferedCourseControllers.getMyOfferedCourses,
  );


router.post(
  '/create-offered-course',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  validationRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  validationRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;