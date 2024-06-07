/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';

import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';

const globalErrorhandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  // set default error value

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  
  let errorSourse: TErrorSource = [{
    path: '',
    message: 'something went wrong',

  }]


  if (err instanceof ZodError) {

const simplifiedError = handleZodError(err)
   statusCode = simplifiedError?.statusCode;
   message = simplifiedError?.message;
   errorSourse = simplifiedError?.errorSourse  
  }else if(err?.name === 'ValidationError'){

    const simplifiedError= handleValidationError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSourse = simplifiedError?.errorSourse;
  }else if(err?.name === 'CastError'){
    const simplifiedError= handleCastError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSourse = simplifiedError?.errorSourse;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSourse,
    // err,
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