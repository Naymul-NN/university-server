import {z} from 'zod' ;

const userVlidationSchema = z.object({
    password: z.string({
        invalid_type_error: 'password must be string'
    }).max(20,{message: "passwrd can not ve more then 20 character"}).optional()
})

export const userVlidation = {
       userVlidationSchema,
}