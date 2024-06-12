import { z } from "zod";

const preRequisiteCourseVlidationSchema = z.object({
    course:z.string(),
    isDeleted: z.boolean().optional(),
})

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourses: z.array(preRequisiteCourseVlidationSchema).optional(),
        isDeleted: z.boolean().optional()
    })
});
const updatepreRequisiteCourseVlidationSchema = z.object({
    course:z.string(),
    isDeleted: z.boolean().optional(),
})

const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        preRequisiteCourses: z.array(updatepreRequisiteCourseVlidationSchema).optional(),
        isDeleted: z.boolean().optional()
    })
});


export const CourseVlidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema
};