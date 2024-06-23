

import express from "express";
import { studentController } from "./student.controller";
import validationRequest from "../../middleware/validateRequest";
import { studentvalidation } from "./student.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router()

// router.post('/create-student',studentController.createStudent)
router.get('/',
    auth(USER_ROLE.admin),
    studentController.getAllStudents);

router.get('/:studentId', studentController.getSingleStudent);
router.delete('/:studentId', studentController.deleteSingleStudent);
router.patch('/:studentId',
    validationRequest(studentvalidation.updatestudentvalidationSchema) ,
    studentController.updateStudent);

export const StudentRoutes = router;