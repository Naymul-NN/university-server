import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSesmester/academicSemester.route";
import { AcademicFacaltyRoutes } from "../modules/academicFacalty/academicFacalty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/facalty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";

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
        path: '/admins',
        route: AdminRoutes,
      },
    {
        path: '/faculties',
        route: FacultyRoutes,
      },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes
    },

    {
        path: '/academic-facalty',
        route: AcademicFacaltyRoutes
    },
    {
        path: '/academic-department',
        route: AcademicDepartmentRoutes
    }
]

moduleRoute.forEach((route)=> router.use(route.path, route.route))

export default router