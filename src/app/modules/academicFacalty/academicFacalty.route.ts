

import express from "express";
import { AcademicFacaltyController } from "./academicFacalty.controller";
import validationRequest from "../../middleware/validateRequest";
import { academicFacaltyVlidation } from "./academicFacalty.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router()

router.post('/create-academic-facalty', validationRequest(academicFacaltyVlidation.academicFacaltyVlidationSchema), AcademicFacaltyController.createAcademicFacalty)
router.get('/',auth(USER_ROLE.admin, USER_ROLE.faculty), AcademicFacaltyController.getAllAcademicFacalty);
router.get('/:FacaltyId', AcademicFacaltyController.getSingleAcademicFacalty);

router.patch(
    '/:FacaltyId',
    validationRequest(
        academicFacaltyVlidation.updateacademicFacaltyVlidationSchema,
    ),
    AcademicFacaltyController.updateAcademicFacalty,
  );



export const AcademicFacaltyRoutes = router;