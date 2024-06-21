import {z} from 'zod' ;
import { months, semesterCode, semesterName } from './academicSemester.constent';

const academicSemesterVlidationSchema = z.object({
body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]),
    year: z.string(),
    code :z.enum([... semesterCode] as [string, ...string[]]),
    startMonth :z.enum([... months] as [string, ...string[]]),
    endMonth :z.enum([... months] as [string, ...string[]])
})
})
const UpdateacademicSemesterVlidationSchema = z.object({
body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code :z.enum([... semesterCode] as [string, ...string[]]).optional(),
    startMonth :z.enum([... months] as [string, ...string[]]).optional(),
    endMonth :z.enum([... months] as [string, ...string[]]).optional()
})
})



export const academicSemesterVlidation = {
       academicSemesterVlidationSchema,
       UpdateacademicSemesterVlidationSchema
}