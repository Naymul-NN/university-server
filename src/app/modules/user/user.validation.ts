import {z} from 'zod' ;
import { UserStatus } from './user.constant';

const userVlidationSchema = z.object({
    password: z.string({
        invalid_type_error: 'password must be string'
    }).max(20,{message: "passwrd can not ve more then 20 character"}).optional()
})

const changeStatusValidationSchema = z.object({
    body: z.object({
      status: z.enum([...UserStatus] as [string, ...string[]]),
    }),
  });
export const userVlidation = {
       userVlidationSchema,
       changeStatusValidationSchema
}