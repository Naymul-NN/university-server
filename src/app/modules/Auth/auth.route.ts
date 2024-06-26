import express from "express";
import validationRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post(
    '/login',
    validationRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
)

router.post(
    '/change-password',
    auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
    validationRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword,
)

router.post(
    '/refresh-token',
    validationRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
  );

export const UserRoute = router