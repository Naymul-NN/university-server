/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';

import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';

const globalErrorhandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  // set default error value

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  
  let errorSourse: TErrorSource = [{
    path: '',
    message: 'something went wrong',

  }]

  const handleZodError = (err: ZodError) => {

const errorSourse: TErrorSource = err.issues.map((issue: ZodIssue)=>{
  return{
    path: issue?.path[issue.path.length - 1],
    message: issue.message,
  }
})

   const statusCode = 400;

   return{
    statusCode,
    message: 'zod validaton error',
    errorSourse

   }
  }




  if (err instanceof ZodError) {


const simplifiedError = handleZodError(err)
   statusCode = simplifiedError?.statusCode;
   message = simplifiedError?.message;
   errorSourse = simplifiedError?.errorSourse
    
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSourse,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    
  })
}

export default globalErrorhandler


// common error handle pattern 
/*
success
message
errorSources: [
path: '' ,
message: ''
]
stack
 
*/