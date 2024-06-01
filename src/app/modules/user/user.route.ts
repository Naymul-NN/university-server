

import express from "express";
import { userController } from "./user.controller";

import { studentvalidation } from "../student/student.validation";
import validationRequest from "../../middleware/validateRequest";

const router = express.Router()

router.post('/create-student', validationRequest(studentvalidation.createstudentvalidationSchema), userController.createStudent)


export const UserRoutes = router;