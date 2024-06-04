
import {z} from 'zod' ;

const academicDepartmentVlidationSchema = z.object({
    body: z.object({
            name: z.string({
                invalid_type_error: 'Academic Department name must be string',
                required_error: 'Name is require'
            }),
            academicFacalty: z.string({
                invalid_type_error: 'Academic Department name must be string',
                required_error: 'Academin facalty is require'
            })
        })
    })

const updateacademicDepartmentVlidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Department name must be string',
            required_error: 'Name is require'
        }).optional(),
        academicFacalty: z.string({
            invalid_type_error: 'Academic Department name must be string',
            required_error: 'Academin facalty is require'
        }).optional(),
    })
})

export const academicDepartmentVlidation = {
       academicDepartmentVlidationSchema,
       updateacademicDepartmentVlidationSchema
}