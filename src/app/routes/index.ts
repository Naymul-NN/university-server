import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSesmester/academicSemester.route";
import { AcademicFacaltyRoutes } from "../modules/academicFacalty/academicFacalty.route";

const router = Router()

const moduleRoute = [
    {
        path:'/students',
        route:StudentRoutes
    },
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes
    },

    {
        path: '/academic-facalty',
        route: AcademicFacaltyRoutes
    }
]

moduleRoute.forEach((route)=> router.use(route.path, route.route))

export default router