
import {z} from 'zod' ;

const academicFacaltyVlidationSchema = z.object({
    body: z.object({
            name: z.string({
                invalid_type_error: 'Academic facalty must be string'
            })
        })
    })

const updateacademicFacaltyVlidationSchema = z.object({
  body: z.object({
    name: z.string({
        invalid_type_error: 'Academic facalty must be string'
    })
  })
})

export const academicFacaltyVlidation = {
       academicFacaltyVlidationSchema,
       updateacademicFacaltyVlidationSchema
}